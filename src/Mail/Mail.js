import React from "react";
import * as api from "./../api";
import { Link } from "react-router";
import Dropzone from "react-dropzone";
import Messages from "@react-ag-components/messages";
import moment from "moment";

import "./mail.css";

class Mail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mails: [],
      success: props.success,
      error: props.error,
      info: props.info,
      id: -1,
      messageId: props.messageId || -1,
      type: props.type || "MESSAGE",
      reply: "",
      replyState: false,
      showAttach: false,
      html: "",
      subject: "",
      user: null,
      files: [],
      read: false,
      archived: false
    };
    this.replies = [];
    this.handleReplyContent = this.handleReplyContent.bind(this);
  }

  componentDidMount() {
    if (this.state.type === "MESSAGE") {
      api.getMail(this.state.messageId).then(data => {
        let threadMessage = data.linkedMessage;
        threadMessage.push(data);
        this.setState((prevState, props) => ({
          mails: threadMessage,
          read: data.read,
          archived: data.archived,
          id: data.messageId,
          subject: data.subject
        }));

        if (!this.state.read) {
          let statusBody = {};
          statusBody.messageId = this.state.id;
          statusBody.status = true;
        }
      });
    } else {
      api.getMailFromAll(this.state.messageId).then(data => {
        let expiryDate = (data.expiryTimestamp && data.expiryTimestamp.epochSecond) ? this.epochSecondToDate(data.expiryTimestamp.epochSecond, true) : null
        let threadMessage = [];
        threadMessage.push(data);
        this.setState((prevState, props) => ({
          mails: threadMessage,
          read: data.read,
          archived: data.archived,
          id: data.messageId,
          subject: data.subject
        }));

        if (expiryDate && expiryDate !== null) {
          this.setState((prevState, props) => ({
            info: "This notification will expire on " + expiryDate + "."
          }));
        }

        if (!this.state.read) {
          let statusBody = {};
          statusBody.messageId = this.state.id;
          statusBody.status = true;
        }
      });
    }
    this.refreshCount()
  }

  refreshCount = () => {
    this.props.refreshCount()
  }

  handleReplyState = () => {
    this.setState((prevState, props) => ({
      replyState: !this.state.replyState,
      showAttach: false,
      error: ""
    }));
    this.clearAttachment();
    this.clearReplyContent();
  };

  handleReplyContent = event => {
    this.setState({ html: event.target.value });
  };

  totalFileSize = (files) => {
    let totalFileSize = 0
    files.map((file) => {
      totalFileSize = totalFileSize + file.size
    })
    return totalFileSize
  }

  handleShowAttach = () => {
    this.setState((prevState, props) => ({
      showAttach: !this.state.showAttach,
      error: ""
    }));
    if (!this.state.showAttach) {
      this.clearAttachment();
    }
  };

  handleSend = () => {
    let reply = {};

    if(this.state.html && this.state.html !== "") {
      let totalFileSize = this.totalFileSize(this.state.files)

      if(totalFileSize < 10485760) {
        reply.subject =
          this.state.subject.indexOf("Re:") > -1
            ? this.state.subject
            : "Re: " + this.state.subject;
        reply.body = this.state.html;
        reply.linkedAttachment = this.state.files;
        reply.parentId = this.state.id;

        api.sendMail(reply).then(data => {
          this.props.callbackSetMessage(
            "success",
            "Message " + '"' + this.state.subject + '"' + " has been sent"
          ),
            this.props.callbackCloseSelf();
        });
      } else {
        this.setState((prevState, props) => ({
          error: "Attachment upload has exceeded 10MB.  Remove some attachments and try again."
        }));
        window.scroll(0,0)
      }
    } else {
      this.setState((prevState, props) => ({
        error: "Please provide message"
      }));
      window.scroll(0,0)
    }
  };

  clearAttachment = () => {
    this.setState((prevState, props) => ({
      files: []
    }));
  };

  clearReplyContent = () => {
    this.setState({ html: "" });
  };

  handleArchive = e => {
    let statusBody = {};
    statusBody.messageId = this.state.id;
    statusBody.archived = true;
    api
      .setArchive(statusBody)
      .then(data => {
        this.props.callbackSetMessage(
          "success",
          "Message " +
            '"' +
            this.state.mails[0].subject +
            '"' +
            " has been archived"
        );
        this.props.callbackCloseSelf();
      })
      .catch(error => {
        console.log(error + " with archiving mail");
      });
  };

  handleRestore = e => {
    let statusBody = {};
    statusBody.messageId = this.state.id;
    statusBody.archived = false;
    api
      .setArchive(statusBody)
      .then(data => {
        this.props.callbackSetMessage(
          "success",
          "Message " +
            '"' +
            this.state.mails[0].subject +
            '"' +
            " has been unarchived"
        );
        this.props.callbackCloseSelf();
      })
      .catch(error => {
        console.log(error + " with restoring mail");
      });
  };

  onDrop = files => {
    files.forEach(file => {
      const reader = new FileReader();
      const fileObj = {};
      reader.readAsDataURL(file);
      reader.onload = () => {
        fileObj.name = file.name;
        fileObj.mimeType = file.type;
        fileObj.size = file.size;
        fileObj.data = unescape(
          encodeURIComponent(reader.result.split(",")[1])
        );
        let thisStateFiles = this.state.files;
        thisStateFiles.push(fileObj);
        this.setState((prevState, props) => ({
          files: thisStateFiles
        }));
      };
    });
  };

  removeFile = e => {
    var array = this.state.files;
    var index = e.target.getAttribute("data-value");
    array.splice(index, 1);
    this.setState((prevState, props) => ({
      files: array,
      error: ""
    }));
  };

  downloadFile = id => {
    api.getMailAttachment(id).then(data => {
      let fileHeader = "data:" + data.mimeType + ";base64,";

      let fileData = "";

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        // IE workaround
        var byteCharacters = atob(data.data);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var blob = new Blob([byteArray], { type: data.mineType });
        window.navigator.msSaveOrOpenBlob(blob, data.name);
      } else {
        // much easier if not IE
        fileData = fileHeader + data.data;
      }

      var dlnk = document.getElementById("downloadLink" + id);
      dlnk.href = fileData;
      dlnk.click();
    });
  };

  bytesToSize = bytes => {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  };

  epochSecondToDate = (epochSecond, onlyDate) => {
    var eps = epochSecond * 1000;
    var m = moment(eps);
    let s = onlyDate ? m.format("D/M/YYYY") : m.format("D/M/YYYY hh:mm:ss")
    return s;
  };

  onClose = () => {
    this.props.callbackCloseSelf();
    this.props.callbackSetMessage("success", "");
  };

  render() {
    return (
      <div>
        <a
          className="back-button uikit-direction-link uikit-direction-link--left"
          onClick={this.onClose}
        >
          {" "}
          Back{" "}
        </a>

        <Messages success={this.state.success} error={this.state.error} info={this.state.info} />

        <div
          className=""
          className={
            this.state.replyState
              ? "nexdoc-mail-container reply"
              : "nexdoc-mail-container"
          }
        >
          <div className="nexdoc-mail">
            <textarea
              value={this.state.html}
              onChange={this.handleReplyContent}
              className={
                this.state.replyState ? "reply-area reply" : "reply-area"
              }
            />

            {this.state.showAttach && (
              <div>
                <Dropzone
                  onDrop={this.onDrop.bind(this)}
                  className="file-drop-zone"
                >
                  {this.state.name ? (
                    <p>
                      File <strong>{this.state.name}</strong> selected
                    </p>
                  ) : (
                    <p>Select or drag and drop a file</p>
                  )}
                </Dropzone>
                {this.state.files.length > 0 && (
                  <aside className="attach-files">
                    <h2>Attaching files</h2>
                    <ul>
                      {this.state.files.map((f, i) => (
                        <li
                          key={f.name + f.size}
                          data-value={i}
                          onClick={this.removeFile.bind(this)}
                          key={f.name}
                        >
                          {f.name} - {this.bytesToSize(f.size)}
                        </li>
                      ))}
                    </ul>
                  </aside>
                )}
              </div>
            )}

            {this.state.mails &&
              this.state.mails.map((reply, i) => (
                <div key={reply.messageId} className={"reply-mail-"+i}>
                  <div className="mail-from">
                    From: <span className="text-normal">{reply.fromParty}</span>
                    {!this.state.replyState && (
                      <div>
                        {this.state.type === "MESSAGE" && (
                          <div>
                            {!this.state.archived && (
                              <button
                                className="btn-reply-action reply"
                                onClick={this.handleReplyState}
                              >
                                Reply
                              </button>
                            )}

                            {!this.state.archived && (
                              <button
                                className="btn-archive"
                                onClick={this.handleArchive}
                              >
                                Archive
                              </button>
                            )}
                            {this.state.archived && (
                              <button
                                className="btn-unarchive"
                                onClick={this.handleRestore}
                              >
                                Unarchive
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                    {this.state.replyState && (
                      <div>
                        <button
                          className="btn-reply-action discard"
                          onClick={this.handleReplyState}
                        >
                          Discard
                        </button>
                        <button
                          className="btn-reply-action send"
                          onClick={this.handleSend}
                        >
                          Send
                        </button>
                        <button
                          className="btn-reply-action attach"
                          onClick={this.handleShowAttach}
                        >
                          {!this.state.showAttach ? "Attach" : "Remove"}
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="mail-subject-container">
                    <span className="mail-subject">
                      Subject:{" "}
                      <span className="text-normal">{reply.subject}</span>
                    </span>
                    <span className="mail-date">
                      Sent:{" "}
                      <span className="text-normal">
                        {this.epochSecondToDate(
                          reply.messageTimestamp.epochSecond, false
                        )}
                      </span>
                    </span>
                    {this.state.type !== "MESSAGE" && (
                      <span className="mail-date">
                        Notice:{" "}
                        <span className="text-normal">{this.state.info}</span>
                      </span>
                    )}

                    {this.state.type === "MESSAGE" &&
                      (reply.linkedAttachment && reply.linkedAttachment.length > 0) && (
                        <span className="mail-date">
                          Attachment:
                          <span className="text-normal">
                            {reply.linkedAttachment.map((file, i) => (
                              <div key={file.externalRefId}>
                                <a
                                  id={"downloadLink" + file.externalRefId}
                                  download={file.name}
                                />
                                <Link
                                  className="mail-attachment"
                                  onClick={this.downloadFile.bind(
                                    this,
                                    file.externalRefId
                                  )}
                                >
                                  {" "}
                                  {file.name}{" "}({file.size}){" "}
                                </Link>
                              </div>
                            ))}
                          </span>
                        </span>
                      )}
                  </div>
                  <div className="mail-body-container">
                    <span
                      className="mail-body"
                      dangerouslySetInnerHTML={{ __html: reply.body }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}
export default Mail;
