
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import consultationInfo from "../data/infoMarkdown/consultationInfo.md?raw";
import "../styles/PortalPage.css";
import { Console } from "../../console/components/Console";
import { ConsoleGraph, EntryData, IConsoleGraph } from "../../console/types/ConsoleGraph";
import { InfoConfirmType } from "../../console/types/entries/InfoConfirm";
// import { VirtualKeyboard } from "../../keyboard/components/VirtualKeyboard";
// import { ConsoleKeyboard } from "../types/ConsoleKeyboard";
import { Toolbar } from "./Toolbar";
import { CreateScheduleMenus, GetScheduledTimeString, NowDateInMST, UpcomingDatesNoService } from "../../console/types/Schedule";
import { SendMessage } from "../types/Backend";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, useMsal } from "@azure/msal-react";
import { MutateClone } from "../../shared/MutateClone";
import { GraphNodeType, IConsoleGraphNodeRadioMenu, IConsoleGraphNodeTextPrompt } from "../../console/types/GraphNode";
import { ActionType } from "../../console/types/GraphAction";
import { ConsoleEntryType } from "../../console/types/ConsoleEntryType";
import { FormType } from "../../console/types/entries/TextPrompt";

const upcomingDates = UpcomingDatesNoService(NowDateInMST());

function composeEntries(...entryData: (EntryData | EntryData[])[]) {
  return entryData.flat();
}

