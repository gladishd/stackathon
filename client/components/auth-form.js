import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'
import { render } from 'enzyme'

/**
 * COMPONENT
 */
class AuthForm extends React.Component {
  constructor(props) {
    super(props)
    this.alertIfEmpty = this.alertIfEmpty.bind(this)
  }

  alertIfEmpty(evt) {
    const { email, password, displayName, displayImage } = evt.target;
    if (!email.value || !password.value || !displayName.value || !displayImage.value) {
      alert("All forms must be filled out!")
      return false;
    }
    return true;
  }


  render() {
    const { name, displayName, handleSubmit, error } = this.props
    return (
      < div >
        <form onSubmit={
          (e) => {
            let submit = this.alertIfEmpty(e);
            if (submit) { handleSubmit(e) }
          }

        } name={name}>
          <div>
            <label htmlFor="displayImage">
              <small>Display Image</small>
            </label>
            <input name="displayImage" type="text" />
            <label htmlFor="displayName">
              <small>Display Name</small>
            </label>
            <input name="displayName" type="text" />
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />
          </div>
          <div>
            <button type="submit">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href="/auth/google">{displayName} with Google</a>
      </div >
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const displayName = evt.target.displayName.value
      const displayImage = evt.target.displayImage.value
      dispatch(auth(displayName, displayImage, email, password, formName))
      // the order of dispatch matters here, and has to correspond to the order in the database
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
