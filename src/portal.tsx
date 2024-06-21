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
import { VirtualKeyboard, VirtualKeyboardPage } from "./console/VirtualKeyboard";
import { Toolbar } from "./Toolbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    CreateTextPrompt('input-name', 'What is the student\'s preferred first name?', CreateRequirementRecursive('new-student-response')),
    CreateScheduleMenus('consult-schedule', CreateRequirementPromptContinued('input-name')),
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
  const [shiftOn, setShiftOn] = useState(false);
  const [capsOn, setCapsOn] = useState(false);
  const [insertOn, setInsertOn] = useState(false);
  const [keyboardPage, setKeyboardPage] = useState(VirtualKeyboardPage.Alpha);

  return (
    <div className="div__portal-page" role="presentation">
      <div className="div__console-area-wrapper" role="presentation">
        <div className="div__console-area" role="presentation">
          <aside className="aside__console-header-wrapper">
            <h1 className="h1__console-header">
              Portal Utility - Copyright (C) 2024 Charlotte Worthey
            </h1>
          </aside>
          <aside>
            <Toolbar
              KeyboardShown={keyboardShown}
              OnShowKeyboardToggle={(value: boolean) => setKeyboardShown(value)}
              OnGoHomeClick={() => navigate('/')}
            />
          </aside>
          <main className="main__console-wrapper">
            <Console entries={consoleEntries}/>
          </main>
          {keyboardShown && <aside>
            <VirtualKeyboard
              IsShiftOn={shiftOn}
              IsCapsOn={capsOn}
              IsInsertOn={insertOn}
              CurrentPage={keyboardPage}
              OnShift={on => setShiftOn(on)}
              OnCaps={on => setCapsOn(on)}
              OnPageChange={page => setKeyboardPage(page)}
              OnInsert={on => setInsertOn(on)}
              OnAction={() => {}}
              OnAlpha={_c => { setShiftOn(false); }}
              OnNum={_c => {}}
              OnSymbol={_c => {}}
              OnBackspace={() => {}}
              OnDelete={() => {}}
              OnEnter={() => {}}
              OnDown={() => {}}
              OnLeft={() => {}}
              OnRight={() => {}}
              OnUp={() => {}}
              OnEnd={() => {}}
              OnHome={() => {}}
              OnPageUp={() => {}}
              OnPageDown={() => {}}
              OnSpace={() => {}}
              OnTab={() => { setShiftOn(false); }}
              IsActionEnabled={false}
              IsAlphaEnabled={true}
              IsBackspaceEnabled={true}
              IsDeleteEnabled={true}
              IsCapsEnabled={true}
              IsShiftEnabled={true}
              IsUpEnabled={true}
              IsLeftEnabled={true}
              IsDownEnabled={true}
              IsRightEnabled={true}
              IsHomeEnabled={true}
              IsEndEnabled={true}
              IsEnterEnabled={true}
              IsInsertEnabled={false}
              IsNumEnabled={false}
              IsPageUpEnabled={true}
              IsPageDownEnabled={true}
              IsSpaceEnabled={true}
              IsSymbolEnabled={true}
              IsTabEnabled={true}
            />
          </aside>}
        </div>
      </div>
    </div>
  );
}