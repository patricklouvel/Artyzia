import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutSection() {
    const aboutImage = PlaceHolderImages.find((img) => img.id === 'about');

    return (
        <section id="about" className="py-16 md:py-24 bg-card">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl font-headline">
                            À Propos
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-foreground">
                            Artyzia Studio est un atelier créatif où la technologie rencontre l'artisanat. Nous transformons vos idées en produits tangibles et innovants, en combinant développement d'applications, électronique, fabrication 3D et expertise en IA. Notre passion pour l'esthétique néo-rétro et les technologies de pointe nous guide dans chaque projet.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        {aboutImage && (
                            <Image
                                src={aboutImage.imageUrl}
                                alt={aboutImage.description}
                                width={500}
                                height={500}
                                className="object-contain"
                                data-ai-hint={aboutImage.imageHint}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
