const machine = {
  initial: 'PENDING',
  states: {
    PENDING: {
      on: {
        END: 'COMPLETED',
        JOIN: 'IN_PROGRESS',
        LEAVE: 'COMPLETED',
      },
    },
    IN_PROGRESS: {
      on: {
        END: 'COMPLETED',
        JOIN: 'IN_PROGRESS',
        LEAVE: (numParticipants) =>
          numParticipants <= 1 ? 'PENDING' : 'IN_PROGRESS',
        PAUSE: (numParticipants) =>
          numParticipants > 1 ? 'ON_HOLD' : 'IN_PROGRESS',
      },
    },
    ON_HOLD: {
      on: {
        END: 'COMPLETED',
        JOIN: 'ON_HOLD',
        UNPAUSE: 'IN_PROGRESS',
      },
    },
  },
};

function transition(call, newStatus) {
  const nextState = machine.states[call.status].on[newStatus];

  if (!nextState) {
    throw new Error(
      `Not allowed to transition from '${call.status}' to '${newStatus}'`
    );
  }

  if (typeof nextState === 'function') {
    const newState = nextState(call.participants.length);

    return { ...call, status: newState };
  }

  return { ...call, status: nextState };
}

module.exports = transition;
