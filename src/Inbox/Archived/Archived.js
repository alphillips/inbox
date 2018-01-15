import React from 'react'
import { hashHistory, Link } from 'react-router'
import wrapPage from '@react-ag-components/core/lib/PageWrapper'
import PathwayList from '@react-ag-components/pathway-list'
import Spinner from 'react-spinner-material'
import * as api from './../../../services/api'
import BackButton from '@react-ag-components/back-button'
import Messages from '@react-ag-components/messages'
import LoadableSection from '@react-ag-components/core/lib/LoadableSection'
import moment from 'moment'


import '../inbox.css'
import './archived.css'

class Archived extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      mails:[],
      error: props.error,
      success: props.success,
      id: this.props.params.id || 1
    }
    this.handleRestore = this.handleRestore.bind(this, null)
  }

  componentDidMount() {
    api.getArchived().then(
      data => {
        this.setState((prevState, props) => ({
          mails: data
        }))
      }
    )
  }

  handleRestore = (e, mail) => {
    let statusBody = {}
    statusBody.id = this.state.mails.messageId
    statusBody.status = false
    api.setArchive(statusBody).then(
      data => {
        this.setState((prevState, props) => ({
          success: 'Message '+'"'+  mail.subject +'"'+ ' has been unarchived'
        }))
      }
    ).catch((error) => {
      console.log(error + " with restoring mail")
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

        <h1>Archived</h1>

        <LoadableSection>
        {this.state.mails && this.state.mails.length > 0 &&

          <div className="inbox archived">
            <PathwayList>
              { this.state.mails.map((mail) =>
                <li className={"inbox-listing "+(!mail.read?"unread":"")} key={mail.messageId + mail.fromParty}>
                <div className="border-unread"></div>
                  <Link to={"/mail/"+mail.messageId}>
                  <span className="inbox-date">{this.epochSecondToDate(mail.messageTimestamp.epochSecond)}</span>
                  <span className="inbox-from">{mail.fromParty}</span>
                  <span className={"inbox-subject"}>{mail.subject}</span>
                  <span className="inbox-body">{mail.body.replace(/<\/?[^>]+(>|$)/g, "")}</span>
                  </Link>
                  <button className="inbox-archive" onClick={this.handleRestore.bind(this, mail)}></button>
                </li>
              )
            }
            </PathwayList>
          </div>
        }
        </LoadableSection>
      </div>
    )
  }
}
export default wrapPage()(Archived)
