import React from 'react'
import PathwayList from '@react-ag-components/pathway-list'
import Spinner from 'react-spinner-material'
import BackButton from '@react-ag-components/back-button'
import Messages from '@react-ag-components/messages'
import LoadableSection from '@react-ag-components/core/lib/LoadableSection'
import moment from 'moment'

import Archived from './Archived'
import Mail from './Mail'


import './inbox.css'

class Inbox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      mails:props.mails || {},
      archives:props.archives || {},
      success:props.success,
      error:props.error,
      attachment: false,
      mailItem: {}
    }
    this.handleArchive = this.handleArchive.bind(this, null)
  }

  handleArchive = (e, mail) => {
    let statusBody = {}
    statusBody.id = mail.id
    statusBody.archived = true
    api.setArchive(statusBody).then(
      data => {
        this.setState((prevState, props) => ({
          success: 'Message '+'"'+  mail.subject +'"'+ ' has been archived'
        }))
      }
    ).catch((error) => {
      console.log(error + " with archiving mail")
    })
  }

  epochSecondToDate = (epochSecond) => {
    var eps = epochSecond * 1000
    var m = moment(eps)
    var s = m.format("D/M/YYYY hh:mm:ss")
    return s
  }

  openMail = (id) => {
    this.props.openMail(id)
  }

  showArchives = () => {

  }

  render() {
    return (
      <div className="nexdoc-inbox">
        <BackButton />
        <Messages success={this.state.success} />

        <h1>Inbox</h1>
        <a onClick={this.showArchives} className="btn-archived">View Archived</a>

        <LoadableSection>

        {this.state.mails && this.state.mails.length > 0 &&

          <div className="inbox">
            <PathwayList>
              { this.state.mails.map((mail) =>
                <li className={"inbox-listing "+(!mail.read?"unread":"")} key={mail.messageId + mail.fromParty}>
                  <div className="border-unread"></div>
                  <a onClick={this.openMail.bind(this, mail.messageId)} >
                    <span className="inbox-date">{this.epochSecondToDate(mail.messageTimestamp.epochSecond)}</span>
                    {this.state.attachment &&
                      <span className="inbox-attachment"></span>
                    }
                    <span className="inbox-from">{mail.fromParty}</span>
                    <span className="inbox-subject">{mail.subject}</span>
                    <span className="inbox-body">{mail.body.replace(/<\/?[^>]+(>|$)/g, "")}</span>
                  </a>
                </li>
              )}
            </PathwayList>
              <Archived archives={this.state.archives} openMail={this.openMail} />
          </div>
        }

        </LoadableSection>
      </div>
    )
  }
}
export default (Inbox)
