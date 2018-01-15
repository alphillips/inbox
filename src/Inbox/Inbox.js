import React from 'react'
import { hashHistory, Link } from 'react-router'
import wrapPage from '@react-ag-components/core/lib/PageWrapper'
import PathwayList from '@react-ag-components/pathway-list'
import Spinner from 'react-spinner-material'
import * as api from './../api'
import BackButton from '@react-ag-components/back-button'
import Messages from '@react-ag-components/messages'
import LoadableSection from '@react-ag-components/core/lib/LoadableSection'
import moment from 'moment'


import './inbox.css'

class Inbox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      mails:{},
      success:props.success,
      error:props.error
    }
    this.handleArchive = this.handleArchive.bind(this, null)
  }

  componentDidMount() {
    api.getMails().then(
      data => {
        this.setState((prevState, props) => ({
          mails: data
        }))
      }
    ).catch((error) => {
      if(error && error.length > 0){
        let messages = error.filter((e) => e.code != null).map((e) => e.message)
        let message = messages.join('\n')
        this.setState((prevState, props) => ({
          error: message
        }))
        window.scrollTo(0, 0)
      }
    })
  }

  handleArchive = (e, mail) => {
    let statusBody = {}
    statusBody.id = mail.id
    statusBody.status = true
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
    var m = moment(epochSecond)
    var s = m.format("D/M/YYYY")
    return s
  }

  render() {
    return (
      <div className="nexdoc-inbox">
        <BackButton />
        <Messages success={this.state.success} />

        <h1>Inbox</h1>
        <Link to="/archived" className="btn-archived">View Archived</Link>

        <LoadableSection>

        {this.state.mails && this.state.mails.length > 0 &&

          <div className="inbox">
            <PathwayList>
              { this.state.mails.map((mail) =>
                <li className={"inbox-listing "+(!mail.read?"unread":"")} key={mail.messageId + mail.fromParty}>
                  <div className="border-unread"></div>
                  <Link to={"/mail/"+mail.messageId}>
                    <span className="inbox-date">{this.epochSecondToDate(mail.messageTimestamp.epochSecond)}</span>
                    <span className="inbox-from">{mail.fromParty}</span>
                    <span className="inbox-subject">{mail.subject}</span>
                    <span className="inbox-body">{mail.body.replace(/<\/?[^>]+(>|$)/g, "")}</span>
                  </Link>
                  <button className="inbox-archive" onClick={this.handleArchive.bind(this, mail)}></button>
                </li>
              )}
            </PathwayList>
          </div>
        }

        </LoadableSection>
      </div>
    )
  }
}
export default wrapPage()(Inbox)
