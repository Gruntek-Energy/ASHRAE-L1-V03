export const runtime = 'nodejs';

export async function GET() {
  return Response.json({
    ok: true,
    hint: 'POST directly to the Lambda Function URL from the UI.'
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return Response.json({ ok: true, echo: body });
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }
}
