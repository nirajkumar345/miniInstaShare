import Cookies from 'js-cookie'
import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import StoriesSlick from '../StoriesSlick'
import PostItem from '../PostItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN PROGRESS',
  successfull: 'SUCCESSFULL',
  failure: 'FAILURE',
}

const Home = () => {
  const [userStoriesResponse, setUserStoriesResponse] = useState({
    userStories: [],
    apiStatus: apiStatusConstants.initial,
  })
  const [postsResponse, setPostsResponse] = useState({
    posts: [],
    searchPosts: [],
    apiStatus: apiStatusConstants.initial,
  })

  const getUserStoriesData = async () => {
    setUserStoriesResponse(prevState => ({
      ...prevState,
      apiStatus: apiStatusConstants.inProgress,
    }))

    const jwtToken = Cookies.get('jwt_token')
    const userStoriesApiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const userStoriesApiResponse = await fetch(userStoriesApiUrl, options)
    const data = await userStoriesApiResponse.json()

    if (userStoriesApiResponse.ok) {
      setUserStoriesResponse(prevState => ({
        ...prevState,
        userStories: data.users_stories,
        apiStatus: apiStatusConstants.successfull,
      }))
    } else {
      setUserStoriesResponse(prevState => ({
        ...prevState,
        apiStatus: apiStatusConstants.failure,
      }))
    }
  }

  useEffect(() => {
    getUserStoriesData()
  }, [])

  const getUpdatedPostsList = posts =>
    posts.map(eachPost => ({
      postId: eachPost.post_id,
      userId: eachPost.user_id,
      username: eachPost.user_name,
      createdAt: eachPost.created_at,
      profilePic: eachPost.profile_pic,
      postDetails: {
        imageUrl: eachPost.post_details.image_url,
        caption: eachPost.post_details.caption,
      },
      likesCount: eachPost.likes_count,
      comments: eachPost.comments.map(eachComment => ({
        username: eachComment.user_name,
        userId: eachComment.user_id,
        comment: eachComment.comment,
      })),
    }))

  const getUserPostsData = async (searchInput = '') => {
    setPostsResponse(prevState => ({
      ...prevState,
      apiStatus: apiStatusConstants.inProgress,
    }))

    const jwtToken = Cookies.get('jwt_token')
    const userPostsApiUrl =
      searchInput === ''
        ? 'https://apis.ccbp.in/insta-share/posts'
        : `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const userPostsApiResponse = await fetch(userPostsApiUrl, options)
    const data = await userPostsApiResponse.json()

    console.log(data, 'user / search posts response')

    if (userPostsApiResponse.ok) {
      const updatedData = getUpdatedPostsList(data.posts)
      setPostsResponse(prevState => ({
        ...prevState,
        searchInput,
        posts: updatedData,
        apiStatus: apiStatusConstants.successfull,
      }))
    } else {
      setPostsResponse(prevState => ({
        ...prevState,
        apiStatus: apiStatusConstants.failure,
      }))
    }
  }

  useEffect(() => {
    getUserPostsData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const IncreaseLikeCount = postId => {
    setPostsResponse(prevState => ({
      ...prevState,
      posts: prevState.posts.map(post =>
        post.postId === postId
          ? {...post, likesCount: post.likesCount + 1}
          : post,
      ),
    }))
  }

  const DecreaseLikeCount = postId => {
    setPostsResponse(prevState => ({
      ...prevState,
      posts: prevState.posts.map(post =>
        post.postId === postId
          ? {...post, likesCount: post.likesCount - 1}
          : post,
      ),
    }))
  }

  const renderLoadingView = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  const renderPostApiFailureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-view-image"
        src="https://res.cloudinary.com/dktwlx0dz/image/upload/v1692360691/ccbp-mini-project-insta-share/alert-triangle_elxwl5.png"
        alt="failure view"
      />
      <p className="failure-view-description">
        Something went wrong. Please try again
      </p>
      <button className="retry-button" type="button" onClick={getUserPostsData}>
        Try Again
      </button>
    </div>
  )

  const renderPostItems = () => {
    const {posts, searchInput} = postsResponse

    console.log(postsResponse, 'Post response')

    if (posts.length === 0) {
      return (
        <div className="failure-view-container">
          <img
            className="failure-view-image"
            src="https://res.cloudinary.com/dktwlx0dz/image/upload/v1697519400/ccbp-mini-project-insta-share/no-results-found.png"
            alt="search not found"
          />
          <h1 className="no-results-heading">Search Not Found</h1>
          <p className="no-results-description">
            Try different keyword or search again
          </p>
        </div>
      )
    }

    return (
      <>
        {searchInput && (
          <h1 className="search-results-heading">Search Results</h1>
        )}
        <ul className="posts-list-container">
          {posts.map(eachPost => (
            <PostItem
              key={eachPost.postId}
              postItemDetails={eachPost}
              IncreaseLikeCount={IncreaseLikeCount}
              DecreaseLikeCount={DecreaseLikeCount}
            />
          ))}
        </ul>
      </>
    )
  }

  const renderPostViews = () => {
    const {apiStatus} = postsResponse

    switch (apiStatus) {
      case apiStatusConstants.failure:
        return renderPostApiFailureView()

      case apiStatusConstants.successfull:
        return renderPostItems()

      case apiStatusConstants.inProgress:
        return renderLoadingView()

      default:
        return null
    }
  }

  const renderUserStoryApiFailureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-view-image sm"
        src="https://res.cloudinary.com/dktwlx0dz/image/upload/v1692360691/ccbp-mini-project-insta-share/alert-triangle_elxwl5.png"
        alt="failure view"
      />
      <p className="failure-view-description sm-text">
        Something went wrong. Please try again
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={getUserStoriesData}
      >
        Try Again
      </button>
    </div>
  )

  const renderUserStoryViews = () => {
    const {apiStatus, userStories} = userStoriesResponse
    const {searchPosts} = postsResponse

    switch (apiStatus) {
      case apiStatusConstants.failure:
        return renderUserStoryApiFailureView()

      case apiStatusConstants.successfull:
        return !searchPosts.length && <StoriesSlick userStories={userStories} />

      case apiStatusConstants.inProgress:
        return renderLoadingView()

      default:
        return null
    }
  }

  return (
    <>
      <Header getUserPostsData={getUserPostsData} />
      <div className="home-container">
        {!postsResponse.searchInput && renderUserStoryViews()}

        {renderPostViews()}
      </div>
    </>
  )
}

export default Home
