import {useState} from 'react'
import {Redirect} from 'react-router-dom'

import './index.css'
import Cookies from 'js-cookie'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const onChangeUsername = event => setUsername(event.target.value)
  const onChangePassword = event => setPassword(event.target.value)

  const onSuccessfulLogin = jwtToken => {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  const onSubmitEventHandler = async event => {
    event.preventDefault()

    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      onSuccessfulLogin(data.jwt_token)
    } else {
      setErrorMsg(data.error_msg)
    }
  }

  const renderForm = () => (
    <form className="login-card" onSubmit={onSubmitEventHandler}>
      <img
        className="login-website-logo"
        src="https://res.cloudinary.com/dktwlx0dz/image/upload/v1692266968/ccbp-mini-project-insta-share/website-logo_x8vjof.svg"
        alt="website logo"
      />
      <h1>Insta share</h1>
      <label htmlFor="username">USERNAME</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={onChangeUsername}
      />
      <label htmlFor="password">PASSWORD</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={onChangePassword}
      />
      {errorMsg !== '' && <p className="error-message">{errorMsg}</p>}
      <button type="submit" className="login-button">
        Login
      </button>
    </form>
  )

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="login-container">
      <img
        className="website-login-image"
        src="https://res.cloudinary.com/dktwlx0dz/image/upload/v1692274623/ccbp-mini-project-insta-share/website-login_yfxduj.png"
        alt="website login"
      />
      {renderForm()}
    </div>
  )
}

export default Login
