function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import { Link } from "react-router";
import PathwayList from "@react-ag-components/pathway-list";
import * as api from "./api";
import BackButton from "@react-ag-components/back-button";
import Messages from "@react-ag-components/messages";
import Mail from "./Mail";
import moment from "moment";
import LoadableSection from '@react-ag-components/core/lib/LoadableSection';

import "./inbox.css";

var Inbox = function (_React$Component) {
  _inherits(Inbox, _React$Component);

  function Inbox(props) {
    _classCallCheck(this, Inbox);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.componentDidMount = function () {
      _this.updateList();
    };

    _this.componentWillReceiveProps = function (nextProps) {
      if (nextProps.view !== "inbox") {
        _this.backToInboxHome();
      }
    };

    _this.refreshCount = function () {
      _this.props.refreshCount();
    };

    _this.updateList = function () {
      _this.updateInbox();
      _this.refreshCount();
    };

    _this.showArchived = function () {
      _this.updateArchived();
      _this.setState(function (prevState, props) {
        return {
          showArchived: !_this.state.showArchived,
          success: ""
        };
      });
    };

    _this.updateArchived = function () {
      api.getArchived().then(function (data) {
        _this.setState(function (prevState, props) {
          return {
            archives: data
          };
        });
      });
    };

    _this.updateInbox = function () {
      api.getMails().then(function (data) {
        _this.setState(function (prevState, props) {
          return {
            mails: data
          };
        });
      });
    };

    _this.backToInboxHome = function () {
      _this.setState(function (prevState, props) {
        return {
          showMail: false,
          showArchived: false
        };
      });
    };

    _this.epochSecondToDate = function (epochSecond) {
      var eps = epochSecond * 1000;
      var m = moment(eps);
      var s = m.format("D/M/YYYY hh:mm:ss");
      return s;
    };

    _this.setupMail = function (id, type) {
      _this.setState(function (prevState, props) {
        return {
          messageId: id,
          type: type,
          showMail: true
        };
      });
    };

    _this.callbackCloseSelf = function () {
      _this.setState(function (prevState, props) {
        return {
          showMail: false
        };
      });

      _this.updateList();
    };

    _this.callbackSetMessage = function (type, msg) {
      _this.setState(function (prevState, props) {
        var _ref;

        return _ref = {}, _ref[type] = msg, _ref;
      });
    };

    _this.state = {
      mails: {},
      archives: {},
      success: props.success,
      error: props.error,
      attachment: false,
      showArchived: false,
      messageId: null,
      type: "",
      showMail: false
    };
    return _this;
  }

  Inbox.prototype.render = function render() {
    var _this2 = this;

    var mailNode = null;
    if (this.state.showMail) {
      mailNode = React.createElement(Mail, {
        messageId: this.state.messageId,
        type: this.state.type,
        callbackCloseSelf: this.callbackCloseSelf,
        callbackSetMessage: this.callbackSetMessage,
        refreshCount: this.refreshCount
      });
    }

    return React.createElement(
      "div",
      { className: "nexdoc-inbox" },
      !this.state.showMail && React.createElement(
        "div",
        null,
        React.createElement(BackButton, null),
        React.createElement(Messages, { success: this.state.success }),
        React.createElement(
          "h1",
          null,
          !this.state.showArchived && React.createElement(
            "span",
            null,
            "Inbox"
          ),
          " ",
          this.state.showArchived && React.createElement(
            "span",
            null,
            "Archived"
          )
        ),
        React.createElement(
          Link,
          { onClick: this.showArchived, className: "btn-archived" },
          "View ",
          !this.state.showArchived && React.createElement(
            "span",
            null,
            "Archived"
          ),
          " ",
          this.state.showArchived && React.createElement(
            "span",
            null,
            "Inbox"
          )
        ),
        React.createElement(
          PathwayList,
          null,
          React.createElement(
            "div",
            { className: "inbox" },
            React.createElement(
              LoadableSection,
              null,
              this.state.mails && this.state.mails.length > 0 && React.createElement(
                "div",
                null,
                !this.state.showArchived && this.state.mails && this.state.mails.map(function (mail) {
                  return React.createElement(
                    "li",
                    {
                      className: "inbox-listing " + (!mail.read ? "unread" : ""),
                      key: mail.messageId + mail.fromParty
                    },
                    React.createElement("div", { className: "border-unread" }),
                    React.createElement(
                      Link,
                      {
                        onClick: _this2.setupMail.bind(null, mail.messageId, mail.type)
                      },
                      React.createElement(
                        "span",
                        { className: "inbox-date" },
                        _this2.epochSecondToDate(mail.messageTimestamp.epochSecond)
                      ),
                      _this2.state.attachment && React.createElement("span", { className: "inbox-attachment" }),
                      React.createElement(
                        "span",
                        { className: "inbox-from" },
                        mail.fromParty
                      ),
                      React.createElement(
                        "span",
                        { className: "inbox-subject" },
                        mail.subject
                      ),
                      React.createElement(
                        "span",
                        { className: "inbox-body" },
                        mail.body.replace(/<\/?[^>]+(>|$)/g, "")
                      )
                    )
                  );
                })
              ),
              this.state.showArchived && this.state.archives && this.state.archives.length > 0 && this.state.archives.map(function (mail) {
                return React.createElement(
                  "li",
                  {
                    className: "inbox-listing " + (!mail.read ? "unread" : ""),
                    key: mail.messageId + mail.fromParty
                  },
                  React.createElement("div", { className: "border-unread" }),
                  React.createElement(
                    Link,
                    {
                      onClick: _this2.setupMail.bind(null, mail.messageId, mail.type)
                    },
                    React.createElement(
                      "span",
                      { className: "inbox-date" },
                      _this2.epochSecondToDate(mail.messageTimestamp.epochSecond)
                    ),
                    _this2.state.attachment && React.createElement("span", { className: "inbox-attachment" }),
                    React.createElement(
                      "span",
                      { className: "inbox-from" },
                      mail.fromParty
                    ),
                    React.createElement(
                      "span",
                      { className: "inbox-subject" },
                      mail.subject
                    ),
                    React.createElement(
                      "span",
                      { className: "inbox-body" },
                      mail.body.replace(/<\/?[^>]+(>|$)/g, "")
                    )
                  )
                );
              })
            )
          )
        )
      ),
      this.state.showMail && mailNode
    );
  };

  return Inbox;
}(React.Component);

export default Inbox;