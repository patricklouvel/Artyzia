# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.
## Development: Contact form / Web3Forms bypass 🧪

If you want to develop the contact form locally without configuring hCaptcha or a Web3Forms server-side secret, there's a convenient dev bypass.

- Set NEXT_PUBLIC_SKIP_HCAPTCHA=true in your `.env.local` to enable the bypass.
- When enabled, the contact form will POST to the local API route `/api/dev-web3forms` which returns a fake success payload helpful for local testing.

This keeps spam countermeasures (honeypot and timestamp) in place while avoiding external captcha verification during development.

## Production / Server setup

The contact form now posts to a local server endpoint `/api/submit-contact` which validates the hCaptcha token server-side
and forwards the submission to Web3Forms using a server-side access key.

- Set `WEB3FORMS_ACCESS_KEY` (server-only) with your Web3Forms access key.
- Set `HCAPTCHA_SECRET` (server-only) with your hCaptcha secret so the server can validate tokens.

In development you can still bypass captcha by setting `NEXT_PUBLIC_SKIP_HCAPTCHA=true`. The dev-proxy `/api/dev-web3forms` remains available
for convenience but the preferred flow is `/api/submit-contact` which performs server-side validation.

If you want the client to render the actual hCaptcha widget, install the client package:

```bash
npm i @hcaptcha/react-hcaptcha
```

Then restart your dev server; the widget is loaded dynamically only when the package is available.

### Simple direct email (new)

If you prefer a plain contact form that just sends email to an inbox, the project includes `/api/send-email`.

- To enable real emails in production set SMTP environment variables: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` and `CONTACT_EMAIL` (recipient).
- In development, when SMTP is not configured, submissions will be saved to `.tmp/emails.json` so you can inspect them.

