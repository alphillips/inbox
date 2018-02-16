import React from 'react'
import * as api from './../api'
import {Link} from 'react-router'
import Dropzone from 'react-dropzone'
import Messages from '@react-ag-components/messages'
import moment from 'moment'


import './mail.css'

class Mail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      mails: [],
      success:props.success,
      error:props.error,
      id: -1,
      messageId: parseInt(props.messageId) || -1,
      type: props.type || "MESSAGE",
      reply: '',
      replyState: false,
      showAttach: false,
      html: '',
      subject: '',
      user: null,
      files: [],
      read: false,
      archived: false,
      info: ""
    }
    this.replies = []
    this.handleReplyContent = this.handleReplyContent.bind(this)
  }

  componentDidMount() {

    let expiryDate = "31/01/2018"
    this.setState((prevState, props) => ({
      info: "This notification will expire on " + expiryDate + "."
    }))

    if(this.state.type === "MESSAGE") {
      api.getMail(this.state.messageId).then(
        data => {
          let threadMessage = data.linkedMessage
          threadMessage.push(data)
          this.setState((prevState, props) => ({
            mails: threadMessage,
            read: data.read,
            archived: data.archived,
            id: data.messageId,
            subject: data.subject
          }))

          if(!this.state.read) {
            let statusBody = {}
            statusBody.messageId = this.state.id
            statusBody.status = true
          }
        }
      )
    }
    else {
      api.getMailFromAll(this.state.messageId).then(
        data => {
          var threadMessage = []
          threadMessage.push(data)
          this.setState((prevState, props) => ({
            mails: threadMessage,
            read: data.read,
            archived: data.archived,
            id: data.messageId,
            subject: data.subject
          }))

          if(!this.state.read) {
            let statusBody = {}
            statusBody.messageId = this.state.id
            statusBody.status = true
          }
        }
      )
    }
  }

  handleReplyState = () => {
    this.setState((prevState, props) => ({
      replyState: !this.state.replyState,
      showAttach: false
    }))
    this.clearAttachment()
    this.clearReplyContent()
  }

  handleReplyContent = (event) => {
    this.setState({html: event.target.value})
  }

  handleShowAttach = () => {
    this.setState((prevState, props) => ({
      showAttach: !this.state.showAttach
    }))
    if(!this.state.showAttach) {
      this.clearAttachment()
    }
  }

  handleSend = () => {
    let reply = {}

    reply.subject = this.state.subject.indexOf("Re:") > -1 ? this.state.subject :"Re: "+ this.state.subject
    reply.body = this.state.html
    reply.linkedAttachment = this.state.files
    reply.parentId = this.state.id

    api.sendMail(reply).then(
      data => {
        this.props.callbackSetMessage("success", 'Message '+'"'+  this.state.subject +'"'+ ' has been sent'),
        this.props.callbackCloseSelf()
      }
    )
  }

  clearAttachment = () => {
    this.setState((prevState, props) => ({
      files: []
    }))
  }

  clearReplyContent = () => {
    this.setState({html: ''})
  }

  handleArchive = (e) => {
    let statusBody = {}
    statusBody.messageId = this.state.id
    statusBody.archived = true
    api.setArchive(statusBody).then(
      data => {
        this.props.callbackSetMessage("success",  'Message '+'"'+  this.state.mails[0].subject +'"'+ ' has been archived')
        this.props.callbackCloseSelf()
      }
    ).catch((error) => {
      console.log(error + " with archiving mail")
    })
  }

  handleRestore = (e) => {
    let statusBody = {}
    statusBody.messageId = this.state.id
    statusBody.archived = false
    api.setArchive(statusBody).then(
      data => {
        this.props.callbackSetMessage("success", 'Message '+'"'+  this.state.mails[0].subject +'"'+ ' has been unarchived')
        this.props.callbackCloseSelf()
      }
    ).catch((error) => {
      console.log(error + " with restoring mail")
    })
  }

  onDrop = (files) => {
    files.forEach(file => {
      const reader = new FileReader()
      const fileObj = {}
      reader.readAsDataURL(file)
      reader.onload = () => {
        fileObj.name = file.name
        fileObj.mimeType = file.type
        fileObj.size = this.convertFromBytetoMB(file.size)
        fileObj.data = unescape(encodeURIComponent(reader.result.split(',')[1]))
        let thisStateFiles = this.state.files
        thisStateFiles.push(fileObj)
        this.setState((prevState, props) => ({
          files: thisStateFiles
        }))
      }
    })
  }

  removeFile = (e) => {
    var array = this.state.files;
    var index = e.target.getAttribute('data-value')
    array.splice(index, 1);
    this.setState((prevState, props) => ({
      files: array
    }))
  }

  getfile = (id) => {
    let data = {}
    api.getMailAttachment(id).then(
      data => {
        data = data
      }
    )

    let fileHeader = "data:"+data.mimeType+";base64,"

    let fileData = fileHeader + data.data

    var dlnk = document.getElementById("downloadLink");
      dlnk.href = fileData;
      dlnk.click();
  }

  convertFromBytetoMB = (num) => {
    return (num/1048576).toFixed(4);
  }

  epochSecondToDate = (epochSecond) => {
    var eps = epochSecond * 1000
    var m = moment(eps)
    var s = m.format("D/M/YYYY hh:mm:ss")
    return s
  }

  onClose = () => {
    this.props.callbackCloseSelf()
    this.props.callbackSetMessage("success", "")
  }

  render() {
    return (
    <div>
      <a className="back-button uikit-direction-link uikit-direction-link--left" onClick={this.onClose}> Back </a>

      <div className="" className={this.state.replyState ? "nexdoc-mail-container reply" : "nexdoc-mail-container"}>

        <div className="nexdoc-mail">
          <textarea value={this.state.html} onChange={this.handleReplyContent} className={this.state.replyState? "reply-area reply" : "reply-area"}></textarea>

          {this.state.showAttach &&
            <div>
              <Dropzone
                onDrop={this.onDrop.bind(this)}
                className="file-drop-zone">
                {this.state.name ?
                  <p>File <strong>{this.state.name}</strong> selected</p>
                  :
                  <p>Select or drag and drop a file</p>
                }
              </Dropzone>
              {this.state.files.length > 0 &&
                <aside className="attach-files">
                  <h2>Attaching files</h2>
                   <ul>
                     {
                       this.state.files.map((f, i) =>
                          <li key={f.name+f.size} data-value={i} onClick={this.removeFile.bind(this)} key={f.name}>{f.name} - {f.size} MB</li>
                        )
                     }
                   </ul>
               </aside>
               }
             </div>
           }

          {this.state.mails &&

          this.state.mails.map((reply) =>

            <div key={reply.messageId}>

              <div className="mail-from">From: <span className="text-normal">{reply.fromParty}</span>
                {!this.state.replyState &&
                  <div>
                    {this.state.type === "MESSAGE" &&
                      <div>
                        {!this.state.archived &&
                          <button className="btn-reply-action reply" onClick={this.handleReplyState}>Reply</button>
                        }

                        {!this.state.archived &&
                          <button className="btn-archive" onClick={this.handleArchive}>Archive</button>
                        }
                        {this.state.archived &&
                          <button className="btn-unarchive" onClick={this.handleRestore}>Unarchive</button>
                        }
                      </div>
                    }
                  </div>
                }
                {this.state.replyState &&
                  <div>
                    <button className="btn-reply-action discard" onClick={this.handleReplyState}>Discard</button>
                    <button className="btn-reply-action send" onClick={this.handleSend}>Send</button>
                    <button className="btn-reply-action attach" onClick={this.handleShowAttach}>{!this.state.showAttach ? 'Attach' : 'Remove'}</button>
                  </div>
                }
              </div>
              <div className="mail-subject-container">
                <span className="mail-subject">Subject: <span className="text-normal">{reply.subject}</span></span>
                <span className="mail-date">Sent: <span className="text-normal">{this.epochSecondToDate(reply.messageTimestamp.epochSecond)}</span></span>
                {this.state.type !== "MESSAGE" &&
                  <span className="mail-date">Notice: <span className="text-normal">{this.state.info}</span></span>
                }

                {this.state.type === "MESSAGE" && reply.linkedAttachment &&
                  <span className="mail-date">Attachment:
                    <span className="text-normal">
                      <a id="downloadLink" />
                      {reply.linkedAttachment.map((file, i) =>
                        <Link key={file.externalRefId} className="mail-attachment" onClick={this.getfile.bind(this, file.externalRefId)}> {file.name} {" "} </Link>
                      )}
                    </span>
                  </span>
                }
              </div>
              <div className="mail-body-container"><span className="mail-body" dangerouslySetInnerHTML={{__html: (reply.body)}}></span></div>
            </div>
          )}
        </div>

      </div>
    </div>
    )
  }
}
export default Mail
