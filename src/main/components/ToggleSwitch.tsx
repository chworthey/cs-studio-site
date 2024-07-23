import { useState } from "react";

interface IToggleSwitchProps {
  IdPrefix: string;
  LabelText: string;
  On: boolean;
  OnClick(on: boolean): void;
}

export function ToggleSwitch(props: IToggleSwitchProps) {
  const [hovered, setHovered] = useState(false);
  const labelId = `${props.IdPrefix}-label`;

  return (
    <div className="div__switch-container" role="presentation">
      <div id={labelId} className={hovered ? "div__switch-label div__switch-label--hovered" : "div__switch-label"}>
        {props.LabelText}
      </div>
      <svg aria-hidden={true} className={hovered ? "svg__switch-triangle svg__switch-triangle--hovered" : "svg__switch-triangle"} viewBox="0 0 100 100">
        <polygon points="0,100 0,0 100,50"/>
      </svg>
      <button aria-pressed={props.On} aria-labelledby={labelId} className="button__switch" onClick={() => {
        props.OnClick(!props.On);
      }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div role="presentation" className={hovered ? "div__switch-slider div__switch-slider--hovered" : "div__switch-slider"}>
          <div role="presentation" className={props.On ? "div__switch-handle div__switch-handle--on" : "div__switch-handle"}/>
        </div>
      </button>
    </div>
  );
};
