function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import * as api from "./../api";
import { Link } from "react-router";
import Dropzone from "react-dropzone";
import Messages from "@react-ag-components/messages";
import moment from "moment";

import "./mail.css";

var Mail = function (_React$Component) {
  _inherits(Mail, _React$Component);

  function Mail(props) {
    _classCallCheck(this, Mail);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.refreshCount = function () {
      _this.props.refreshCount();
    };

    _this.handleReplyState = function () {
      _this.setState(function (prevState, props) {
        return {
          replyState: !_this.state.replyState,
          showAttach: false,
          error: ""
        };
      });
      _this.clearAttachment();
      _this.clearReplyContent();
    };

    _this.handleReplyContent = function (event) {
      _this.setState({ html: event.target.value });
    };

    _this.totalFileSize = function (files) {
      var totalFileSize = 0;
      files.map(function (file) {
        totalFileSize = totalFileSize + file.size;
      });
      return totalFileSize;
    };

    _this.handleShowAttach = function () {
      _this.setState(function (prevState, props) {
        return {
          showAttach: !_this.state.showAttach,
          error: ""
        };
      });
      if (!_this.state.showAttach) {
        _this.clearAttachment();
      }
    };

    _this.handleSend = function () {
      var reply = {};
      var loading = true;

      _this.setState({ loading: loading });

      if (_this.state.html && _this.state.html !== "") {
        var totalFileSize = _this.totalFileSize(_this.state.files);

        if (totalFileSize < 10485760) {
          reply.subject = _this.state.subject.indexOf("Re:") > -1 ? _this.state.subject : "Re: " + _this.state.subject;
          reply.body = _this.state.html;
          reply.linkedAttachment = _this.state.files;
          reply.parentId = _this.state.id;

          api.sendMail(reply).then(function (data) {
            _this.props.callbackSetMessage("success", "Message " + '"' + _this.state.subject + '"' + " has been sent"), _this.props.callbackCloseSelf();
          });
        } else {
          _this.setState(function (prevState, props) {
            return {
              error: "Attachment upload has exceeded 10MB.  Remove some attachments and try again.",
              loading: false
            };
          });
          window.scroll(0, 0);
        }
      } else {
        _this.setState(function (prevState, props) {
          return {
            error: "Please provide message",
            loading: false
          };
        });
        window.scroll(0, 0);
      }
    };

    _this.clearAttachment = function () {
      _this.setState(function (prevState, props) {
        return {
          files: []
        };
      });
    };

    _this.clearReplyContent = function () {
      _this.setState({ html: "" });
    };

    _this.handleArchive = function (e) {
      var statusBody = {};
      statusBody.messageId = _this.state.id;
      statusBody.archived = true;
      api.setArchive(statusBody).then(function (data) {
        _this.props.callbackSetMessage("success", "Message " + '"' + _this.state.mails[0].subject + '"' + " has been archived");
        _this.props.callbackCloseSelf();
      }).catch(function (error) {
        console.log(error + " with archiving mail");
      });
    };

    _this.handleRestore = function (e) {
      var statusBody = {};
      statusBody.messageId = _this.state.id;
      statusBody.archived = false;
      api.setArchive(statusBody).then(function (data) {
        _this.props.callbackSetMessage("success", "Message " + '"' + _this.state.mails[0].subject + '"' + " has been unarchived");
        _this.props.callbackCloseSelf();
      }).catch(function (error) {
        console.log(error + " with restoring mail");
      });
    };

    _this.onDrop = function (files) {
      files.forEach(function (file) {
        var reader = new FileReader();
        var fileObj = {};
        reader.readAsDataURL(file);
        reader.onload = function () {
          fileObj.name = file.name;
          fileObj.mimeType = file.type;
          fileObj.size = file.size;
          fileObj.data = unescape(encodeURIComponent(reader.result.split(",")[1]));
          var thisStateFiles = _this.state.files;
          thisStateFiles.push(fileObj);
          _this.setState(function (prevState, props) {
            return {
              files: thisStateFiles
            };
          });
        };
      });
    };

    _this.removeFile = function (e) {
      var array = _this.state.files;
      var index = e.target.getAttribute("data-value");
      array.splice(index, 1);
      _this.setState(function (prevState, props) {
        return {
          files: array,
          error: ""
        };
      });
    };

    _this.downloadFile = function (id) {
      api.getMailAttachment(id).then(function (data) {
        var fileHeader = "data:" + data.mimeType + ";base64,";

        var fileData = "";

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

    _this.bytesToSize = function (bytes) {
      var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      if (bytes == 0) return "0 Byte";
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
    };

    _this.epochSecondToDate = function (epochSecond, onlyDate) {
      var eps = epochSecond * 1000;
      var m = moment(eps);
      var s = onlyDate ? m.format("D/M/YYYY") : m.format("D/M/YYYY hh:mm:ss");
      return s;
    };

    _this.onClose = function () {
      _this.props.callbackCloseSelf();
      _this.props.callbackSetMessage("success", "");
    };

    _this.state = {
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
      archived: false,
      loading: false
    };
    _this.replies = [];
    _this.handleReplyContent = _this.handleReplyContent.bind(_this);
    return _this;
  }

  Mail.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    if (this.state.type === "MESSAGE") {
      api.getMail(this.state.messageId).then(function (data) {
        var threadMessage = data.linkedMessage;
        threadMessage.push(data);
        _this2.setState(function (prevState, props) {
          return {
            mails: threadMessage,
            read: data.read,
            archived: data.archived,
            id: data.messageId,
            subject: data.subject
          };
        });

        if (!_this2.state.read) {
          var statusBody = {};
          statusBody.messageId = _this2.state.id;
          statusBody.status = true;
        }
      });
    } else {
      api.getMailFromAll(this.state.messageId).then(function (data) {
        var expiryDate = data.expiryTimestamp && data.expiryTimestamp.epochSecond ? _this2.epochSecondToDate(data.expiryTimestamp.epochSecond, true) : null;
        var threadMessage = [];
        threadMessage.push(data);
        _this2.setState(function (prevState, props) {
          return {
            mails: threadMessage,
            read: data.read,
            archived: data.archived,
            id: data.messageId,
            subject: data.subject
          };
        });

        if (expiryDate && expiryDate !== null) {
          _this2.setState(function (prevState, props) {
            return {
              info: "This notification will expire on " + expiryDate + "."
            };
          });
        }

        if (!_this2.state.read) {
          var statusBody = {};
          statusBody.messageId = _this2.state.id;
          statusBody.status = true;
        }
      });
    }
  };

  Mail.prototype.render = function render() {
    var _this3 = this,
        _React$createElement2;

    return React.createElement(
      "div",
      null,
      React.createElement(
        "a",
        {
          className: "back-button uikit-direction-link uikit-direction-link--left",
          onClick: this.onClose
        },
        " ",
        "Back",
        " "
      ),
      React.createElement(Messages, { success: this.state.success, error: this.state.error, info: this.state.info }),
      React.createElement(
        "div",
        (_React$createElement2 = {
          className: ""
        }, _React$createElement2["className"] = this.state.replyState ? "nexdoc-mail-container reply" : "nexdoc-mail-container", _React$createElement2),
        React.createElement(
          "div",
          { className: "nexdoc-mail" },
          React.createElement("textarea", {
            value: this.state.html,
            onChange: this.handleReplyContent,
            className: this.state.replyState ? "reply-area reply" : "reply-area"
          }),
          this.state.showAttach && React.createElement(
            "div",
            null,
            React.createElement(
              Dropzone,
              {
                onDrop: this.onDrop.bind(this),
                className: "file-drop-zone"
              },
              this.state.name ? React.createElement(
                "p",
                null,
                "File ",
                React.createElement(
                  "strong",
                  null,
                  this.state.name
                ),
                " selected"
              ) : React.createElement(
                "p",
                null,
                "Select or drag and drop a file"
              )
            ),
            this.state.files.length > 0 && React.createElement(
              "aside",
              { className: "attach-files" },
              React.createElement(
                "h2",
                null,
                "Attaching files"
              ),
              React.createElement(
                "ul",
                null,
                this.state.files.map(function (f, i) {
                  var _React$createElement;

                  return React.createElement(
                    "li",
                    (_React$createElement = {
                      key: f.name + f.size,
                      "data-value": i,
                      onClick: _this3.removeFile.bind(_this3)
                    }, _React$createElement["key"] = f.name, _React$createElement),
                    f.name,
                    " - ",
                    _this3.bytesToSize(f.size)
                  );
                })
              )
            )
          ),
          this.state.mails && this.state.mails.map(function (reply, i) {
            return React.createElement(
              "div",
              { key: reply.messageId, className: "reply-mail-" + i },
              React.createElement(
                "div",
                { className: "mail-from" },
                "From: ",
                React.createElement(
                  "span",
                  { className: "text-normal" },
                  reply.fromParty
                ),
                !_this3.state.replyState && React.createElement(
                  "div",
                  null,
                  _this3.state.type === "MESSAGE" && React.createElement(
                    "div",
                    null,
                    !_this3.state.archived && React.createElement(
                      "button",
                      {
                        className: "btn-reply-action reply",
                        onClick: _this3.handleReplyState
                      },
                      "Reply"
                    ),
                    !_this3.state.archived && React.createElement(
                      "button",
                      {
                        className: "btn-archive",
                        onClick: _this3.handleArchive
                      },
                      "Archive"
                    ),
                    _this3.state.archived && React.createElement(
                      "button",
                      {
                        className: "btn-unarchive",
                        onClick: _this3.handleRestore
                      },
                      "Unarchive"
                    )
                  )
                ),
                _this3.state.replyState && React.createElement(
                  "div",
                  null,
                  React.createElement(
                    "button",
                    {
                      className: "btn-reply-action discard",
                      onClick: _this3.handleReplyState
                    },
                    "Discard"
                  ),
                  React.createElement(
                    "button",
                    {
                      className: "btn-reply-action send",
                      onClick: _this3.handleSend,
                      disabled: _this3.state.loading
                    },
                    "Send"
                  ),
                  React.createElement(
                    "button",
                    {
                      className: "btn-reply-action attach",
                      onClick: _this3.handleShowAttach
                    },
                    !_this3.state.showAttach ? "Attach" : "Remove"
                  )
                )
              ),
              React.createElement(
                "div",
                { className: "mail-subject-container" },
                React.createElement(
                  "span",
                  { className: "mail-subject" },
                  "Subject:",
                  " ",
                  React.createElement(
                    "span",
                    { className: "text-normal" },
                    reply.subject
                  )
                ),
                React.createElement(
                  "span",
                  { className: "mail-date" },
                  "Sent:",
                  " ",
                  React.createElement(
                    "span",
                    { className: "text-normal" },
                    _this3.epochSecondToDate(reply.messageTimestamp.epochSecond, false)
                  )
                ),
                _this3.state.type !== "MESSAGE" && React.createElement(
                  "span",
                  { className: "mail-date" },
                  "Notice:",
                  " ",
                  React.createElement(
                    "span",
                    { className: "text-normal" },
                    _this3.state.info
                  )
                ),
                _this3.state.type === "MESSAGE" && reply.linkedAttachment && reply.linkedAttachment.length > 0 && React.createElement(
                  "span",
                  { className: "mail-date" },
                  "Attachment:",
                  React.createElement(
                    "span",
                    { className: "text-normal" },
                    reply.linkedAttachment.map(function (file, i) {
                      return React.createElement(
                        "div",
                        { key: file.externalRefId },
                        React.createElement("a", {
                          id: "downloadLink" + file.externalRefId,
                          download: file.name
                        }),
                        React.createElement(
                          Link,
                          {
                            className: "mail-attachment",
                            onClick: _this3.downloadFile.bind(_this3, file.externalRefId)
                          },
                          " ",
                          file.name,
                          " ",
                          "(",
                          file.size,
                          ")",
                          " "
                        )
                      );
                    })
                  )
                )
              ),
              React.createElement(
                "div",
                { className: "mail-body-container" },
                React.createElement("span", {
                  className: "mail-body",
                  dangerouslySetInnerHTML: { __html: reply.body }
                })
              )
            );
          })
        )
      )
    );
  };

  return Mail;
}(React.Component);

export default Mail;