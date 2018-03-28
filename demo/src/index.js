import React, {Component} from 'react'
import {render} from 'react-dom'

import Inbox from './../../src/Inbox'

class Demo extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <Inbox />
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))
