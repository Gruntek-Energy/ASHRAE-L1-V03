// lib/api.ts
export type ApiResponse = {
  ok: boolean;
  analysis?: string;
  metrics?: any;
  error?: string;
  status?: number;
};

export async function runAnalysis(input: {
  sessionId: string;
  customerData: any;
  files: string[];
}): Promise<ApiResponse> {
  const base = process.env.NEXT_PUBLIC_LAMBDA_URL || '';
  if (!base) return { ok: false, error: 'NEXT_PUBLIC_LAMBDA_URL missing', status: 500 };

  const res = await fetch(base, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  });

  // Lambda returns {statusCode, body} only when *invoked via AWS SDK*.  
  // With Function URL, it returns plain JSON. So handle both:
  const txt = await res.text();
  try {
    // try direct JSON
    const json = JSON.parse(txt);
    // if it looks like the plain Lambda response, just return it
    if (json && typeof json === 'object' && 'ok' in json) {
      return json as ApiResponse;
    }
    // if it looks like { statusCode, body: "<json string>" }
    if (json && 'statusCode' in json && 'body' in json) {
      const inner = JSON.parse(json.body);
      return inner;
    }
    return { ok: false, status: res.status, error: 'Unexpected upstream shape' };
  } catch {
    return { ok: false, status: res.status, error: txt || 'Non‑JSON upstream' };
  }
}