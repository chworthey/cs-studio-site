import { ConsoleEntryType } from "./ConsoleEntryType";
import { EntryData, IConsoleGraph } from "./ConsoleGraph";
import { IFactoryMenuItem } from "./entries/RadioMenu";
import { IConsoleGraphNodeRadioMenu } from "./GraphNode";

export interface IUpcomingTime {
  timeString: string;
  id: string;
};

export interface IUpcomingDay {
  dayOfMonthString: string;
  dayOfWeekString: string;
  monthString: string;
  id: string;
  times: IUpcomingTime[];
};

export interface IUpcomingDates {
  daysThisWeek: IUpcomingDay[];
  daysNextWeek: IUpcomingDay[];
  daysNextNextWeek: IUpcomingDay[];
};

function AddDays(date: Date, days: number) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function UpcomingDatesNoService(today: Date) {
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
      if (day >= 11 && day <= 13) {
        tailStr = 'th';
      }
      else {
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

export function NowDateInMST() {
  return new Date(new Date().toLocaleString("en-US", {timeZone: "America/Denver"})); 
};

function WeekMenuItems(dates: IUpcomingDates) {
  let items: IFactoryMenuItem[] = [];
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
  const rv: EntryData[] = [];
  if (dates.daysThisWeek.length > 0) {
    rv.push({
      Type: ConsoleEntryType.RadioMenu,
      Data: {
        Id: `${idPrefix}-thisweek-day`,
        Text: 'Which day?',
        Items: dates.daysThisWeek.filter(d => d.times.length > 0).map(d => ({ text: d.dayOfWeekString, id: d.id })),
        RequirementId: `${idPrefix}-week-this-week`
      }
    });
  }
  if (dates.daysNextWeek.length > 0) {
    rv.push({
      Type: ConsoleEntryType.RadioMenu,
      Data: {
        Id: `${idPrefix}-nextweek-day`,
        Text: 'Which day?',
        Items: dates.daysNextWeek.filter(d => d.times.length > 0).map(d => ({ text: d.dayOfWeekString, id: d.id })),
        RequirementId: `${idPrefix}-week-next-week`
      }
    });
  }
  if (dates.daysNextNextWeek.length > 0) {
    rv.push({
      Type: ConsoleEntryType.RadioMenu,
      Data: {
        Id: `${idPrefix}-nextnextweek-day`,
        Text: 'Which day?',
        Items: dates.daysNextNextWeek.filter(d => d.times.length > 0).map(d => ({ text: d.dayOfWeekString, id: d.id })),
        RequirementId: `${idPrefix}-week-next-next-week`
      }
    });
  }

  return rv;
}

export function GetScheduledTimeString(graph: IConsoleGraph, upcomingDates: IUpcomingDates, prefix: string) {
  let rv: string | undefined = undefined;
  let ids: string[] = [
    upcomingDates.daysThisWeek.map(d => `${prefix}-${d.id}-time`),
    upcomingDates.daysNextWeek.map(d => `${prefix}-${d.id}-time`),
    upcomingDates.daysNextNextWeek.map(d => `${prefix}-${d.id}-time`)
  ].flat(1);

  const menuNodeId = ids.find(i => {
    const node = graph.FindNode<IConsoleGraphNodeRadioMenu>(i);
    let match = false;
    if (node) {
      if (node.state.visible && node.state.activeItem) {
        return true;
      }
    }
    return match;
  });

  if (menuNodeId) {
    const menuNode = graph.FindNode<IConsoleGraphNodeRadioMenu>(menuNodeId);
    if (menuNode && menuNode.state.activeItem) {
      const item = menuNode.entry.items.find(i => i.id === menuNode.state.activeItem);
      if (item && item.additionalData) {
        rv = item.additionalData;
      }
    }
  }
  return rv;
}

function ConsultScheduleOutput(upcomingDates: IUpcomingDates, prefix: string): EntryData {
  // let ids: string[] = [
  //   upcomingDates.daysThisWeek.map(d => `${prefix}-${d.id}-time`),
  //   upcomingDates.daysNextWeek.map(d => `${prefix}-${d.id}-time`),
  //   upcomingDates.daysNextNextWeek.map(d => `${prefix}-${d.id}-time`)
  // ].flat(1);

  // let currentReq: IRequirement | undefined = ids.length > 0 ?
  //   CreateRequirementRadioMenuActive(ids[0]) : undefined;

  // for (let i = 1; i < ids.length; ++i) {
  //   currentReq = CreateRequirementOR(
  //     CreateRequirementRadioMenuActive(ids[i]),
  //     currentReq!
  //   );
  // }

  const updateFunc = (graph: IConsoleGraph) => { 
    let rv = '';
      const selectedTime = GetScheduledTimeString(graph, upcomingDates, prefix);
      if (selectedTime) {
        rv = `You selected: ${selectedTime}`;
      }

      return rv; 
  }

  const rv: EntryData = {
    Type: ConsoleEntryType.DynamicOutput,
    Data: {
      Id: prefix,
      TextFunc: updateFunc,
      RequirementId: `${prefix}-final`
    }
  };

  return rv;
}

function TimeMenus(dates: IUpcomingDates, idPrefix: string) {
  let rv: EntryData[] = [];
  if (dates.daysThisWeek.length > 0) {
    const menus = dates.daysThisWeek.filter(d => d.times.length > 0).map(
      d => ({
        Type: ConsoleEntryType.RadioMenu,
        Data: {
          Id: `${idPrefix}-${d.id}-time`,
          Text: 'At which time? (MST)',
          Items: d.times.map(t => ({ text: t.timeString, id: t.id, additionalData: `${d.dayOfWeekString}, ${d.monthString} ${d.dayOfMonthString} @ ${t.timeString} MST`})),
          RequirementId: `${idPrefix}-thisweek-day-${d.id}`
        }
      } as EntryData));
    rv = rv.concat(menus);
  }
  if (dates.daysNextWeek.length > 0) {
    const menus = dates.daysNextWeek.filter(d => d.times.length > 0).map(
      d => ({
        Type: ConsoleEntryType.RadioMenu,
        Data: {
          Id: `${idPrefix}-${d.id}-time`,
          Text: 'At which time? (MST)',
          Items: d.times.map(t => ({ text: t.timeString, id: t.id, additionalData: `${d.dayOfWeekString}, ${d.monthString} ${d.dayOfMonthString} @ ${t.timeString} MST`})),
          RequirementId: `${idPrefix}-nextweek-day-${d.id}`
        }
      } as EntryData));
    rv = rv.concat(menus);
  }
  if (dates.daysNextNextWeek.length > 0) {
    const menus = dates.daysNextNextWeek.filter(d => d.times.length > 0).map(
      d => ({
        Type: ConsoleEntryType.RadioMenu,
        Data: {
          Id: `${idPrefix}-${d.id}-time`,
          Text: 'At which time? (MST)',
          Items: d.times.map(t => ({ text: t.timeString, id: t.id, additionalData: `${d.dayOfWeekString}, ${d.monthString} ${d.dayOfMonthString} @ ${t.timeString} MST`})),
          RequirementId: `${idPrefix}-nextnextweek-day-${d.id}`
        }
      } as EntryData));
    rv = rv.concat(menus);
  }

  return rv;
}

function WeekMenu(dates: IUpcomingDates, prefix: string, requirementId: string | undefined): EntryData {
  return {
    Type: ConsoleEntryType.RadioMenu,
    Data: {
      Id: `${prefix}-week`,
      Text: 'Which week?',
      Items: WeekMenuItems(dates),
      RequirementId: requirementId
    }
  };
}

export function CreateScheduleMenus(prefix: string, upcomingDates: IUpcomingDates, requirementId: string | undefined) {
  const rv: EntryData[] = [
    WeekMenu(upcomingDates, prefix, requirementId),
    DayMenus(upcomingDates, prefix),
    TimeMenus(upcomingDates, prefix),
    ConsultScheduleOutput(upcomingDates, prefix)
  ].flat();

  return rv;
}
