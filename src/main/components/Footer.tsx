import { Link } from "react-router-dom";

export function Footer() {
  return (
      <div className="div__page-bottom" role="presentation">
      <Link to="/privacy" className="a__privacy">No Data, No Cookies Policy</Link>
      {/* <button disabled={!showBackToTop} aria-hidden={!showBackToTop} className={showBackToTop ? "button__back-to-top" : "button__back-to-top button__back-to-top--hidden"} onClick={() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }}>
        <span aria-hidden={true}>&#x25B4;</span>
        <br aria-hidden={true}/>
        Back to Top
      </button> */}
    </div>
  );
}
