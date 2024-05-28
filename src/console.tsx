import { useState } from 'react';
import './console.css';

enum ConsoleEntryType {
  PromptEntryYesNo,
  Output,
  Terminate,
  Menu,
  DynamicOutput
}

enum PromptYesNo {
  Unselected,
  Yes,
  No
}

type ConsoleEntry = IConsoleEntryPromptYesNo |
  IConsoleEntryOutput |
  IConsoleEntryTerminate |
  IConsoleEntryMenu |
  IConsoleEntryDynamicOutput;

enum RequirementType {
  YesNo,
  Visible,
  AND,
  OR,
  MenuItem,
  MenuAnyItem
}

type Requirement = IRequirementYesNo |
  IRequirementVisible |
  IRequirementAND |
  IRequirementOR |
  IRequirementMenuItem |
  IRequirementMenuAnyItem;

interface IRequirementYesNo {
  type: RequirementType.YesNo;
  id: string;
  value: PromptYesNo;
}

interface IRequirementVisible {
  type: RequirementType.Visible;
  id: string;
}

interface IRequirementAND {
  type: RequirementType.AND;
  op1: Requirement;
  op2: Requirement;
}

interface IRequirementOR {
  type: RequirementType.OR;
  op1: Requirement;
  op2: Requirement;
}

interface IRequirementMenuItem {
  type: RequirementType.MenuItem;
  id: string;
  itemId: string;
}

interface IRequirementMenuAnyItem {
  type: RequirementType.MenuAnyItem;
  id: string;
}

interface IConsoleEntryProperties {
  type: ConsoleEntryType;
  id: string;
  requirement: Requirement | undefined;
  visible: boolean;
}

interface IConsoleEntryPromptYesNo extends IConsoleEntryProperties {
  type: ConsoleEntryType.PromptEntryYesNo;
  promptText: string;
  activatedValue: PromptYesNo;
  activated: boolean;
}

interface IConsoleEntryOutput extends IConsoleEntryProperties {
  type: ConsoleEntryType.Output;
  text: string;
}

interface IConsoleEntryDynamicOutput extends IConsoleEntryProperties {
  type: ConsoleEntryType.DynamicOutput;
  textFunc: (graph: IConsoleGraph) => string;
}

interface IConsoleEntryTerminate extends IConsoleEntryProperties {
  type: ConsoleEntryType.Terminate;
  started: boolean;
  startTime: DOMHighResTimeStamp | null;
}

interface IConsoleGraph {
  entries: ConsoleEntry[];
  entriesById: Map<string, ConsoleEntry>;
}

interface IMenuItem {
  id: string;
  text: string;
  activated: boolean;
}

enum MenuSelectBehavior {
  Radio,
  MultiSelect
}

interface IConsoleEntryMenu extends IConsoleEntryProperties {
  type: ConsoleEntryType.Menu;
  text: string;
  items: IMenuItem[];
  selectBehavior: MenuSelectBehavior;
}

function AddDays(date: Date, days: number) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

interface IUpcomingTime {
  timeString: string;
  id: string;
}

interface IUpcomingDay {
  dayOfMonthString: string;
  dayOfWeekString: string;
  monthString: string;
  id: string;
  times: IUpcomingTime[];
}

interface IUpcomingDates {
  daysThisWeek: IUpcomingDay[];
  daysNextWeek: IUpcomingDay[];
  daysNextNextWeek: IUpcomingDay[];
}

