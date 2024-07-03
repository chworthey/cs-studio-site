import { Link } from "react-router-dom";

export function Banner() {
  return (
    <div className="div__banner">
      <div className="div__banner__content">
        <div className="div__yellow-stripe"></div>
        <div className="div__banner__content__col">
          <h1 className="h1__offer">Group Lessons for Software Development</h1>
            <div className="div__actionable-offer">
            <div className="div__actionable-offer__item">
              <div>
                <Link
                  to="/portal"
                  className="a__start-lessons">
                    Start Lessons &#x25BA;
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="div__yellow-stripe">
        </div>
      </div>
      <div className="div__features-divider">
        <div className="div__features-label-container">
          <h2 className="h2__features-label-text">
            &#x2015;features&#x2015;
          </h2>
        </div>
      </div>
    </div>
  );
};
