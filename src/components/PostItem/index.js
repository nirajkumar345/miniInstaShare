/* eslint-disable react/no-unknown-property */
import {useState} from 'react'
import {Link} from 'react-router-dom'
// import {BsHeart} from 'react-icons/bs'
// import {FcLike} from 'react-icons/fc'
// import {FaRegComment} from 'react-icons/fa'
// import {BiShareAlt} from 'react-icons/bi'

import './index.css'
import Cookies from 'js-cookie'

const PostItem = props => {
  const {postItemDetails, IncreaseLikeCount, DecreaseLikeCount} = props
  const {
    username,
    postId,
    userId,
    profilePic,
    postDetails: {imageUrl, caption},
    likesCount,
    comments,
    createdAt,
  } = postItemDetails

  const [isLiked, setIsLiked] = useState(false)

  const onClickLike = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const bodyData = {
      like_status: !isLiked,
    }

    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(bodyData),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      if (data.message === 'Post has been liked') {
        IncreaseLikeCount(postId)
      } else {
        DecreaseLikeCount(postId)
      }
    }
    setIsLiked(prev => !prev)
  }

  return (
    <li className="post-item-container">
      <div className="post-item-header">
        <div className="post-item-profile-pic-container">
          <img
            className="post-item-profile-pic"
            src={profilePic}
            alt="post author profile"
          />
        </div>
        <Link to={`/users/${userId}`}>
          <span className="post-item-username">{username}</span>
        </Link>
      </div>

      <img className="post-image" src={imageUrl} alt="post" />

      <div className="post-item-footer">
        <div className="post-item-intraction-group">
          {!isLiked ? (
            <button type="button" testid="likeIcon" onClick={onClickLike}>
              {' '}
              {/* {<BsHeart className="post-item-icon" />} */}
            </button>
          ) : (
            <button type="button" testid="unLikeIcon" onClick={onClickLike}>
              {/* {<FcLike className="post-item-icon" />} */}
            </button>
          )}

          <button type="button">
            {/* <FaRegComment className="post-item-icon" /> */}
          </button>

          <button type="button">
            {/* <BiShareAlt className="post-item-icon" /> */}
          </button>
        </div>

        <p className="likes-count">{likesCount} likes</p>
        <p className="post-caption">{caption}</p>

        <ul className="comments-list">
          {comments.map(eachComment => (
            <li key={eachComment.userId}>
              <p className="comment-username">{eachComment.username}</p>
              <p className="comment">{eachComment.comment}</p>
            </li>
          ))}
        </ul>
        <p className="posted-time">{createdAt}</p>
      </div>
    </li>
  )
}

export default PostItem