const consoleEntries: EntryData[] = composeEntries(
  {
    Type: ConsoleEntryType.TitleOutput,
    Data: {
      Id: 'title',
      TextParts: [`
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
`],
      AccessibilityLabel: 'Some awesome-looking ASCII art that displays the text Worthey Studios'
    }
  },
  {
    Type: ConsoleEntryType.RadioMenu,
    Data: {
      Id: 'intent-menu',
      Text: 'Hi, it\'s me Charlotte, your instructor! How may I direct you? (Please pick from the choices below)',
      Items: [
        {
          id: 'new-student',
          text: 'I would like to sign up for a free consultation.'
        },
        {
          id: 'contact',
          text: 'I would like to send a message to Charlotte.'
        }
      ]
    }
  },
  {
    Type: ConsoleEntryType.TextPrompt,
    Data: {
      Id: 'contact-input-email',
      PromptText: 'What email address may I send a reply to?',
      FormType: FormType.Email,
      RequirementId: 'intent-menu-contact'
    }
  },
  {
    Type: ConsoleEntryType.TextPrompt,
    Data: {
      Id: 'contact-input-name',
      PromptText: 'What name may I refer to you by?',
      FormType: FormType.Name,
      RequirementId: 'contact-input-email'
    }
  },
  {
    Type: ConsoleEntryType.TextPrompt,
    Data: {
      Id: 'contact-input-subject',
      PromptText: 'What is the subject line for your message?',
      FormType: FormType.NotEmpty,
      RequirementId: 'contact-input-name'
    }
  },
  {
    Type: ConsoleEntryType.TextPrompt,
    Data: {
      Id: 'contact-input-body',
      PromptText: 'Please write your message below:',
      FormType: FormType.NotEmpty,
      RequirementId: 'contact-input-subject',
      IsMultiline: true
    }
  },
  {
    Type: ConsoleEntryType.Output,
    Data: {
      Id: 'contact-done-output',
      Text: 'Looks good!',
      RequirementId: 'contact-input-body'
    }
  },
  {
    Type: ConsoleEntryType.RequestButton,
    Data: {
      Id: 'contact-submit',
      ButtonText: 'Submit!',
      OnStartRequest: (graph: IConsoleGraph, onComplete: (success: boolean) => void) => {
        const data = GetSendMessageData(graph);
        if (!data) {
          onComplete(false);
          return;
        }
        SendMessage(`From: ${data.Name}\nEmail: ${data.EmailAddress}\n\n${data.Body}`,data.SubjectLine, false, onComplete);
      },
      RequirementId: 'contact-input-body'
    }
  },
  {
    Type: ConsoleEntryType.Output,
    Data: {
      Id: 'new-student-response',
      Text: 'That is so awesome! Let\'s get started with some basic information...',
      RequirementId: 'intent-menu-new-student'
    }
  },
  {
    Type: ConsoleEntryType.RadioMenu,
    Data: {
      Id: 'new-student-country-split',
      Text: 'Do you live in the United States?',
      Items: [
        {
          id: 'us-yes',
          text: 'Yes'
        },
        {
          id: 'us-no',
          text: 'No'
        }
      ],
      RequirementId: 'intent-menu-new-student'
    }
  },
  {
    Type: ConsoleEntryType.Output,
    Data: {
      Id: 'new-student-us-no',
      Text: 'Understood. I\'m sorry, but I only take students from the United States at this time. This is mainly because I am unfamiliar with the international tax landscape.',
      RequirementId: 'new-student-country-split-us-no'
    }
  },
  {
    Type: ConsoleEntryType.RadioMenu,
    Data: {
      Id: 'new-student-age-menu-split',
      Text: 'new-student-age-split-menu',
      Items: [
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
      ],
      RequirementId: 'new-student-country-split-us-yes'
    }
  },
  {
    Type: ConsoleEntryType.Output,
    Data: {
      Id: 'new-student-age-split-menu-child',
      Text: 'Understood. I\'m sorry, but I don\'t take students under the age of 13 at this time. Parents- feel free to send me a message if you have any questions.',
      RequirementId: 'new-student-age-split-menu-child'
    }
  },
  {
    Type: ConsoleEntryType.RadioMenu,
    Data: {
      Id: 'new-student-grade-menu',
      Text: 'Which K-12 grade is the student in?',
      Items: [
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
      ],
      RequirementId: 'new-student-age-split-menu-teen'
    }
  },
  {
    Type: ConsoleEntryType.TextPrompt,
    Data: {
      Id: 'new-student-input-name',
      PromptText: 'What is the student\'s preferred first name?',
      FormType: FormType.Name,
      RequirementId: 'new-student-age-split-menu-adult-or-grade-menu'
    }
  },
  {
    Type: ConsoleEntryType.DynamicOutput,
    Data: {
      Id: 'new-student-name-greeting',
      TextFunc: (graph: IConsoleGraph) => {
        const node = graph.FindNode<IConsoleGraphNodeTextPrompt>('input-name');
        if (node) {
          return `It's great to meet you, ${node.state.userInputText}!`;
        }
        else {
          return '';
        }
      },
      RequirementId: 'new-student-input-name'
    }
  },
  {
    Type: ConsoleEntryType.TextPrompt,
    Data: {
      Id: 'new-student-input-email',
      PromptText: 'What email address may I send the initial Zoom invite to?',
      FormType: FormType.Email,
      RequirementId: 'new-student-input-name'
    }
  },
  {
    Type: ConsoleEntryType.Output,
    Data: {
      Id: 'new-student-email-ok',
      Text: 'Okay, I will send the link there some time before the meeting, whenever I get around to it.',
      RequirementId: 'new-student-input-email'
    }
  },
  {
    Type: ConsoleEntryType.Output,
    Data: {
      Id: 'new-student-time-to-schedule',
      Text: 'Now for the consultation scheduling...',
      RequirementId: 'new-student-input-email'
    }
  },
  CreateScheduleMenus('consult-schedule', upcomingDates, 'new-student-input-email'),
  {
    Type: ConsoleEntryType.Output,
    Data: {
      Id: 'new-student-consult-schedule-msg',
      Text: 'Wowee!!! That time works for me!',
      RequirementId: 'new-student-consult-schedule'
    }
  },
  {
    Type: ConsoleEntryType.InfoConfirm,
    Data: {
      Id: 'new-student-info-confirm',
      Title: 'Important Consultation Information:',
      InputFunc: () => consultationInfo,
      InputType: InfoConfirmType.Markdown,
      ConfirmButtonText: 'I understand.',
      ConfirmButtonConfirmedText: 'I understood!',
      RequirementId: 'new-student-consult-schedule'
    }
  },
  {
    Type: ConsoleEntryType.DynamicOutput,
    Data: {
      Id: 'new-student-summary',
      TextFunc: (graph: IConsoleGraph) => {
        let rv = '';
        const data = GetConsultationScheduleData(graph);
        if (!data) {
          rv = 'An Error Occurred';
        }
        else {
          rv = 'In Summary...\n\n' +
            `Adult: ${data.AgeGroupSplit === 'adult' ? 'Yes' : 'No'}\n` +
            (data.Grade ? `Grade: ${data.Grade?.substring(6)}\n` : '') +
            `Preferred First Name: ${data.PreferredFirstName}\n` +
            `Email Address: ${data.EmailAddress}\n` +
            `Scheduled Time: ${data.Time}`;
        }
  
        return rv;
      },
      RequirementId: 'new-student-info-confirm'
    }
  },
  {
    Type: ConsoleEntryType.RequestButton,
    Data: {
      Id: 'new-student-submit',
      ButtonText: 'Submit!',
      OnStartRequest: (graph: IConsoleGraph, onComplete: (success: boolean) => void) => {
        const data = GetConsultationScheduleData(graph);
        if (!data) {
          onComplete(false);
          return;
        }
        const json = JSON.stringify(data, null, 2);
        SendMessage(json, 'New Student Sign Up', true, onComplete);
      },
      RequirementId: 'new-student-summary'
    }
  }
);
// const consoleEntries: IConsoleEntry[] =
//   [
//     CreateTitleOutput('title', [`
//  ██╗    ██╗ ██████╗ ██████╗ ████████╗██╗  ██╗███████╗██╗   ██╗   
//  ██║    ██║██╔═══██╗██╔══██╗╚══██╔══╝██║  ██║██╔════╝╚██╗ ██╔╝   
//  ██║ █╗ ██║██║   ██║██████╔╝   ██║   ███████║█████╗   ╚████╔╝    
//  ██║███╗██║██║   ██║██╔══██╗   ██║   ██╔══██║██╔══╝    ╚██╔╝     
//  ╚███╔███╔╝╚██████╔╝██║  ██║   ██║   ██║  ██║███████╗   ██║      
//   ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝   ╚═╝      

