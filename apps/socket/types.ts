export enum SocketMessageCause {
  START = 'call:start',
  END = 'call:end',
  REMOVE = 'call:remove',
  PAUSE = 'call:pause',
  JOIN = 'call:join',
  LEAVE = 'call:leave',
  UNPAUSE = 'call:unpause',
}

export enum SocketMessageEffect {
  STARTED = 'call:started',
  ENDED = 'call:ended',
  REMOVED = 'call:removed',
  PAUSED = 'call:paused',
  JOINED = 'call:joined',
  LEFT = 'call:left',
  UNPAUSED = 'call:unpaused',
}

export enum ClientEvents {
  MUTATE = 'mutate',
  CLOSE = 'close',
  ERROR = 'error',
  DISCONNECT = 'disconnect',
}

export type ServerToClientEvents = {
  [key in SocketMessageEffect]: (call: any) => void;
};

export interface ClientToServerEvents {
  [ClientEvents.MUTATE]: (message: SocketMessageCause, call: any) => void;
  [ClientEvents.CLOSE]: () => void;
  [ClientEvents.ERROR]: (err: Error) => void;
  [ClientEvents.DISCONNECT]: (reason: string) => void;
}
