import { Console } from "./console/Console";
import { IConsoleEntry } from "./console/IConsoleEntry";
import { CreateInfoConfirm, InfoConfirmType } from "./console/entries/InfoConfirm";
import { CreateOutput } from "./console/entries/Output";
import { CreateRadioMenu } from "./console/entries/RadioMenu";
import { CreateTitleOutput } from "./console/entries/TitleOutput";
import { CreateRequirementRadioMenuItem } from "./console/requirements/RadioMenuItem";
import { CreateRequirementRecursive } from "./console/requirements/Recursive";
import { CreateScheduleMenus } from "./console/schedule";
import { Toolbar } from "./Toolbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateNewConsoleGraph } from "./console/ConsoleGraph";
import { ConsoleKeyboard } from "./console/ConsoleKeyboard";
import { VirtualKeyboard } from "./keyboard/VirtualKeyboard";
import consultationInfo from "./info/consultationInfo.md?raw";
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
`], 'Some awesome-looking ASCII art that displays the text Worthey Studios'),
    CreateRadioMenu('intent-menu', 'Hi, it\'s me Charlotte, your instructor! How may I direct you? (Please pick from the choices below)', [
      {
        id: 'new-student',
        text: 'I would like to sign up for a free consultation.'
      },
      {
        id: 'contact',
        text: 'I would like to send a message to Charlotte.'
      }
    ]),
    CreateOutput('new-student-response', 'That is so awesome! Let\'s get started with some basic information...',
      CreateRequirementRadioMenuItem('intent-menu', 'new-student')
    ),
    CreateScheduleMenus('consult-schedule', CreateRequirementRecursive('new-student-response')),
    //CreateTextPrompt('input-name', 'What is the student\'s preferred first name?', FormType.Name, CreateRequirementRecursive('new-student-response')),
    //CreateScheduleMenus('consult-schedule', CreateRequirementPromptContinued('input-name')),
    CreateOutput('consult-schedule-msg', 'Wowee!!! That time works for me!', CreateRequirementRecursive('consult-schedule')),
    CreateInfoConfirm('consult-schedule-msg2',
      () => consultationInfo, InfoConfirmType.Markdown,
      'I understand.',
      CreateRequirementRecursive('consult-schedule-msg'))
  ].flat();

function IsTouchScreen() {
  return window.matchMedia("(pointer: coarse)").matches;
}

export function PortalPage() {
  const [keyboardShown, setKeyboardShown] = useState(IsTouchScreen());
  const navigate = useNavigate();

  const [graph, setGraph] = useState(CreateNewConsoleGraph(consoleEntries));
  const [keyboard, setKeyboard] = useState(new ConsoleKeyboard(graph, setGraph));

  return (
    <div className="div__portal-page" role="presentation">
      <div className="div__console-area-wrapper" role="presentation">
        <div className="div__console-area" role="presentation">
          <aside className="aside__console-header-wrapper">
            <h1 className="h1__console-header">
              Portal Utility - Copyright (C) 2024 Charlotte Worthey
            </h1>
          </aside>
          <header>
            <Toolbar
              KeyboardShown={keyboardShown}
              OnShowKeyboardToggle={(value: boolean) => setKeyboardShown(value)}
              OnGoHomeClick={() => navigate('/')}
            />
          </header>
          <main className="main__console-wrapper">
            <Console
              graph={graph}
              onGraphUpdate={graph => {
                setGraph(graph);
                const newKeyboard = keyboard.Clone();
                newKeyboard.Graph = graph;
                setKeyboard(newKeyboard);
              }}/>
          </main>
          {keyboardShown && <aside>
            <VirtualKeyboard
              Keyboard={keyboard}
              OnKeyboardUpdate={keyboard => setKeyboard(keyboard as ConsoleKeyboard)}/>
          </aside>}
        </div>
      </div>
    </div>
  );
}