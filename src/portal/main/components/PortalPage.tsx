
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import consultationInfo from "../data/infoMarkdown/consultationInfo.md?raw";
import "../styles/PortalPage.css";
import { Console } from "../../console/components/Console";
import { CreateNewConsoleGraph, FindConsoleGraphNode, IConsoleGraph } from "../../console/types/ConsoleGraph";
import { CreateInfoConfirm, InfoConfirmType } from "../../console/types/entries/InfoConfirm";
import { CreateOutput } from "../../console/types/entries/Output";
import { CreateRadioMenu, IConsoleEntryStateRadioMenu } from "../../console/types/entries/RadioMenu";
import { CreateTitleOutput } from "../../console/types/entries/TitleOutput";
import { IConsoleEntry } from "../../console/types/IConsoleEntry";
import { CreateRequirementRadioMenuItem } from "../../console/types/requirements/RadioMenuItem";
import { CreateRequirementRecursive } from "../../console/types/requirements/Recursive";
// import { VirtualKeyboard } from "../../keyboard/components/VirtualKeyboard";
// import { ConsoleKeyboard } from "../types/ConsoleKeyboard";
import { Toolbar } from "./Toolbar";
import { CreateScheduleMenus, GetScheduledTimeString, NowDateInMT, UpcomingDatesNoService } from "../types/Schedule";
import { CreateRequirementPromptContinued } from "../../console/types/requirements/PromptContinued";
import { CreateTextPrompt, FormType, IConsoleEntryStateTextPrompt } from "../../console/types/entries/TextPrompt";
import { CreateRequirementOR } from "../../console/types/requirements/Or";
import { CreateRequirementRadioMenuActive } from "../../console/types/requirements/RadioMenuActive";
import { CreateDynamicOutput } from "../../console/types/entries/DynamicOutput";
import { CreateRequirementInfoConfirmed } from "../../console/types/requirements/InfoConfirmed";
import { CreateRequestButton } from "../../console/types/entries/RequestButton";
import { SendMessage } from "../types/Backend";

