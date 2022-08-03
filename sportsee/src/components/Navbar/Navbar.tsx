import '../Navbar/Navbar.css'
import logo from '../../assets/img/logo_sportsee.svg'

const Navbar: any = () => {

    return (
        <nav className="navbar" >
            <a className="navbar_link" href="#"> <img src={logo} className="navbar_logo" /></a>
            <a className="navbar_link" href="#">Accueil</a>
            <a className="navbar_link" href="#">Profil</a>
            <a className="navbar_link" href="#">Réglage</a>
            <a className="navbar_link" href="#">Communauté</a>
        </nav>
    )
}

export default Navbar