import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="not-found-image"
      src="https://res.cloudinary.com/dktwlx0dz/image/upload/v1692337592/ccbp-mini-project-insta-share/not-found_secrtm.png"
      alt="page not found"
    />

    <h1>Page Not Found</h1>
    <p>
      we are sorry, the page you requested could not be found.Please go back to
      the homepage.
    </p>

    <Link to="/">
      <button type="button" className="home-page-button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
