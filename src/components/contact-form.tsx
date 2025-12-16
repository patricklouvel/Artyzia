"use client"

"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function ContactForm() {
  const router = useRouter();

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Post to the static helper so Netlify detects fields at deploy-time
    try {
      const body = new URLSearchParams();
      for (const [k, v] of formData.entries()) {
        body.append(k, String(v));
      }

      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      router.push('/success');
    } catch (err) {
      // Fallback: show a basic error; you can replace with better UI
      console.error('Form submission failed', err);
      alert('Une erreur est survenue lors de l’envoi du message. Réessaie plus tard.');
    }
  };

  return (
    <form
      name="contact"
      onSubmit={handleFormSubmit}
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
