import { Link } from "react-router-dom";
import studioLogo from "/cairns.gif";

export function Menubar() {
  return (
    <nav className="nav__navbar">
      <Link className="a__logo-title" to="/">
        <span>Worthey Studios</span>
        <img className="img__logo" src={studioLogo} alt="An animation depicting stones falling onto a stack."></img></Link>
      <Link className="a__navbar__page" to="/">Schedule &amp; Events</Link>
      <Link className="a__navbar__page" to="/">Articles</Link>
      <Link className="a__navbar__page" to="/">Register</Link>
      <Link className="a__navbar__page" to="/policies">Policies</Link>
      <Link className="a__navbar__page" to="/">About</Link>
      <Link className="a__navbar__page" to="/portal">Portal</Link>
    </nav>
  );
}