// `,
// `
// ███████╗████████╗██╗   ██╗██████╗ ██╗ ██████╗ ███████╗
// ██╔════╝╚══██╔══╝██║   ██║██╔══██╗██║██╔═══██╗██╔════╝
// ███████╗   ██║   ██║   ██║██║  ██║██║██║   ██║███████╗
// ╚════██║   ██║   ██║   ██║██║  ██║██║██║   ██║╚════██║
// ███████║   ██║   ╚██████╔╝██████╔╝██║╚██████╔╝███████║
// ╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚═╝ ╚═════╝ ╚══════╝
// `], 'Some awesome-looking ASCII art that displays the text Worthey Studios'),
//     CreateRadioMenu('intent-menu', 'Hi, it\'s me Charlotte, your instructor! How may I direct you? (Please pick from the choices below)', [
//       {
//         id: 'new-student',
//         text: 'I would like to sign up for a free consultation.'
//       },
//       {
//         id: 'contact',
//         text: 'I would like to send a message to Charlotte.'
//       }
//     ]),
//     CreateTextPrompt('contact-input-email', 'What email address may I send a reply to?', FormType.Email, 
//       CreateRequirementRadioMenuItem('intent-menu', 'contact')
//     ),
//     CreateTextPrompt('contact-input-name', 'What name may I refer to you by?', FormType.Name,
//       CreateRequirementPromptContinued('contact-input-email')
//     ),
//     CreateTextPrompt('contact-input-subject', 'What is the subject line for your message?', FormType.NotEmpty, 
//       CreateRequirementPromptContinued('contact-input-name')
//     ),
//     CreateTextPrompt('contact-input-body', 'Please write your message below:', FormType.NotEmpty, 
//       CreateRequirementPromptContinued('contact-input-subject'),
//       true
//     ),
//     CreateOutput('contact-done-output', 'Looks good!',
//       CreateRequirementPromptContinued('contact-input-body')
//     ),
//     CreateRequestButton('contact-submit', 'Submit!',
//       (graph: IConsoleGraph, onComplete: (success: boolean) => void) => {
//         const data = GetSendMessageData(graph);
//         if (!data) {
//           onComplete(false);
//           return;
//         }
//         SendMessage(`From: ${data.Name}\nEmail: ${data.EmailAddress}\n\n${data.Body}`,data.SubjectLine, false, onComplete);
//       },
//       CreateRequirementRecursive('contact-done-output')
//     ),
//     CreateOutput('new-student-response', 'That is so awesome! Let\'s get started with some basic information...',
//       CreateRequirementRadioMenuItem('intent-menu', 'new-student')
//     ),
//     CreateRadioMenu('country-split', 'Do you live in the United States?', [
//       {
//         id: 'us-yes',
//         text: 'Yes'
//       },
//       {
//         id: 'us-no',
//         text: 'No'
//       }
//     ], CreateRequirementRecursive('new-student-response')),
//     CreateOutput('us-no', 'Understood. I\'m sorry, but I only take students from the United States at this time. This is mainly because I am unfamiliar with the international tax landscape.',
//       CreateRequirementRadioMenuItem('country-split', 'us-no')
//     ),
//     CreateRadioMenu('age-split-menu', 'Which age group best describes the student?', [
//       {
//         id: 'child',
//         text: 'Child (Age less than 13)'
//       },
//       {
//         id: 'teen',
//         text: 'Teen (Age 13+)'
//       },
//       {
//         id: 'adult',
//         text: 'Adult (Age 18+)'
//       }
//     ], CreateRequirementRadioMenuItem('country-split', 'us-yes')),
//     CreateOutput('child-no', 'Understood. I\'m sorry, but I don\'t take students under the age of 13 at this time. Parents- feel free to send me a message if you have any questions.',
//       CreateRequirementRadioMenuItem('age-split-menu', 'child')
//     ),
//     CreateRadioMenu('grade-menu', 'Which K-12 grade is the student in?', [
//       {
//         id: 'grade-7',
//         text: '7'
//       },
//       {
//         id: 'grade-8',
//         text: '8'
//       },
//       {
//         id: 'grade-9',
//         text: '9'
//       },
//       {
//         id: 'grade-10',
//         text: '10'
//       },
//       {
//         id: 'grade-11',
//         text: '11'
//       },
//       {
//         id: 'grade-12',
//         text: '12'
//       }
//     ], CreateRequirementRadioMenuItem('age-split-menu', 'teen')),
//     CreateTextPrompt('input-name', 'What is the student\'s preferred first name?', FormType.Name,
//       CreateRequirementOR(
//         CreateRequirementRadioMenuItem('age-split-menu', 'adult'),
//         CreateRequirementRadioMenuActive('grade-menu')
//       )
//     ),
//     CreateDynamicOutput('name-greeting', graph => {
//       const node = graph.FindNode('input-name');
//       if (node) {
//         const stateCast = node.state as IConsoleEntryStateTextPrompt;
//         return `It's great to meet you, ${stateCast.userInputText}!`;
//       }
//       else {
//         return '';
//       }
//     }, CreateRequirementPromptContinued('input-name')),
//     CreateTextPrompt('input-email', 'What email address may I send the initial Zoom invite to?', FormType.Email, CreateRequirementRecursive('name-greeting')),
//     CreateOutput('email-ok', 'Okay, I will send the link there some time before the meeting, whenever I get around to it.', CreateRequirementPromptContinued('input-email')),
//     CreateOutput('time-to-schedule', 'Now for the consultation scheduling...', CreateRequirementRecursive('email-ok')),
//     CreateScheduleMenus('consult-schedule', upcomingDates, CreateRequirementRecursive('time-to-schedule')),
//     CreateOutput('consult-schedule-msg', 'Wowee!!! That time works for me!', CreateRequirementRecursive('consult-schedule')),
//     CreateInfoConfirm('consult-schedule-msg2',
//       'Important Consultation Information:',
//       () => consultationInfo, InfoConfirmType.Markdown,
//       'I understand.',
//       'I understood!',
//       CreateRequirementRecursive('consult-schedule-msg')),
//     CreateDynamicOutput('summary', graph => {
//       let rv = '';
//       const data = GetConsultationScheduleData(graph);
//       if (!data) {
//         rv = 'An Error Occurred';
//       }
//       else {
//         rv = 'In Summary...\n\n' +
//           `Adult: ${data.AgeGroupSplit === 'adult' ? 'Yes' : 'No'}\n` +
//           (data.Grade ? `Grade: ${data.Grade?.substring(6)}\n` : '') +
//           `Preferred First Name: ${data.PreferredFirstName}\n` +
//           `Email Address: ${data.EmailAddress}\n` +
//           `Scheduled Time: ${data.Time}`;
//       }

