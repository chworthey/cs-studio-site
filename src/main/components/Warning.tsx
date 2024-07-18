import { useState } from "react";

interface IWarningProps {
  Title: string;
  Text: string;
}

export function Warning(props: IWarningProps) {
  const [shown, setShown] = useState(true);

  return (
    <div className={shown ? "div__warning" : "div__warning div__warning--hidden"}>
      <div className="div__warning-top">
        <div className="div__warning-title">
          {props.Title}
        </div>
        <div className="div__warning-x" onClick={() => setShown(false)}>x</div>
      </div>
      <div className="div__warning-content">
        <div className="div__warning-text">
          {props.Text}
        </div>
      </div>
    </div>
  );
};
