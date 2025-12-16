import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const projects = [
    {
        id: "projectFrog",
        title: "Conception techniques",
        description: "Boitiers étanches GPS, Bouchon d'essence pour bateaux, Cale de wingfoil...",
    },
    {
        id: "projectNautiflix",
        title: "Nautiflix",
        description: "Concept d'interface pour une plateforme de streaming spécialisée, avec une esthétique rétro-futuriste.",
    },
    {
        id: "projectJewelry",
        title: "Bijoux 3D",
        description: "Création de bijoux personnalisés et uniques grâce à la modélisation et à l'impression 3D de haute précision.",
    },
    {
        id: "projectGps",
        title: "Régate GPS",
        description: "Développement d'un système de suivi GPS pour les régates, permettant un suivi en direct et une analyse post-course.",
    },
];

export default function ProjectsSection() {
    return (
        <section id="projects" className="py-16 md:py-24 bg-card">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl font-headline">Nos Réalisations</h2>
                    <p className="mt-4 text-xl text-muted-foreground">Quelques exemples de ce que nous pouvons construire ensemble.</p>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    {projects.map((project) => {
                        const projectImage = PlaceHolderImages.find((img) => img.id === project.id);
                        return (
                            <Card key={project.id} className="overflow-hidden border-2 border-border transition-all duration-300 group rounded-none bg-background">
                                <CardHeader className="p-0">
                                    {projectImage && (
                                        <Image
                                            src={projectImage.imageUrl}
                                            alt={projectImage.description}
                                            width={600}
                                            height={400}
                                            // increased height for a more prominent image container
                                            className="object-cover w-full h-80 md:h-96"
                                            data-ai-hint={projectImage.imageHint}
                                        />
                                    )}
                                </CardHeader>
                                <CardContent className="p-6">
                                    <CardTitle className="font-headline text-2xl mb-2">{project.title}</CardTitle>
                                    <CardDescription className="font-body text-lg">{project.description}</CardDescription>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
