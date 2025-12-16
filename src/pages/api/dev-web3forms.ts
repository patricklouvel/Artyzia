import type { NextApiRequest, NextApiResponse } from 'next';

// Simple dev-only proxy to simulate Web3Forms so you can develop without hCaptcha
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ success: false, message: 'Dev proxy disabled in production' });
  }

  if (req.method !== 'POST') return res.status(405).end();

  // echo back some debug info and pretend success
  const body = req.body;

  // If body is URLSearchParams or FormData it might come differently; try to capture useful fields
  let payload: any = body;
  // if multipart form was used, Next may not parse it; we'll just return a friendly message

  return res.status(200).json({ success: true, message: 'Dev proxy accepted submission', payload });
}
