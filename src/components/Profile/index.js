import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import './index.css'

const Profile = props => {
  const {profileDetails, myProfile} = props
  const {
    followersCount,
    followingCount,
    postsCount,
    profilePic,
    userBio,
    username,
    userId,
    posts,
    stories,
  } = profileDetails

  const profilePicAlt = myProfile ? 'my profile' : 'user profile'
  const storyAlt = myProfile ? 'my story' : 'user story'
  const postAlt = myProfile ? 'my post' : 'user post'

  const renderPosts = () => (
    <ul className="posts-lists">
      {posts.map(post => (
        <li key={post.id}>
          <img className="profile-post-image" src={post.image} alt={postAlt} />
        </li>
      ))}
    </ul>
  )

  const renderStories = () => (
    <ul className="stories-lists">
      {stories.map(story => (
        <li key={story.id} className="story-image-container">
          <img
            className="profile-story-image"
            src={story.image}
            alt={storyAlt}
          />
        </li>
      ))}
    </ul>
  )

  const renderEmptyView = () => (
    <div className="empty-view-container">
      <div className="icon-container">
        <BiCamera className="camera-icon" />
      </div>
      <h1 className="empty-view-text">No Posts</h1>
    </div>
  )
  // No Posts Yet

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img className="profile-image" src={profilePic} alt={profilePicAlt} />
        <div className="profile-details">
          <h1 className="username">{username}</h1>
          <div className="account-status">
            <p className="posts">
              <span className="count">{postsCount}</span> posts
            </p>
            <p className="followers">
              <span className="count">{followersCount}</span> followers
            </p>
            <p className="followings">
              <span className="count">{followingCount}</span> following
            </p>
          </div>

          <p className="user-id">{userId}</p>
          <p className="user-bio">{userBio}</p>
        </div>
      </div>

      {renderStories()}

      <hr className="separator" />

      <div className="posts-header">
        <BsGrid3X3 className="frame-icon" />
        <h1 className="posts-heading">Posts</h1>
      </div>

      {posts.length !== 0 ? renderPosts() : renderEmptyView()}
    </div>
  )
}

export default Profile
