import Slider from 'react-slick'
import './index.css'

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
  ],
}

const StoriesSlick = props => {
  const {userStories} = props

  const renderEachStory = eachStory => {
    const {
      user_id: userId,
      user_name: userName,
      story_url: storyUrl,
    } = eachStory

    return (
      <div key={userId} className="story-container">
        <img className="story-image" src={storyUrl} alt="user story" />
        <p className="story-username">{userName}</p>
      </div>
    )
  }

  return (
    <Slider {...settings} className="desktop-slick">
      {userStories.map(renderEachStory)}
    </Slider>
  )
}

export default StoriesSlick