function UpcomingDatesNoService(today: Date) {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dailyTimes = ['3:00PM', '4:00PM', '5:00PM', '6:00PM'];
  const tomorrow = AddDays(today, 1);
  const firstDayOfThisWeek = AddDays(today, -today.getDay());
  const lastDayOfThisWeek = AddDays(firstDayOfThisWeek, 6);
  const firstDayOfNextWeek = AddDays(firstDayOfThisWeek, 7);
  const lastDayOfNextWeek = AddDays(firstDayOfNextWeek, 6);
  const firstDayOfNextNextWeek = AddDays(firstDayOfThisWeek, 14);
  const lastDayOfNextNextWeek = AddDays(firstDayOfNextNextWeek, 6);
  let daysThisWeek: IUpcomingDay[] = [];
  let daysNextWeek: IUpcomingDay[] = [];
  let daysNextNextWeek: IUpcomingDay[] = [];

  const dayOfMonthStr = (day: number) => {
    const numStr = day.toString();
    if (numStr.length > 0) {
      const lastChar = numStr[numStr.length - 1];
      let tailStr = '';
      switch (lastChar) {
        case '1':
          tailStr = 'st';
          break;
        case '2':
          tailStr = 'nd';
          break;
        case '3':
          tailStr = 'rd';
          break;
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
          tailStr = 'th';
          break;
        default:
          break;
      }

      return `${numStr}${tailStr}`
    }
    else {
      return '';
    }
  }

  const times = () => dailyTimes.map(t => ({
    timeString: t,
    id: t
  }));

  const date = (d: Date) => (
    {
      dayOfMonthString: dayOfMonthStr(d.getDate()),
      dayOfWeekString: days[d.getDay()],
      monthString: months[d.getMonth()],
      times: times(),
      id: `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    }
  );

  const isWeekDay = (d: Date) => {
    const currentDay = d.getDay();
    return currentDay >= 1 && currentDay <= 5;
  }

  for (let i = tomorrow; i <= lastDayOfThisWeek; i = AddDays(i, 1)) {
    if (isWeekDay(i)) {
      daysThisWeek.push(date(i));
    }
  }
  for (let i = firstDayOfNextWeek; i <= lastDayOfNextWeek; i = AddDays(i, 1)) {
    if (isWeekDay(i)) {
      daysNextWeek.push(date(i));
    }
  }
  for (let i = firstDayOfNextNextWeek; i <= lastDayOfNextNextWeek; i = AddDays(i, 1)) {
    if (isWeekDay(i)) {
      daysNextNextWeek.push(date(i));
    }
  }

  const rv: IUpcomingDates = {
    daysThisWeek: daysThisWeek,
    daysNextWeek: daysNextWeek,
    daysNextNextWeek: daysNextNextWeek
  }

  return rv;
}

function NowDateInMST() {
  return new Date(new Date().toLocaleString("en-US", {timeZone: "America/Denver"})); 
}

const UpcomingDates = UpcomingDatesNoService(NowDateInMST());

export function Console() {
  function Output(id: string, text: string, requirement: Requirement | undefined = undefined) {
    const newEntry: ConsoleEntry = { 
      type: ConsoleEntryType.Output,
      id: id,
      text: text,
      requirement: requirement,
      visible: false
    };

    return newEntry;
  }

  function DynamicOutput(id: string, textFunc: (graph: IConsoleGraph) => string, requirement: Requirement | undefined = undefined) {
    const newEntry: ConsoleEntry = {
      type: ConsoleEntryType.DynamicOutput,
      id: id,
      textFunc: textFunc,
      requirement: requirement,
      visible: false
    };

    return newEntry;
  }

  function Prompt(id: string, text: string, requirement: Requirement | undefined = undefined) {
    const newEntry: ConsoleEntry = { 
      type: ConsoleEntryType.PromptEntryYesNo,
      id: id,
      promptText: text,
      requirement: requirement,
      visible: false,
      activated: false,
      activatedValue: PromptYesNo.Unselected
    };

    return newEntry;
  }

  function Terminate(id: string, requirement: Requirement | undefined = undefined) {
    const newEntry: ConsoleEntry = {
      type: ConsoleEntryType.Terminate,
      id: id,
      requirement: requirement,
      visible: false,
      started: false,
      startTime: null
    };

    return newEntry;
  }

  interface IMItem {
    id: string;
    text: string;
  }

  function Menu(id: string, text: string, selectBehavior: MenuSelectBehavior, items: IMItem[], requirement: Requirement | undefined = undefined) {
    const newEntry: ConsoleEntry = {
      type: ConsoleEntryType.Menu,
      id: id,
      requirement: requirement,
      visible: false,
      text: text,
      selectBehavior: selectBehavior,
      items: items.map(i => ({
        id: i.id,
        text: i.text,
        activated: false
      }))
    };

    return newEntry;
  }

  function WeekMenuItems(dates: IUpcomingDates) {
    let items: IMItem[] = [];
    if (dates.daysThisWeek.length > 0) {
      items.push({
        id: 'this-week',
        text: 'This Week'
      });
    }
    if (dates.daysNextWeek.length > 0) {
      items.push({
        id: 'next-week',
        text: 'Next Week'
      });
    }
    if (dates.daysNextNextWeek.length > 0) {
      items.push({
        id: 'next-next-week',
        text: 'Next-Next Week'
      });
    }
    return items;
  }

  function DayMenus(dates: IUpcomingDates, idPrefix: string) {
    const rv: ConsoleEntry[] = [];
    if (dates.daysThisWeek.length > 0) {
      rv.push(Menu(`${idPrefix}-thisweek-day`, 'Which day?', MenuSelectBehavior.Radio,
      dates.daysThisWeek.filter(d => d.times.length > 0).map(d => ({ text: d.dayOfWeekString, id: d.id })), {
        type: RequirementType.MenuItem,
        id: `${idPrefix}-week`,
        itemId: 'this-week'
      }));
    }
    if (dates.daysNextWeek.length > 0) {
      rv.push(Menu(`${idPrefix}-nextweek-day`, 'Which day?', MenuSelectBehavior.Radio,
      dates.daysNextWeek.filter(d => d.times.length > 0).map(d => ({ text: d.dayOfWeekString, id: d.id })), {
        type: RequirementType.MenuItem,
        id: `${idPrefix}-week`,
        itemId: 'next-week'
      }));
    }
    if (dates.daysNextNextWeek.length > 0) {
      rv.push(Menu(`${idPrefix}-nextnextweek-day`, 'Which day?', MenuSelectBehavior.Radio,
      dates.daysNextNextWeek.filter(d => d.times.length > 0).map(d => ({ text: d.dayOfWeekString, id: d.id })), {
        type: RequirementType.MenuItem,
        id: `${idPrefix}-week`,
        itemId: 'next-next-week'
      }));
    }

    return rv;
  }

  function ConsultScheduleOutput(dates: IUpcomingDates) {
    let ids: string[] = [
      dates.daysThisWeek.map(d => `consult-schedule-${d.id}-time`),
      dates.daysNextWeek.map(d => `consult-schedule-${d.id}-time`),
      dates.daysNextNextWeek.map(d => `consult-schedule-${d.id}-time`)
    ].flat(1);

    let currentReq: Requirement | undefined = ids.length > 0 ? {
      type: RequirementType.MenuAnyItem,
      id: ids[0]
    } : undefined;

    for (let i = 1; i < ids.length; ++i) {
      currentReq = {
        type: RequirementType.OR,
        op1: {
          type: RequirementType.MenuAnyItem,
          id: ids[i]
        },
        op2: currentReq!
      };
    }

    return DynamicOutput('consult-schedule-output', () => { return 'YES'; }, currentReq);
  }

  function TimeMenus(dates: IUpcomingDates, idPrefix: string) {
    let rv: ConsoleEntry[] = [];
    if (dates.daysThisWeek.length > 0) {
      const menus = dates.daysThisWeek.filter(d => d.times.length > 0).map(
        d => Menu(`${idPrefix}-${d.id}-time`, 'At which time?', MenuSelectBehavior.Radio,
          d.times.map(t => ({ text: t.timeString, id: t.id})),
          {
            type: RequirementType.MenuItem,
            id: `${idPrefix}-thisweek-day`,
            itemId: d.id
          }
        ));
      rv = rv.concat(menus);
    }
    if (dates.daysNextWeek.length > 0) {
      const menus = dates.daysNextWeek.filter(d => d.times.length > 0).map(
        d => Menu(`${idPrefix}-${d.id}-time`, 'At which time?', MenuSelectBehavior.Radio,
          d.times.map(t => ({ text: t.timeString, id: t.id})),
          {
            type: RequirementType.MenuItem,
            id: `${idPrefix}-nextweek-day`,
            itemId: d.id
          }
        ));
      rv = rv.concat(menus);
    }
    if (dates.daysNextNextWeek.length > 0) {
      const menus = dates.daysNextNextWeek.filter(d => d.times.length > 0).map(
        d => Menu(`${idPrefix}-${d.id}-time`, 'At which time?', MenuSelectBehavior.Radio,
          d.times.map(t => ({ text: t.timeString, id: t.id})),
          {
            type: RequirementType.MenuItem,
            id: `${idPrefix}-nextnextweek-day`,
            itemId: d.id
          }
        ));
      rv = rv.concat(menus);
    }

    return rv;
  }

  let initialEntries: ConsoleEntry[] = [];
  initialEntries = initialEntries.concat(
    [
      Output('title', `
 ██╗    ██╗ ██████╗ ██████╗ ████████╗██╗  ██╗███████╗██╗   ██╗    ███████╗████████╗██╗   ██╗██████╗ ██╗ ██████╗ ███████╗
 ██║    ██║██╔═══██╗██╔══██╗╚══██╔══╝██║  ██║██╔════╝╚██╗ ██╔╝    ██╔════╝╚══██╔══╝██║   ██║██╔══██╗██║██╔═══██╗██╔════╝
 ██║ █╗ ██║██║   ██║██████╔╝   ██║   ███████║█████╗   ╚████╔╝     ███████╗   ██║   ██║   ██║██║  ██║██║██║   ██║███████╗
 ██║███╗██║██║   ██║██╔══██╗   ██║   ██╔══██║██╔══╝    ╚██╔╝      ╚════██║   ██║   ██║   ██║██║  ██║██║██║   ██║╚════██║
 ╚███╔███╔╝╚██████╔╝██║  ██║   ██║   ██║  ██║███████╗   ██║       ███████║   ██║   ╚██████╔╝██████╔╝██║╚██████╔╝███████║
  ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝   ╚═╝       ╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚═╝ ╚═════╝ ╚══════╝

`),
      Menu('intent-menu', 'Hi, it\u{2019}s me Charlotte, your instructor! How may I direct you? (Please pick from the choices below)', MenuSelectBehavior.Radio, [
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
      Output('new-student-response', 'That is so awesome! I can\u{2019}t wait to meet you!', {
        type: RequirementType.MenuItem,
        id: 'intent-menu',
        itemId: 'new-student'
      }),
      Menu('consult-schedule-week', 'Which week works best for the consultation Zoom call?', MenuSelectBehavior.Radio,
        WeekMenuItems(UpcomingDates), 
        {
          type: RequirementType.Visible,
          id: 'new-student-response'
        }
      )
    ],
    DayMenus(UpcomingDates, 'consult-schedule'),
    TimeMenus(UpcomingDates, 'consult-schedule'),
    [
      ConsultScheduleOutput(UpcomingDates)
    ]
  );

  UpdateVisibility(initialEntries);

  const [entries, setEntries] = useState<ConsoleEntry[]>(initialEntries);

  const graph: IConsoleGraph = {
    entries: entries,
    entriesById: new Map(entries.map(e => [e.id, e]))
  };

  function RequirementMet(requirement: Requirement, entriesGraph: Map<string, ConsoleEntry>): boolean {
    let met = false;
    switch (requirement.type) {
      case RequirementType.YesNo:
        {
          const e = entriesGraph.get(requirement.id) as IConsoleEntryPromptYesNo;
          if (e) {
            met = e.activatedValue === requirement.value;
          }
        }
        break;
      case RequirementType.Visible:
        {
          const e = entriesGraph.get(requirement.id);
          if (e) {
            met = e.visible;
          }
        }
        break;
      case RequirementType.AND:
        {
          met = RequirementMet(requirement.op1, entriesGraph) &&
            RequirementMet(requirement.op2, entriesGraph);
        }
        break;
      case RequirementType.OR:
        {
          met = RequirementMet(requirement.op1, entriesGraph) ||
            RequirementMet(requirement.op2, entriesGraph);
        }
        break;
      case RequirementType.MenuItem:
        {
          const e = entriesGraph.get(requirement.id) as IConsoleEntryMenu;
          if (e && e.visible) {
            const menuItem = e.items.find(i => i.id === requirement.itemId);
            if (menuItem) {
              met = menuItem.activated;
            }
          }
        }
        break;
      case RequirementType.MenuAnyItem:
        {
          const e = entriesGraph.get(requirement.id) as IConsoleEntryMenu;
          if (e && e.visible) {
            met = e.items.find(i => i.activated) ? true : false;
          }
        }
        break;
      default:
        break;
    }
    return met;
  }

  function UpdateVisibility(entries: ConsoleEntry[]) {
    const graph = new Map(entries.map(e => [e.id, e]));
    entries.forEach(e => {
      if (e.requirement) {
        e.visible = RequirementMet(e.requirement, graph);
      }
      else {
        e.visible = true;
      }
    });
  }

  function RenderOutputEntry(entry: IConsoleEntryOutput) {
    if (!entry.visible) {
      return null;
    }

    return (
      <div className="div__output-container">
        <pre className="pre__output">
          {entry.text}
        </pre>
      </div>
    );
  }

  function RenderTerminateEntry(entry: IConsoleEntryTerminate) {
    if (!entry.visible) {
      return null;
    }

    return (
      <></>
    );
  }

  function RenderEntryPromptYesNo(entry: IConsoleEntryPromptYesNo) {
    if (!entry.visible) {
      return null;
    }

    return (
      <div className="div__prompt-yes-no-container">
        <h2>{entry.promptText}</h2>
        <button
          className={entry.activatedValue === PromptYesNo.Yes ?
            'div__prompt-yes-no--selected' :
            'div__prompt-yes-no'}
          onClick={() => {
            entry.activated = true;
            entry.activatedValue = PromptYesNo.Yes;
            const newEntries = [...entries];
            UpdateVisibility(newEntries);
            setEntries(newEntries);
        }}>
          [Y]
        </button>
        <div className="div__prompt-yes-no-divider">/</div>
        <button 
          className={entry.activatedValue === PromptYesNo.No ?
            'div__prompt-yes-no--selected' :
            'div__prompt-yes-no'}
          onClick={() => {
            entry.activated = true;
            entry.activatedValue = PromptYesNo.No;
            const newEntries = [...entries];
            UpdateVisibility(newEntries);
            setEntries(newEntries);
        }}>
          [N]
        </button>
      </div>
    );
  }

  function RenderEntryMenu(entry: IConsoleEntryMenu) {
    if (!entry.visible) {
      return null;
    }

    return (
      <div className="div__menu-container">
        <h2>{entry.text}</h2>
        <div className="div__menu-items">
          {entry.items.map((item, i) => <div key={i}>
              <div className="div__menu-item-container">
                <button 
                  className={item.activated ?
                    'button__menu-item--activated' :
                    'button__menu-item'}
                  onClick={() => {
                    if (entry.selectBehavior === MenuSelectBehavior.Radio) {
                      item.activated = true;
                      entry.items.forEach(it => {
                        if (it.id !== item.id) {
                          it.activated = false;
                        }
                      });
                    }
                    else {
                      item.activated = !item.activated;
                    }
                    
                    const newEntries = [...entries];
                    UpdateVisibility(newEntries);
                    setEntries(newEntries);
                  }}
                  >
                  [{i}] {item.text}
                </button>
              </div>
            </div>)}
        </div>
      </div>
    );
  }

  function RenderDynamicOutputEntry(entry: IConsoleEntryDynamicOutput) {
    if (!entry.visible) {
      return null;
    }

    return (
      <div className="div__output-container">
        <pre className="pre__output">
          {entry.textFunc(graph)}
        </pre>
      </div>
    );
  }
  
  function RenderConsoleEntry(entry: ConsoleEntry) {
    let rv = null;
    switch (entry.type) {
      case ConsoleEntryType.PromptEntryYesNo:
        rv = RenderEntryPromptYesNo(entry);
        break;
      case ConsoleEntryType.Output:
        rv = RenderOutputEntry(entry);
        break;
      case ConsoleEntryType.Terminate:
        rv = RenderTerminateEntry(entry);
        break;
      case ConsoleEntryType.Menu:
        rv = RenderEntryMenu(entry);
        break;
      case ConsoleEntryType.DynamicOutput:
        rv = RenderDynamicOutputEntry(entry);
        break;
      default:
        break;
    }
  
    return rv;
  }

  return (
    <div className="div__console-area">
      {entries.filter(e => e.visible).map((e, i) => <div className="div__console-entry" key={i}>
        {RenderConsoleEntry(e)}
      </div>)}
    </div>
  );
}