const upcomingDates = UpcomingDatesNoService(NowDateInMT());

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
    CreateTextPrompt('contact-input-email', 'What email address may I send a reply to?', FormType.Email, 
      CreateRequirementRadioMenuItem('intent-menu', 'contact')
    ),
    CreateTextPrompt('contact-input-name', 'What name may I refer to you by?', FormType.Name,
      CreateRequirementPromptContinued('contact-input-email')
    ),
    CreateTextPrompt('contact-input-subject', 'What is the subject line for your message?', FormType.NotEmpty, 
      CreateRequirementPromptContinued('contact-input-name')
    ),
    CreateTextPrompt('contact-input-body', 'Please write your message below:', FormType.NotEmpty, 
      CreateRequirementPromptContinued('contact-input-subject'),
      true
    ),
    CreateOutput('contact-done-output', 'Looks good!',
      CreateRequirementPromptContinued('contact-input-body')
    ),
    CreateRequestButton('contact-submit', 'Submit!',
      (graph: IConsoleGraph, onComplete: (success: boolean) => void) => {
        const data = GetSendMessageData(graph);
        if (!data) {
          onComplete(false);
          return;
        }
        SendMessage(`From: ${data.Name}\nEmail: ${data.EmailAddress}\n\n${data.Body}`,data.SubjectLine, false, onComplete);
      },
      CreateRequirementRecursive('contact-done-output')
    ),
    CreateOutput('new-student-response', 'That is so awesome! Let\'s get started with some basic information...',
      CreateRequirementRadioMenuItem('intent-menu', 'new-student')
    ),
    CreateRadioMenu('country-split', 'Do you live in the United States?', [
      {
        id: 'us-yes',
        text: 'Yes'
      },
      {
        id: 'us-no',
        text: 'No'
      }
    ], CreateRequirementRecursive('new-student-response')),
    CreateOutput('us-no', 'Understood. I\'m sorry, but I only take students from the United States at this time. This is mainly because I am unfamiliar with the international tax landscape.',
      CreateRequirementRadioMenuItem('country-split', 'us-no')
    ),
    CreateRadioMenu('age-split-menu', 'Which age group best describes the student?', [
      {
        id: 'child',
        text: 'Child (Age less than 13)'
      },
      {
        id: 'teen',
        text: 'Teen (Age 13+)'
      },
      {
        id: 'adult',
        text: 'Adult (Age 18+)'
      }
    ], CreateRequirementRadioMenuItem('country-split', 'us-yes')),
    CreateOutput('child-no', 'Understood. I\'m sorry, but I don\'t take students under the age of 13 at this time. Parents- feel free to send me a message if you have any questions.',
      CreateRequirementRadioMenuItem('age-split-menu', 'child')
    ),
    CreateRadioMenu('grade-menu', 'Which K-12 grade is the student in?', [
      {
        id: 'grade-7',
        text: '7'
      },
      {
        id: 'grade-8',
        text: '8'
      },
      {
        id: 'grade-9',
        text: '9'
      },
      {
        id: 'grade-10',
        text: '10'
      },
      {
        id: 'grade-11',
        text: '11'
      },
      {
        id: 'grade-12',
        text: '12'
      }
    ], CreateRequirementRadioMenuItem('age-split-menu', 'teen')),
    CreateTextPrompt('input-name', 'What is the student\'s preferred first name?', FormType.Name,
      CreateRequirementOR(
        CreateRequirementRadioMenuItem('age-split-menu', 'adult'),
        CreateRequirementRadioMenuActive('grade-menu')
      )
    ),
    CreateDynamicOutput('name-greeting', graph => {
      const node = FindConsoleGraphNode(graph, 'input-name');
      if (node) {
        const stateCast = node.state as IConsoleEntryStateTextPrompt;
        return `It's great to meet you, ${stateCast.userInputText}!`;
      }
      else {
        return '';
      }
    }, CreateRequirementPromptContinued('input-name')),
    CreateTextPrompt('input-phone', 'What is the phone number I can use for the initial consultation?', FormType.Phone, CreateRequirementRecursive('name-greeting')),
    CreateOutput('phone-ok', 'Okay, this is the phone number I will use. Watch for a confirmation text from a 509* area code over the next day or so. The consultation itself will take place as a phone call to this number. Data rates may apply.', CreateRequirementPromptContinued('input-phone')),
    CreateOutput('time-to-schedule', 'Now for the consultation scheduling...', CreateRequirementRecursive('phone-ok')),
    CreateScheduleMenus('consult-schedule', upcomingDates, CreateRequirementRecursive('time-to-schedule')),
    CreateOutput('consult-schedule-msg', 'Wowee!!! That time works for me!', CreateRequirementRecursive('consult-schedule')),
    CreateInfoConfirm('consult-schedule-msg2',
      'Important Consultation Information:',
      () => consultationInfo, InfoConfirmType.Markdown,
      'I understand.',
      'I understood!',
      CreateRequirementRecursive('consult-schedule-msg')),
    CreateDynamicOutput('summary', graph => {
      let rv = '';
      const data = GetConsultationScheduleData(graph);
      if (!data) {
        rv = 'An Error Occurred';
      }
      else {
        rv = 'In Summary...\n' +
          `Adult: ${data.AgeGroupSplit === 'adult' ? 'Yes' : 'No'}\n` +
          (data.Grade ? `Grade: ${data.Grade?.substring(6)}\n` : '') +
          `Preferred First Name: ${data.PreferredFirstName}\n` +
          `Phone Number: ${data.PhoneNumber}\n` +
          `Scheduled Time: ${data.Time}`;
      }

      return rv;
    }, CreateRequirementInfoConfirmed('consult-schedule-msg2')),
    CreateRequestButton('consultation-submit', 'Submit!',
      (graph: IConsoleGraph, onComplete: (success: boolean) => void) => {
        const data = GetConsultationScheduleData(graph);
        if (!data) {
          onComplete(false);
          return;
        }
        const json = JSON.stringify(data, null, 2);
        SendMessage(json, 'New Student Sign Up', true, onComplete);
      },
      CreateRequirementRecursive('summary')
    )
  ].flat();

// function IsTouchScreen() {
//   return window.matchMedia("(pointer: coarse)").matches;
// }

interface ISendMessageData {
  EmailAddress: string;
  Name: string;
  SubjectLine: string;
  Body: string;
}

interface IConsultationScheduleData {
  AgeGroupSplit: string;
  Grade?: string;
  PreferredFirstName: string;
  PhoneNumber: string;
  Time: string;
}

function GraphTryGet<S, T>(graph: IConsoleGraph, entryId: string, onGet: (state: S) => T) {
  const node = FindConsoleGraphNode(graph, entryId);
  if (node) {
    const stateCast = node.state as S;
    return onGet(stateCast);
  }
  else {
    return undefined;
  }
}

