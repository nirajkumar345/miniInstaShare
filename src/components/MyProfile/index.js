import Cookies from 'js-cookie'
import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Profile from '../Profile'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  successfull: 'SUCCESSFULL',
  failure: 'FAILURE',
}

const MyProfile = () => {
  const [response, setResponse] = useState({
    apiStatus: apiStatusConstants.initial,
    data: null,
  })

  const getUpdatedData = profile => ({
    id: profile.id,
    followersCount: profile.followers_count,
    followingCount: profile.following_count,
    postsCount: profile.posts_count,
    profilePic: profile.profile_pic,
    userBio: profile.user_bio,
    username: profile.user_name,
    userId: profile.user_id,
    posts: profile.posts,
    stories: profile.stories,
  })

  const getUserProfileData = async () => {
    setResponse({
      data: null,
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const apiResponse = await fetch(apiUrl, options)
    const data = await apiResponse.json()

    if (apiResponse.ok) {
      const updatedData = getUpdatedData(data.profile)
      setResponse({
        data: updatedData,
        apiStatus: apiStatusConstants.successfull,
      })
    } else {
      setResponse({
        data: null,
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  useEffect(() => {
    getUserProfileData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderSuccessView = () => {
    const {data} = response

    return <Profile profileDetails={data} myProfile />
  }

  const renderLoadingView = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-view-image"
        src="https://res.cloudinary.com/dktwlx0dz/image/upload/v1692611303/ccbp-mini-project-insta-share/failure_rpxiok.png"
        alt="failure view"
      />
      <p className="failure-view-description">
        Something went wrong. Please try again
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={getUserProfileData}
      >
        Try Again
      </button>
    </div>
  )

  const renderMyProfileViews = () => {
    const {apiStatus} = response

    switch (apiStatus) {
      case apiStatusConstants.successfull:
        return renderSuccessView()

      case apiStatusConstants.failure:
        return renderFailureView()

      case apiStatusConstants.inProgress:
        return renderLoadingView()

      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="my-profile-container">{renderMyProfileViews()}</div>
    </>
  )
}

export default MyProfile
