import { GetCallsQuery, Status } from 'types/graphql';

import { EndCall } from '../action/EndCall';
import { JoinCall } from '../action/JoinCall';
import { PauseCall } from '../action/PauseCall';
import { RemoveCall } from '../action/RemoveCall';
import css from './callsTable.module.css';

interface Props {
  calls: GetCallsQuery['calls'];
}

export const CallsTable = ({ calls }: Props) => {
  return (
    <table className={css.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Participants</th>
          <th>Created</th>
          <th />
        </tr>
      </thead>

      <tbody>
        {calls.map(({ id, name, status, dateCreated, participants }) => (
          <tr key={id}>
            <td>{name}</td>
            <td>{status.toString()}</td>
            <td>
              {participants?.length ? (
                <ul>
                  {participants.map((participant) => (
                    <li key={participant.id}>{participant.name}</li>
                  ))}
                </ul>
              ) : (
                <>-</>
              )}
            </td>
            <td>
              {new Date(dateCreated).toLocaleString(new Intl.Locale('nl'))}
            </td>
            <td className={css.actions}>
              <JoinCall
                callId={id}
                onError={console.error}
                isDisabled={status === Status.Completed}
              />
              <PauseCall
                callId={id}
                onError={console.error}
                isDisabled={status === Status.OnHold}
              />
              <EndCall
                callId={id}
                onError={console.error}
                isDisabled={status === Status.Completed}
              />
              <RemoveCall
                callId={id}
                onError={console.error}
                isDisabled={status !== Status.Completed}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