function GetSendMessageData(graph: IConsoleGraph) {
  const name = GraphTryGet<IConsoleEntryStateTextPrompt, string>(graph, 'contact-input-name', s => s.userInputText);
  const emailAddress = GraphTryGet<IConsoleEntryStateTextPrompt, string>(graph, 'contact-input-email', s => s.userInputText);
  const subject = GraphTryGet<IConsoleEntryStateTextPrompt, string>(graph, 'contact-input-subject', s => s.userInputText);
  const body = GraphTryGet<IConsoleEntryStateTextPrompt, string>(graph, 'contact-input-body', s => s.userInputText);

  if (!name || !emailAddress || !subject || !body) {
    return undefined;
  }

  const rv: ISendMessageData = {
    Name: name,
    EmailAddress: emailAddress,
    SubjectLine: subject,
    Body: body
  };

  return rv;
}

function GetConsultationScheduleData(graph: IConsoleGraph) {
  const ageGroupSplit = GraphTryGet<IConsoleEntryStateRadioMenu, string | null>(graph, 'age-split-menu', s => s.activeItem);
  const isAdult = ageGroupSplit === 'adult'
  const grade = isAdult ? undefined :  GraphTryGet<IConsoleEntryStateRadioMenu, string | null>(graph, 'grade-menu', s => s.activeItem);
  const preferredFirstName = GraphTryGet<IConsoleEntryStateTextPrompt, string>(graph, 'input-name', s => s.userInputText);
  const phoneNumber = GraphTryGet<IConsoleEntryStateTextPrompt, string>(graph, 'input-phone', s => s.userInputText);
  const time = GetScheduledTimeString(graph, upcomingDates, 'consult-schedule');

  if (!ageGroupSplit || !preferredFirstName || !phoneNumber || !time) {
    return undefined;
  }

  const rv: IConsultationScheduleData = {
    AgeGroupSplit: ageGroupSplit,
    Grade: grade ? grade : undefined,
    PreferredFirstName: preferredFirstName,
    PhoneNumber: phoneNumber,
    Time: time
  };

  return rv;
}

interface IPortalProps {
  NekoShown: boolean;
  OnShowNekoToggle(show: boolean): void;
}

export function PortalPage(props: IPortalProps) {
  // const [keyboardShown, setKeyboardShown] = useState(IsTouchScreen());
  const navigate = useNavigate();

  const [graph, setGraph] = useState(CreateNewConsoleGraph(consoleEntries));
  // const [keyboard, setKeyboard] = useState(new ConsoleKeyboard(graph, setGraph));

  return (
    <div className="div__portal-page" role="presentation">
      <div className="div__console-area-wrapper" role="presentation">
        <div className="div__console-area" role="presentation">
          <aside className="aside__console-header-wrapper">
            <h1 className="h1__console-header">
              Portal Utility - Copyright (C) 2024-2026 Charlotte Worthey
            </h1>
          </aside>
          <header>
            <p className="show-to-screen-readers-only">
              Greetings screen-reader user.
              The portal is an application I wrote that dynamically appends content in response to user input.
              Currently the application is being used for form-filler purposes only.
              Later, I plan to add more features that will be very unique to this website.
              The application consists of a list of cells which are called console entries.
              Some console entries only display text, while other console entries are interactable.
              An important thing to be aware of is that the 
              control focus will automatically be adjusted to the last focusable console entry cell of the document after 
              any interaction has been completed.
              Be sure to check above and below the focused element each time you complete an interaction to make sure
              you aren't missing any content. I would very much love to hear feedback on this project!
            </p>
            <Toolbar
              // KeyboardShown={keyboardShown}
              // OnShowKeyboardToggle={(value: boolean) => setKeyboardShown(value)}
              NekoShown={props.NekoShown}
              OnShowNekoToggle={props.OnShowNekoToggle}
              OnGoHomeClick={() => navigate('/')}
            />
          </header>
          <main className="main__console-wrapper">
            <Console
              graph={graph}
              onGraphUpdate={graph => {
                setGraph(graph);
                // const newKeyboard = keyboard.Clone();
                // newKeyboard.Graph = graph;
                // setKeyboard(newKeyboard);
              }}/>
          </main>
          {/* {keyboardShown && <aside>
            <VirtualKeyboard
              Keyboard={keyboard}
              OnKeyboardUpdate={keyboard => setKeyboard(keyboard as ConsoleKeyboard)}/>
          </aside>} */}
        </div>
      </div>
    </div>
  );
}
