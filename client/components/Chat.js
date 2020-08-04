import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import MessagesList from './MessagesList'

export default class Main extends Component {
  render() {
    console.log('did we reach the main component?')
    console.log('the props on the chat component are, ', this.props);
    return (
      <div>
        <Sidebar />
        <Navbar />
        <main>
          <Switch>
            <Route path="/channels/:channelId" component={MessagesList} />
            <Redirect to="/channels/1" />
          </Switch>
          {/* <MessagesList /> */}
        </main>
      </div>
    )
  }
}
