"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _PageWrapper = require("@react-ag-components/core/lib/PageWrapper");

var _PageWrapper2 = _interopRequireDefault(_PageWrapper);

var _pathwayList = require("@react-ag-components/pathway-list");

var _pathwayList2 = _interopRequireDefault(_pathwayList);

var _api = require("./../api");

var api = _interopRequireWildcard(_api);

var _backButton = require("@react-ag-components/back-button");

var _backButton2 = _interopRequireDefault(_backButton);

var _messages = require("@react-ag-components/messages");

var _messages2 = _interopRequireDefault(_messages);

var _Mail = require("./Mail");

var _Mail2 = _interopRequireDefault(_Mail);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

require("./inbox.css");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inbox = function (_React$Component) {
  _inherits(Inbox, _React$Component);

  function Inbox(props) {
    _classCallCheck(this, Inbox);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.epochSecondToDate = function (epochSecond) {
      var eps = epochSecond * 1000;
      var m = (0, _moment2.default)(eps);
      var s = m.format("D/M/YYYY hh:mm:ss");
      return s;
    };

    _this.showArchived = function () {
      _this.setState(function (prevState, props) {
        return {
          showArchived: !_this.state.showArchived
        };
      });
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

  Inbox.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    api.getMails().then(function (data) {
      _this2.setState(function (prevState, props) {
        return {
          mails: data
        };
      });
    });

    api.getArchived().then(function (data) {
      _this2.setState(function (prevState, props) {
        return {
          archives: data
        };
      });
    });
  };

  Inbox.prototype.render = function render() {
    var _this3 = this;

    var mailNode = null;
    if (this.state.showMail) {
      mailNode = _react2.default.createElement(_Mail2.default, {
        messageId: this.state.messageId,
        type: this.state.type,
        callbackCloseSelf: this.callbackCloseSelf,
        callbackSetMessage: this.callbackSetMessage });
    }

    return _react2.default.createElement(
      "div",
      { className: "nexdoc-inbox" },
      !this.state.showMail && _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_backButton2.default, null),
        _react2.default.createElement(_messages2.default, { success: this.state.success }),
        _react2.default.createElement(
          "h1",
          null,
          !this.state.showArchived && _react2.default.createElement(
            "span",
            null,
            "Inbox"
          ),
          " ",
          this.state.showArchived && _react2.default.createElement(
            "span",
            null,
            "Archived"
          )
        ),
        _react2.default.createElement(
          _reactRouter.Link,
          { onClick: this.showArchived, className: "btn-archived" },
          "View ",
          !this.state.showArchived && _react2.default.createElement(
            "span",
            null,
            "Archived"
          ),
          " ",
          this.state.showArchived && _react2.default.createElement(
            "span",
            null,
            "Inbox"
          )
        ),
        this.state.mails && this.state.mails.length > 0 && _react2.default.createElement(
          "div",
          { className: "inbox" },
          _react2.default.createElement(
            _pathwayList2.default,
            null,
            !this.state.showArchived && this.state.mails.map(function (mail) {
              return _react2.default.createElement(
                "li",
                {
                  className: "inbox-listing " + (!mail.read ? "unread" : ""),
                  key: mail.messageId + mail.fromParty
                },
                _react2.default.createElement("div", { className: "border-unread" }),
                _react2.default.createElement(
                  _reactRouter.Link,
                  {
                    onClick: _this3.setupMail.bind(null, mail.messageId, mail.type)
                  },
                  _react2.default.createElement(
                    "span",
                    { className: "inbox-date" },
                    _this3.epochSecondToDate(mail.messageTimestamp.epochSecond)
                  ),
                  _this3.state.attachment && _react2.default.createElement("span", { className: "inbox-attachment" }),
                  _react2.default.createElement(
                    "span",
                    { className: "inbox-from" },
                    mail.fromParty
                  ),
                  _react2.default.createElement(
                    "span",
                    { className: "inbox-subject" },
                    mail.subject
                  ),
                  _react2.default.createElement(
                    "span",
                    { className: "inbox-body" },
                    mail.body.replace(/<\/?[^>]+(>|$)/g, "")
                  )
                )
              );
            }),
            this.state.showArchived && this.state.archives.map(function (mail) {
              return _react2.default.createElement(
                "li",
                {
                  className: "inbox-listing " + (!mail.read ? "unread" : ""),
                  key: mail.messageId + mail.fromParty
                },
                _react2.default.createElement("div", { className: "border-unread" }),
                _react2.default.createElement(
                  _reactRouter.Link,
                  {
                    onClick: _this3.setupMail.bind(null, mail.messageId, mail.type)
                  },
                  _react2.default.createElement(
                    "span",
                    { className: "inbox-date" },
                    _this3.epochSecondToDate(mail.messageTimestamp.epochSecond)
                  ),
                  _this3.state.attachment && _react2.default.createElement("span", { className: "inbox-attachment" }),
                  _react2.default.createElement(
                    "span",
                    { className: "inbox-from" },
                    mail.fromParty
                  ),
                  _react2.default.createElement(
                    "span",
                    { className: "inbox-subject" },
                    mail.subject
                  ),
                  _react2.default.createElement(
                    "span",
                    { className: "inbox-body" },
                    mail.body.replace(/<\/?[^>]+(>|$)/g, "")
                  )
                )
              );
            })
          )
        )
      ),
      this.state.showMail && mailNode
    );
  };

  return Inbox;
}(_react2.default.Component);

exports.default = (0, _PageWrapper2.default)()(Inbox);
module.exports = exports["default"];