import { Menubar } from "./Menubar";
import { Console } from "./console";
import "./portal.css";

export function PortalPage() {
  return (
    <div className="div__portal-page">
      <div className="div__console-wrapper">
        <Console/>
      </div>
    </div>
  );
}