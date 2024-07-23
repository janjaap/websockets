import { NextApiRequest } from 'next';

export const dynamic = 'force-dynamic';

export async function DELETE(
  request: NextApiRequest,
  { params }: { params: { id: string } }
) {
  // const url = new URL(request.url);
  const { id } = params;
  console.log({ id });

  return Response.json({});
}
