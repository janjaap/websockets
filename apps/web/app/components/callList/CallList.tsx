import { StartCall } from "../startCall/StartCall";

const callPoints = [
  {
    name: 'Call #1',
    participants: [],
  },
  {
    name: 'Call #2',
    participants: [],
  },
  {
    name: 'Call #3',
    participants: [],
  },
  {
    name: 'Call #4',
    participants: [],
  },
];

export const CallList = () => {
  return (
    <div>
      <h2>Call List</h2>

      <ul>
        {callPoints.map((callPoint) => (
          <li key={callPoint.name}>{callPoint.name} <StartCall name={callPoint.name} /></li>
        ))}
      </ul>
    </div>
  )
}
