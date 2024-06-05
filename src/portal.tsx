import { Console } from "./console/Console";
import { IConsoleEntry } from "./console/IConsoleEntry";
import { CreateInfoConfirm, InfoConfirmType } from "./console/entries/InfoConfirm";
import { CreateOutput } from "./console/entries/Output";
import { CreateRadioMenu } from "./console/entries/RadioMenu";
import { CreateTitleOutput } from "./console/entries/TitleOutput";
import { CreateRequirementRadioMenuItem } from "./console/requirements/RadioMenuItem";
import { CreateRequirementRecursive } from "./console/requirements/Recursive";
import { CreateScheduleMenus } from "./console/schedule";
import "./portal.css";
import consultationInfo from "./info/consultationInfo.md?raw";
import { CreateTextPrompt } from "./console/entries/TextPrompt";
import { CreateRequirementPromptContinued } from "./console/requirements/PromptContinued";

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
    CreateRadioMenu('intent-menu', 'Hi, it\'s me Charlotte, your instructor! How may I direct you? (Please pick from the choices below)', [
      {
        id: 'login',
        text: 'I would like to log in. I\'ve been here before.'
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
    CreateOutput('new-student-response', 'That is so awesome! Let\'s get started with some basic information...',
      CreateRequirementRadioMenuItem('intent-menu', 'new-student')
    ),
    CreateTextPrompt('input-name', 'What is the student\'s preferred first name?', CreateRequirementRecursive('new-student-response')),
    CreateScheduleMenus('consult-schedule', CreateRequirementPromptContinued('input-name')),
    CreateOutput('consult-schedule-msg', 'Wowee!!! That time works for me!', CreateRequirementRecursive('consult-schedule')),
    CreateInfoConfirm('consult-schedule-msg2',
      () => consultationInfo, InfoConfirmType.Markdown,
      'I understand.',
      CreateRequirementRecursive('consult-schedule-msg'))
  ].flat();

export function PortalPage() {
  return (
    <div className="div__portal-page">
      <div className="div__console-area-wrapper">
        <div className="div__console-area">
          <div className="div__console-header">
            <aside>
              <div>
                Portal Utility - Copyright (C) 2024 Charlotte Worthey
              </div>
            </aside>
          </div>
          <div className="div__console-wrapper">
            <Console entries={consoleEntries}/>
          </div>
        </div>
      </div>
    </div>
  );
}