import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <section id="home" className="relative h-[calc(100vh-4rem)] w-full flex items-center justify-center">
       <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/assets/background.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="absolute inset-0 bg-background/70" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 text-center md:text-left container px-4 md:px-6">
        <div className='flex-1'>
            <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl font-headline uppercase text-primary">
                Artyzia Studio
            </h1>
            <p className="mx-auto mt-6 max-w-[700px] text-2xl md:text-3xl font-body tracking-wider text-foreground">
                De l’idée au produit fini.
            </p>
            <div className="mt-8">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 transform hover:scale-105 rounded-none font-headline text-lg">
                    <Link href="#about">Découvrir</Link>
                </Button>
            </div>
        </div>
        
        <div className="flex-1 flex justify-center">
        {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              width={heroImage.width ?? 900}
              height={heroImage.height ?? 600}
              className="object-contain"
              priority
              data-ai-hint={heroImage.imageHint}
            />
        )}
        </div>
      </div>
       <div className="absolute bottom-10 animate-bounce">
            <Link href="#about" aria-label="Scroll to about section">
                <ChevronDown className="h-8 w-8 text-primary/80 hover:text-primary transition-colors" />
            </Link>
        </div>
    </section>
  );
}
