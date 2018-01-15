import React from 'react'
import { hashHistory } from 'react-router'
import wrapPage from '@react-ag-components/core/lib/PageWrapper'
import * as api from './../api'
import ContentEditable from './../ContentEditable'
import Dropzone from 'react-dropzone'
import BackButton from '@react-ag-components/back-button'
import Messages from '@react-ag-components/messages'
import LoadableSection from '@react-ag-components/core/lib/LoadableSection'
import moment from 'moment'


import './mail.css'

class Mail extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      mails:[],
      success:props.success,
      error:props.error,
      id: this.props.params.id || 1,
      reply: '',
      replyState: false,
      showAttach: false,
      html: '',
      user: null,
      files: [],
      // was expecting id generated from api but can we just pass it the root id instead?
      // newMessageId: '',
      // because we are getting this status from root message
      read: false,
      archived: false
    }
    this.replies = []
    this.handleReplyContent = this.handleReplyContent.bind(this)
    this.filesId = {}
  }

  componentDidMount() {
    api.getUser().then(
      data => {
        this.setState((prevState, props) => ({
          user: data
        }))
      }
    ).catch((error) => {
      console.log('User not loaded ' + error)
    })
    api.getMail(this.state.id).then(
      data => {
        var threadMessage = data.linkedMessage
        threadMessage.push(data)
        this.setState((prevState, props) => ({
          mails: threadMessage,
          read: data.read,
          archived: data.archived
        }))

        if(!this.state.read) {
          let statusBody = {}
          statusBody.id = this.state.id
          statusBody.status = true
          api.setRead(statusBody).then(
            data => {
              console.log(this.state.mails[0].subject + " set to read")
            }
          )
        }
      }
    )
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
    let mails = this.state.mails
    let user = this.state.user

    let reply = {}
    let d = new Date();
    let seconds = Math.round(d.getTime() / 1000);

    reply.messageTimestamp = {}
    reply.messageTimestamp.epochSecond = seconds
    reply.subject = mails[0].subject.indexOf("Re:") > -1 ? mails.subject :"Re: "+ mails.subject
    reply.body = this.state.html
    reply.fromParty = user.lastName + ' ' + user.firstName
    reply.toParty = mails[0].fromName

    if (this.state.files.length > 0) {
      api.sendFiles(this.state.files).then(
        data => {
          this.filesId = data
          console.log("Attachments have been submitted")
        }
      )
    }

    if(this.filesId.length > 0) {
      let statusBody = {}
      statusBody.messageId = this.state.id
      statusBody.attachmentIds = this.filesId
      api.updateMailFile(statusBody).then(
        data => {
          console.log("attachment attached to mail")
        }
      )
    }

    api.sendMail(reply).then(
      data => {
        this.props.setMessage({success:'Message '+'"'+  this.state.mails[0].subject +'"'+ ' has been sent'}),
        hashHistory.push('/inbox')
        // this.setState((prevState, props) => ({
        //   newMessageId: data
        // }))
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
    statusBody.id = this.state.id
    statusBody.status = true
    api.setArchive(statusBody).then(
      data => {
        this.props.setMessage({success:'Message '+'"'+  this.state.mails[0].subject +'"'+ ' has been archived'})
        hashHistory.push('/inbox')
      }
    ).catch((error) => {
      console.log(error + " with archiving mail")
    })
  }

  handleRestore = (e) => {
    let statusBody = {}
    statusBody.id = this.state.id
    statusBody.status = false
    api.setArchive(statusBody).then(
      data => {
        this.props.setMessage({success:'Message '+'"'+  this.state.mails[0].subject +'"'+ ' has been unarchived'})
        hashHistory.push('/inbox')
      }
    ).catch((error) => {
      console.log(error + " with restoring mail")
    })
  }

  onDrop = (files) => {
    files.forEach(file => {
      const reader = new FileReader()
      const fileObj = {}
      reader.onload = () => {
        const fileAsBinaryString = reader.result
        fileObj.name = file.name
        fileObj.mimeType = file.type
        fileObj.size = file.size
        fileObj.data = []
        fileObj.data.push(fileAsBinaryString)
        let thisStateFiles = this.state.files
        thisStateFiles.push(fileObj)
        this.setState((prevState, props) => ({
          files: thisStateFiles
        }))
      }
      reader.readAsBinaryString(file)
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
  getfile = (e) => {
    // retrive file from server and downloads it
  }

  epochSecondToDate = (epochSecond) => {
    var m = moment(epochSecond)
    var s = m.format("D/M/YYYY")
    return s
  }

  render() {
    return (
    <div>
    <BackButton />
      <div className="" className={this.state.replyState ? "nexdoc-mail-container reply" : "nexdoc-mail-container"}>

        <LoadableSection>
        <div className="nexdoc-mail">
          <ContentEditable html={this.state.html} onChange={this.handleReplyContent} className={this.state.replyState? "reply-area reply" : "reply-area"}></ContentEditable>

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
                          <li key={f.name+f.size} data-value={i} onClick={this.removeFile.bind(this)} key={f.name}>{f.name} - {f.size} bytes</li>
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
                    <button className="btn-reply-action reply" onClick={this.handleReplyState}>Reply</button>
                      {!this.state.archived &&
                        <button className="btn-archive" onClick={this.handleArchive}>Archive</button>
                      }
                      {this.state.archived &&
                        <button className="btn-unarchive" onClick={this.handleRestore}>Unarchive</button>
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
              <div className="mail-subject-container"><span className="mail-subject">Subject: <span className="text-normal">{reply.subject}</span></span> <span className="mail-date">Sent: <span className="text-normal">{this.epochSecondToDate(reply.messageTimestamp.epochSecond)}</span></span></div>
              <div className="mail-body-container"><span className="mail-body" dangerouslySetInnerHTML={{__html: (reply.body)}}></span></div>
              {
                this.state.mails.linkedAttachment &&
                <button className="mail-attachment" data-value={reply.linkedAttachment.name} onClick={this.getfile.bind(this)}><span>{reply.linkedAttachment.name}</span></button>
              }
            </div>
          )}
        </div>

      </LoadableSection>
      </div>
    </div>
    )
  }
}
export default wrapPage()(Mail)
