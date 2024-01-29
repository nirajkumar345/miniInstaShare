/* eslint-disable react/no-unknown-property */
import {useState} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'
// import {FaSearch} from 'react-icons/fa'
// import {GiHamburgerMenu} from 'react-icons/gi'

import './index.css'

const Header = props => {
  const {match, getUserPostsData} = props
  const {path} = match

  const [showMenu, setShowMenu] = useState(false)
  const [searchInput, setSearchInput] = useState('')

  const toggleShowMenu = () => setShowMenu(prevShowMenu => !prevShowMenu)

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')

    if (showMenu) {
      setShowMenu(false)
    }

    history.replace('/login')
  }

  const onClickSearch = () => {
    if (getUserPostsData && searchInput) getUserPostsData(searchInput)
  }

  const onChangeSearchInput = event => setSearchInput(event.target.value)

  const renderSearchbar = () => (
    <div className="searchbar-container">
      <input
        type="search"
        className="search-input"
        placeholder="Search Caption"
        onChange={onChangeSearchInput}
        value={searchInput}
      />
      <button
        className="search-button"
        type="button"
        testid="searchIcon"
        onClick={onClickSearch}
      >
        {/* {<FaSearch className="search-icon"/>} */}
      </button>
    </div>
  )

  return (
    <div className="header-container">
      <div className="logo-container">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dktwlx0dz/image/upload/v1692266968/ccbp-mini-project-insta-share/website-logo_x8vjof.svg"
            alt="website logo"
            className="header-website-logo"
          />
        </Link>
        <h1 className="header-logo-text">Insta Share</h1>
      </div>

      <div className="hamburger-icon-desktop-menu-container">
        <div className="desktop-menu">
          {path === '/' && renderSearchbar()}
          <Link
            to="/"
            className={`nav-link ${path === '/' ? 'active-nav-link' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/my-profile"
            className={`nav-link ${
              path === '/my-profile' ? 'active-nav-link' : ''
            }`}
          >
            Profile
          </Link>
          <button
            className="logout-button"
            type="button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
        <button
          type="button"
          className="hamburger-button"
          onClick={toggleShowMenu}
        >
          {/* <GiHamburgerMenu className="hamburger-icon" /> */}
        </button>
      </div>

      {showMenu && (
        <div className="mobile-menu">
          {renderSearchbar()}
          <Link
            to="/"
            className={`nav-link ${path === '/' ? 'active-nav-link' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/my-profile"
            className={`nav-link ${
              path === '/my-profile' ? 'active-nav-link' : ''
            }`}
          >
            Profile
          </Link>
          <button
            className="logout-button"
            type="button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default withRouter(Header)
