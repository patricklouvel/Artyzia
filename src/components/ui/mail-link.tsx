"use client"

import React from 'react';
import { Mail } from 'lucide-react';

interface MailLinkProps {
  email: string;
  className?: string;
}

export default function MailLink({ email, className = '' }: MailLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    // default mailto behaviour; fallback for environments where target=_blank isn't sufficient
    try {
      // Prefer a direct navigation — keeps behaviour consistent across browsers
      window.location.href = `mailto:${email}`;
    } catch (err) {
      // ignore — mail client might not be configured
    }
  };

  return (
    <a
      href={`mailto:${email}`}
      className={`flex items-center gap-3 hover:text-primary transition-colors ${className}`}
      onClick={handleClick}
      aria-label={`Envoyer un e-mail à ${email}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Mail className="h-6 w-6 text-accent" />
      <span>{email}</span>
    </a>
  );
}
