import React from "react";
import { Link } from "react-router";
import PathwayList from "@react-ag-components/pathway-list";
import * as api from "./api";
import BackButton from "@react-ag-components/back-button";
import Messages from "@react-ag-components/messages";
import Mail from "./Mail";
import moment from "moment";

import "./inbox.css";

class Inbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  componentDidMount = () => {
    this.updateList()
  };

  componentWillReceiveProps = nextProps => {
    if(nextProps.view !== "inbox") {
      this.backToInboxHome()
    }
  };

  refreshCount = () => {
    this.props.refreshCount()
  }

  updateList = () => {
    api.getMails().then(data => {
      this.setState((prevState, props) => ({
        mails: data
      }));
    });

    api.getArchived().then(data => {
      this.setState((prevState, props) => ({
        archives: data
      }));
    });
    this.refreshCount()
  };

  backToInboxHome = () => {
    this.setState((prevState, props) => ({
      showMail: false,
      showArchived: false,
      error: "",
      info:"",
      success:""
    }));
  }

  epochSecondToDate = epochSecond => {
    var eps = epochSecond * 1000;
    var m = moment(eps);
    var s = m.format("D/M/YYYY hh:mm:ss");
    return s;
  };

  showArchived = () => {
    this.setState((prevState, props) => ({
      showArchived: !this.state.showArchived,
      success: ""
    }));
  };

  setupMail = (id, type) => {
    this.setState((prevState, props) => ({
      messageId: id,
      type: type,
      showMail: true
    }));
  };

  callbackCloseSelf = () => {
    this.setState((prevState, props) => ({
      showMail: false
    }));

    this.updateList();
  };

  callbackSetMessage = (type, msg) => {
    this.setState((prevState, props) => ({
      [type]: msg
    }));
  };

  render() {
    var mailNode = null;
    if (this.state.showMail) {
      mailNode = (
        <Mail
          messageId={this.state.messageId}
          type={this.state.type}
          callbackCloseSelf={this.callbackCloseSelf}
          callbackSetMessage={this.callbackSetMessage}
          refreshCount={this.refreshCount}
        />
      );
    }

    return (
      <div className="nexdoc-inbox">
        {!this.state.showMail && (
          <div>
            <BackButton />
            <Messages success={this.state.success} />

            <h1>
              {!this.state.showArchived && <span>Inbox</span>}{" "}
              {this.state.showArchived && <span>Archived</span>}
            </h1>
            <Link onClick={this.showArchived} className="btn-archived">
              View {!this.state.showArchived && <span>Archived</span>}{" "}
              {this.state.showArchived && <span>Inbox</span>}
            </Link>

            <PathwayList>
              <div className="inbox">
                {this.state.mails &&
                  this.state.mails.length > 0 && (
                    <div>
                      {!this.state.showArchived &&
                        this.state.mails.map(mail => (
                          <li
                            className={
                              "inbox-listing " + (!mail.read ? "unread" : "")
                            }
                            key={mail.messageId + mail.fromParty}
                          >
                            <div className="border-unread" />
                            <Link
                              onClick={this.setupMail.bind(
                                null,
                                mail.messageId,
                                mail.type
                              )}
                            >
                              <span className="inbox-date">
                                {this.epochSecondToDate(
                                  mail.messageTimestamp.epochSecond
                                )}
                              </span>
                              {this.state.attachment &&  (
                                <span className="inbox-attachment" />
                              )}
                              <span className="inbox-from">
                                {mail.fromParty}
                              </span>
                              <span className="inbox-subject">
                                {mail.subject}
                              </span>
                              <span className="inbox-body">
                                {mail.body.replace(/<\/?[^>]+(>|$)/g, "")}
                              </span>
                            </Link>
                          </li>
                        ))}
                    </div>
                  )}
                {this.state.showArchived &&
                  this.state.archives.map(mail => (
                    <li
                      className={
                        "inbox-listing " + (!mail.read ? "unread" : "")
                      }
                      key={mail.messageId + mail.fromParty}
                    >
                      <div className="border-unread" />
                      <Link
                        onClick={this.setupMail.bind(
                          null,
                          mail.messageId,
                          mail.type
                        )}
                      >
                        <span className="inbox-date">
                          {this.epochSecondToDate(
                            mail.messageTimestamp.epochSecond
                          )}
                        </span>
                        {this.state.attachment && (
                          <span className="inbox-attachment" />
                        )}
                        <span className="inbox-from">{mail.fromParty}</span>
                        <span className="inbox-subject">{mail.subject}</span>
                        <span className="inbox-body">
                          {mail.body.replace(/<\/?[^>]+(>|$)/g, "")}
                        </span>
                      </Link>
                    </li>
                  ))}
              </div>
            </PathwayList>
          </div>
        )}

        {this.state.showMail && mailNode}
      </div>
    );
  }
}
export default Inbox;
