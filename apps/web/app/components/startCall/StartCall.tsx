'use client';

import { startCall } from "app/lib/startCall";

interface Props {
  name: string;
}

export function StartCall({ name }: Props) {
  async function onClick() {
    await startCall(name);
  }

  return (
    <button type="button" onClick={onClick}>Start call</button>
  );
}
