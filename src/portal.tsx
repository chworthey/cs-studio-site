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
import { CreateTextPrompt, FormType } from "./console/entries/TextPrompt";
import { CreateRequirementPromptContinued } from "./console/requirements/PromptContinued";
import { AllowedActionMask, AllowedKeyMask, DisallowedActionMask, DisallowedKeyMask, MaskModeType, VirtualKeyboard, VirtualKeyboardAction, VirtualKeyboardKey, VirtualKeyboardPage } from "./console/VirtualKeyboard";
import { Toolbar } from "./Toolbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateNewConsoleGraph, SetConsoleGraphState } from "./console/ConsoleGraph";

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
  const [shiftOn, setShiftOn] = useState(false);
  const [capsOn, setCapsOn] = useState(false);
  const [insertOn, setInsertOn] = useState(false);
  const [keyboardPage, setKeyboardPage] = useState(VirtualKeyboardPage.Alpha);
  const [isActionEnabled, setIsActionEnabled] = useState(false);
  const [isAlphaEnabled, setIsAlphaEnabled] = useState(false);
  const [isNumEnabled, setIsNumEnabled] = useState(false);
  const [isSymbolsEnabled, setIsSymbolsEnabled] = useState(false);
  const [keyMask, setKeyMask] = useState<undefined | AllowedKeyMask | DisallowedKeyMask>(
    { MaskModeType: MaskModeType.Allowed, Keys: [VirtualKeyboardKey.Tab]}
  );
  const [actionMask, setActionMask] = useState<undefined | AllowedActionMask | DisallowedActionMask>(
    { MaskModeType: MaskModeType.Allowed, Actions: [] }
  );

  const graph = CreateNewConsoleGraph(consoleEntries);
  const [graphState, setGraphState] = useState(graph.state);

  SetConsoleGraphState(graph, graphState);

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
              onGraphStateChange={state => setGraphState(state)}
              onEntryFocus={keyboardConfig => 
                {
                  setIsActionEnabled(keyboardConfig.IsActionEnabled);
                  setIsAlphaEnabled(keyboardConfig.IsAlphaEnabled);
                  setIsSymbolsEnabled(keyboardConfig.IsSymbolsEnabled);
                  setIsNumEnabled(keyboardConfig.IsNumEnabled);
                  setKeyMask(keyboardConfig.KeyMask);
                  setActionMask(keyboardConfig.ActionMask);
                  setKeyboardPage(keyboardConfig.DefaultPage);
                }
              }/>
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
              OnPageUp={() => {
                const e = document.getElementById('console');
                if (e) {
                  e.scrollBy(0, Math.floor(e.clientHeight * -0.9));
                }
              }}
              OnPageDown={() => {
                const e = document.getElementById('console');
                if (e) {
                  e.scrollBy(0, Math.floor(e.clientHeight * 0.9));
                }
              }}
              OnSpace={() => {}}
              OnTab={() => { setShiftOn(false); }}
              IsActionEnabled={isActionEnabled}
              IsAlphaEnabled={isAlphaEnabled}
              IsNumEnabled={isNumEnabled}
              IsSymbolsEnabled={isSymbolsEnabled}
              KeyMask={keyMask}
              ActionMask={actionMask}
            />
          </aside>}
        </div>
      </div>
    </div>
  );
}