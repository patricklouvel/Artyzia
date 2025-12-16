export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Message envoyé !</h1>
        <p className="text-muted-foreground mb-4">
          Merci pour votre message. Nous vous répondrons bientôt.
        </p>
        <a
          href="/"
          className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}