//       return rv;
//     }, CreateRequirementInfoConfirmed('consult-schedule-msg2')),
//     CreateRequestButton('consultation-submit', 'Submit!',
//       (graph: IConsoleGraph, onComplete: (success: boolean) => void) => {
//         const data = GetConsultationScheduleData(graph);
//         if (!data) {
//           onComplete(false);
//           return;
//         }
//         const json = JSON.stringify(data, null, 2);
//         SendMessage(json, 'New Student Sign Up', true, onComplete);
//       },
//       CreateRequirementRecursive('summary')
//     )
//   ].flat();

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
  EmailAddress: string;
  Time: string;
}

function GraphTryGet<N extends GraphNodeType, T>(graph: IConsoleGraph, entryId: string, onGet: (node: N) => T) {
  const node = graph.FindNode<N>(entryId);
  if (node) {
    return onGet(node);
  }
  else {
    return undefined;
  }
}

function GetSendMessageData(graph: IConsoleGraph) {
  const name = GraphTryGet<IConsoleGraphNodeTextPrompt, string>(graph, 'contact-input-name', s => s.state.userInputText);
  const emailAddress = GraphTryGet<IConsoleGraphNodeTextPrompt, string>(graph, 'contact-input-email', s => s.state.userInputText);
  const subject = GraphTryGet<IConsoleGraphNodeTextPrompt, string>(graph, 'contact-input-subject', s => s.state.userInputText);
  const body = GraphTryGet<IConsoleGraphNodeTextPrompt, string>(graph, 'contact-input-body', s => s.state.userInputText);

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
  const ageGroupSplit = GraphTryGet<IConsoleGraphNodeRadioMenu, string | null>(graph, 'age-split-menu', s => s.state.activeItem);
  const isAdult = ageGroupSplit === 'adult'
  const grade = isAdult ? undefined :  GraphTryGet<IConsoleGraphNodeRadioMenu, string | null>(graph, 'grade-menu', s => s.state.activeItem);
  const preferredFirstName = GraphTryGet<IConsoleGraphNodeTextPrompt, string>(graph, 'input-name', s => s.state.userInputText);
  const emailAddress = GraphTryGet<IConsoleGraphNodeTextPrompt, string>(graph, 'input-email', s => s.state.userInputText);
  const time = GetScheduledTimeString(graph, upcomingDates, 'consult-schedule');

  if (!ageGroupSplit || !preferredFirstName || !emailAddress || !time) {
    return undefined;
  }

  const rv: IConsultationScheduleData = {
    AgeGroupSplit: ageGroupSplit,
    Grade: grade ? grade : undefined,
    PreferredFirstName: preferredFirstName,
    EmailAddress: emailAddress,
    Time: time
  };

  return rv;
}

