import type { NextApiRequest, NextApiResponse } from 'next';
// `fetch` is available in the Next.js server runtime; no need to import node-fetch.

// Server-side contact submit endpoint.
// - Validates hCaptcha server-side (when not bypassed)
// - Forwards to Web3Forms with a server-side access key so the client doesn't need a secret

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, message: 'Method Not Allowed' });

  // Allow bypass in non-production when NEXT_PUBLIC_SKIP_HCAPTCHA=true
  const SKIP_HCAPTCHA = process.env.NEXT_PUBLIC_SKIP_HCAPTCHA === 'true';

  const { name, email, message, hp, form_ts, 'h-captcha-response': hcaptcha } = req.body ?? {};

  // Honeypot
  if (typeof hp === 'string' && hp.trim().length > 0) {
    return res.status(400).json({ success: false, message: 'Spam detected (honeypot)' });
  }

  // Timestamp anti-bot
  if (process.env.NODE_ENV === 'production') {
    const ts = Number(form_ts ?? 0);
    if (ts && Date.now() - ts < 3000) {
      return res.status(400).json({ success: false, message: 'Submission too fast' });
    }
  }

  // Validate hCaptcha server-side unless bypassed
  if (!SKIP_HCAPTCHA) {
    const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET;
    if (!HCAPTCHA_SECRET) {
      return res.status(500).json({ success: false, message: 'HCAPTCHA_SECRET missing on server' });
    }

    if (!hcaptcha || typeof hcaptcha !== 'string') {
      return res.status(400).json({ success: false, message: 'Missing h-captcha-response' });
    }

    try {
      const params = new URLSearchParams();
      params.append('secret', HCAPTCHA_SECRET);
      params.append('response', hcaptcha);

      const verify = await fetch('https://hcaptcha.com/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      const json = await verify.json();

      if (!json.success) {
        return res.status(400).json({ success: false, message: 'Invalid hCaptcha token', details: json });
      }
    } catch (err) {
      console.error('hCaptcha verification error', err);
      return res.status(500).json({ success: false, message: 'Error verifying captcha' });
    }
  }

  // Forward to Web3Forms using a server-side access key (recommended)
  const ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY || process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!ACCESS_KEY) return res.status(500).json({ success: false, message: 'Missing Web3Forms access key on server' });

  try {
    const payload: Record<string, string> = {
      access_key: String(ACCESS_KEY),
      name: String(name ?? ''),
      email: String(email ?? ''),
      message: String(message ?? ''),
    };

    // Include the h-captcha-response if present (production path)
    if (hcaptcha) payload['h-captcha-response'] = String(hcaptcha);

    // Forward to Web3Forms
    const wfRes = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const wfJson = await wfRes.json().catch(() => ({ message: 'Failed to parse Web3Forms response' }));

    if (!wfRes.ok) {
      return res.status(wfRes.status).json({ success: false, message: 'Web3Forms error', body: wfJson });
    }

    // All good
    return res.status(200).json({ success: true, message: 'Submission forwarded to Web3Forms', body: wfJson });
  } catch (err) {
    console.error('Error forwarding to Web3Forms', err);
    return res.status(500).json({ success: false, message: 'Error forwarding to Web3Forms' });
  }
}
