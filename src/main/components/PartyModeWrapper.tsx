import { PropsWithChildren } from "react";

interface IPartyModeWrapperProps {
  IsPartyModeOn: boolean;
}

export function PartyModeWrapper(props: PropsWithChildren<IPartyModeWrapperProps>) {
  return (
    <>
      {props.IsPartyModeOn && <>
        <div className="img__party-mode-overlay img__party-mode-overlay--1"/>
        <div className="img__party-mode-overlay img__party-mode-overlay--2"/>
      </>}
      <div className={props.IsPartyModeOn ? "div__layout-wrapper party-mode" : "div__layout-wrapper"}>
        {props.children}
      </div>
    </>
  );
};
