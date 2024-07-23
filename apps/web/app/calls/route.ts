export const dynamic = 'force-dynamic'; // defaults to auto

export async function POST(request: Request) {
  const { name } = await request.json();

  const { data } = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query: `
        mutation CreateCall {
          createCall(name: "${name}") {
            id
            name
            dateCreated
          }
        }
      `,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((r) => r.json());

  const { createCall: call } = data;

  return Response.json({
    call,
  });
}

export async function GET() {
  const { data } = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query: `
        query GetCalls {
          calls {
            id
            name
            dateCreated
          }
        }
      `,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((r) => r.json());

  const { calls } = data;

  return Response.json({
    calls,
  });
}
