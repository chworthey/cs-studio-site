import { IMenuItem } from "../types/IMenuItem";
import { PageLayout } from "./PageLayout";

interface IScheduleProps {
  MenuItems: IMenuItem[];
}

interface IEvent {
  Name: string;
  DateString: string;
  FromTime: string;
  UntilTime: string;
  Location: string;
  City: string;
}

const events: IEvent[] = [
  {
    Name: 'Fall Hackathon',
    DateString: 'Saturday, November 16, 2024',
    FromTime: '10:00AM MST',
    UntilTime: '10:00PM MST',
    Location: 'TBD',
    City: 'Littleton, CO'
  },
  {
    Name: 'Spring Hackathon',
    DateString: 'Saturday, April 12, 2025',
    FromTime: '10:00AM MST',
    UntilTime: '10:00PM MST',
    Location: 'TBD',
    City: 'Littleton, CO'
  }
];

export function SchedulePage(props: IScheduleProps) {
  return (
    <PageLayout MenuItems={props.MenuItems}>
      <h1>Upcoming Events</h1>
      {events.map((e, i) => <div key={i}>
        <h2>{e.Name}</h2>
        <div><b>Date:</b> {e.DateString}</div>
        <div><b>From:</b> {e.FromTime}</div>
        <div><b>To:</b> {e.UntilTime}</div>
        <div><b>Location:</b> {e.Location}</div>
        <div><b>City:</b> {e.City}</div>
      </div>)}
      <h1>Class Schedule</h1>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Time (MST)</th>
            <th>Age-Group</th>
            <th>Class Size</th>
            <th>Seat Available?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mon</td>
            <td>3:00PM</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Mon</td>
            <td>4:00PM</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Mon</td>
            <td>5:00PM</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Mon</td>
            <td>6:00PM</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Tue</td>
            <td>3:00PM</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Tue</td>
            <td>4:00PM</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Tue</td>
            <td>5:00PM</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Tue</td>
            <td>6:00PM</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Wed</td>
            <td>3:00PM</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Wed</td>
            <td>4:00PM</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Wed</td>
            <td>5:00PM</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Wed</td>
            <td>6:00PM</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Thu</td>
            <td>3:00PM</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Thu</td>
            <td>4:00PM</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Thu</td>
            <td>5:00PM</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Thu</td>
            <td>6:00PM</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Fri</td>
            <td>3:00PM</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Fri</td>
            <td>4:00PM</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Fri</td>
            <td>5:00PM</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Fri</td>
            <td>6:00PM</td>
            <td>N/A</td>
            <td>N/A</td>
            <td>Yes</td>
          </tr>
        </tbody>
      </table>
    </PageLayout>
  );
}
