// Image / Link / Globe removed — not used in this section
import { Separator } from '@/components/ui/separator';
import ContactForm from '@/components/contact-form';
import MailLink from '@/components/ui/mail-link';

export default function ContactSection() {
    // qrCode image intentionally removed from contact section
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contact" className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl font-headline">Contactez-nous</h2>
                <p className="mt-4 text-xl text-muted-foreground">Prêt à donner vie à votre projet ?</p>
                
                <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                    <div className="flex flex-col items-center gap-4 font-body text-xl">
                        <MailLink email="studio-artyzia@gmail.com" />
                    </div>
                    {/* QR code removed here - not needed in the contact form */}
                </div>

                <div className="mt-12 w-full">
                    <ContactForm />
                </div>

                <Separator className="my-12" />

                <div className="text-sm text-muted-foreground">
                    <p>Patrick Louvel E.I.</p>
                    <p>&copy; {currentYear} Artyzia Studio. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
}
