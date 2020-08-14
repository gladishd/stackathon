import React, { Component, useImperativeHandle } from 'react'
import ChannelList from './ChannelList'
import { me } from '../store'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Sidebar extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <section className="sidebar">
        <div className="sidebar-header">
          <h3 href="#">
            <div>Chat!</div>

            <i alt="Brand" className="glyphicon glyphicon-comment" />
          </h3>
        </div>
        <h5>Channels</h5>
        <ChannelList />
      </section>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    email: state.user.email,
    googleId: state.user.googleId
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Sidebar))

Sidebar.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
