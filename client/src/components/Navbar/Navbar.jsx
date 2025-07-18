import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsProgress, faCubes, faVialCircleCheck, faGear } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Navbar(){

    return(
        <>
        <div className="navbar-container">
            <ul className="navbar-items">
                <li className="navbar-item">
                    <Link to="/dashboard">
                        <FontAwesomeIcon icon={faBarsProgress} />
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="/modules">
                        <FontAwesomeIcon icon={faCubes} />
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="/test">
                        <FontAwesomeIcon icon={faVialCircleCheck} />
                    </Link>
                </li>
                <li className="navbar-item">
                    <Link to="/settings">
                        <FontAwesomeIcon icon={faGear} />
                    </Link>
                </li>
            </ul>
        </div>
        </>
    )

}

export default Navbar