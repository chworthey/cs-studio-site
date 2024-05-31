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
    CreateScheduleMenus('consult-schedule', CreateRequirementRecursive('new-student-response')),
    CreateOutput('consult-schedule-msg', 'Wowee!!! That time works for me!', CreateRequirementRecursive('consult-schedule')),
    CreateOutput('consult-schedule-msg2',
`Here is some important information about the consultation:
\u{2022} Yes, the consultation is free, BUT it may overlap with a lesson. This is so you can observe the teaching process and decide if my style of teaching is right for you.
\u{2022} If your consultation time overlaps with a lesson, you may stay up to 15 minutes after the lesson to ask all of your questions. The lesson lengths are 45 minutes so you will have a whole hour on the call.
\u{2022} Zoom links will be sent out before the meeting on the day-of.
\u{2022} Guests are allowed.
\u{2022} If the prospective student is under 18, they MUST bring an adult family member to the consultation.
`, CreateRequirementRecursive('consult-schedule-msg'))
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