import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

// These values are all hardcoded...for now!
// Soon, we'll fetch them from the server!
const RANDOM_CHANNEL = '/channels/1'
const GENERAL_CHANNEL = '/channels/2'
const PLANNING_CHANNEL = '/channels/3'
const OTHER_CHANNEL = '/channels/4'

export default class ChannelList extends Component {
  render() {
    return (
      <ul>
        <li>
          <NavLink to={RANDOM_CHANNEL} activeClassName="active">
            <span>random</span>
            <span className="badge"> (3)</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={GENERAL_CHANNEL} activeClassName="active">
            <span>general</span>
            <span className="badge"> (3)</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={PLANNING_CHANNEL} activeClassName="active">
            <span>planning</span>
            <span className="badge"> (3)</span>
          </NavLink>
        </li>
        <li>
          <NavLink to={OTHER_CHANNEL} activeClassName="active">
            <span>other</span>
            <span className="badge"> (3)</span>
          </NavLink>
        </li>
      </ul>
    )
  }
}
