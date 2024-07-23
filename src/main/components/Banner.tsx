import { Link } from "react-router-dom";

export function Banner() {
  return (
    <div className="div__banner" role="presentation">
      <section>
        <div className="div__banner__content" role="presentation">
          <div className="div__yellow-stripe" role="presentation"></div>
          <div className="div__banner__content__col" role="presentation">
            <h1 className="h1__offer">Group Lessons for Software Development</h1>
            <div className="div__actionable-offer" role="presentation">
              <div className="div__actionable-offer__item" role="presentation">
                <div role="presentation">
                  <Link
                    to="/portal"
                    className="a__start-lessons">
                      <span>Start Lessons</span><span aria-hidden={true}> &#x25BA;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="div__yellow-stripe" role="presentation">
          </div>
        </div>
      </section>
    </div>
  );
};