interface IPortalPageContentProps {
  NekoShown: boolean;
  OnShowNekoToggle(show: boolean): void;
}

function PortalPageContent(props: IPortalPageContentProps) {
  // const [keyboardShown, setKeyboardShown] = useState(IsTouchScreen());
  const navigate = useNavigate();

  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  const loggedIn = activeAccount !== null;

  const [graph, setGraph] = useState<IConsoleGraph>(new ConsoleGraph(consoleEntries));

  useEffect(() => {
    MutateClone(graph, newGraph => {
      newGraph.ExecuteAction({ Type: ActionType.GraphSetLoggedIn, Data: { LoggedIn: loggedIn }});
      setGraph(newGraph);
    });
  }, [loggedIn]);
  // const [keyboard, setKeyboard] = useState(new ConsoleKeyboard(graph, setGraph));

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
              }}
            />
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

interface IPortalPageProps {
  MSALInstance: PublicClientApplication;
  NekoShown: boolean;
  OnShowNekoToggle(show: boolean): void;
}

export function PortalPage(props: IPortalPageProps) {
  return (
    <MsalProvider instance={props.MSALInstance}>
      <PortalPageContent NekoShown={props.NekoShown} OnShowNekoToggle={props.OnShowNekoToggle}/>
    </MsalProvider>
  );
};
