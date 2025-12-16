"use client"

import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function ContactForm() {
  return (
    <form
      name="contact"
      method="POST"
      action="/success"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      className="w-full max-w-2xl mx-auto grid grid-cols-1 gap-4"
    >
      {/* Netlify form support: include a hidden form-name so Netlify can detect the form at build time */}
      <input type="hidden" name="form-name" value="contact" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="name" placeholder="Votre nom" required />
        <Input name="email" type="email" placeholder="Votre email" required />
      </div>
      <Textarea name="message" placeholder="Votre message" required />

      {/* Honeypot - visually hidden field for bots (Netlify bot-field) */}
      <p style={{ display: 'none' }} aria-hidden>
        <label>
          Ne pas remplir: <input name="bot-field" />
        </label>
      </p>

      {/* Timestamp to detect too-fast submissions (optional) */}
      <input type="hidden" name="form_ts" value={String(Date.now())} />

      {/* Small note */}
      <div className="my-4 text-sm text-muted-foreground">
        Votre message sera envoyé via Netlify Forms.
      </div>

      <div className="flex flex-col items-end gap-2">
        <Button type="submit" size="lg">
          Envoyer
        </Button>
      </div>
    </form>
  );
}
