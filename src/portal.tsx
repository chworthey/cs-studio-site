import { Console } from "./console/Console";
import { IConsoleEntry } from "./console/IConsoleEntry";
import { CreateOutput } from "./console/entries/Output";
import { CreateRadioMenu } from "./console/entries/RadioMenu";
import { CreateTitleOutput } from "./console/entries/TitleOutput";
import { CreateRequirementRadioMenuItem } from "./console/requirements/RadioMenuItem";
import { CreateRequirementRecursive } from "./console/requirements/Recursive";
import { CreateScheduleMenus } from "./console/schedule";
import "./portal.css";

const consoleEntries: IConsoleEntry[] =
  [
    CreateTitleOutput('title', [`
 ██╗    ██╗ ██████╗ ██████╗ ████████╗██╗  ██╗███████╗██╗   ██╗   
 ██║    ██║██╔═══██╗██╔══██╗╚══██╔══╝██║  ██║██╔════╝╚██╗ ██╔╝   
 ██║ █╗ ██║██║   ██║██████╔╝   ██║   ███████║█████╗   ╚████╔╝    
 ██║███╗██║██║   ██║██╔══██╗   ██║   ██╔══██║██╔══╝    ╚██╔╝     
 ╚███╔███╔╝╚██████╔╝██║  ██║   ██║   ██║  ██║███████╗   ██║      
  ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝   ╚═╝      

`,
`
███████╗████████╗██╗   ██╗██████╗ ██╗ ██████╗ ███████╗
██╔════╝╚══██╔══╝██║   ██║██╔══██╗██║██╔═══██╗██╔════╝
███████╗   ██║   ██║   ██║██║  ██║██║██║   ██║███████╗
╚════██║   ██║   ██║   ██║██║  ██║██║██║   ██║╚════██║
███████║   ██║   ╚██████╔╝██████╔╝██║╚██████╔╝███████║
╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚═╝ ╚═════╝ ╚══════╝
`]),
    CreateRadioMenu('intent-menu', 'Hi, it\u{2019}s me Charlotte, your instructor! How may I direct you? (Please pick from the choices below)', [
      {
        id: 'login',
        text: 'I would like to log in. I\u{2019}ve been here before.'
      },
      {
        id: 'new-student',
        text: 'I would like to sign up for lessons! Or book a free consultation...'
      },
      {
        id: 'contact',
        text: 'I would like to send a message to Charlotte.'
      }
    ]),
    CreateOutput('new-student-response', 'That is so awesome! I can\u{2019}t wait to meet you!',
      CreateRequirementRadioMenuItem('intent-menu', 'new-student')
    ),
    CreateScheduleMenus('consult-schedule', CreateRequirementRecursive('new-student-response'))
  ].flat();

export function PortalPage() {
  return (
    <div className="div__portal-page">
      <div className="div__console-wrapper">
        <Console entries={consoleEntries}/>
      </div>
    </div>
  );
}