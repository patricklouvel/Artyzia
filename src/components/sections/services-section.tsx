import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Codepen, Cpu, Printer, BrainCircuit } from 'lucide-react';

const services = [
    {
        icon: Codepen,
        title: "Développement d’applications",
        description: "Création d'applications web et mobiles sur-mesure, alliant design intuitif et performances robustes.",
    },
    {
        icon: Cpu,
        title: "Électronique & Systèmes Connectés",
        description: "Conception de circuits électroniques et d'objets connectés (IoT) pour des produits intelligents et interactifs.",
    },
    {
        icon: Printer,
        title: "Design & Fabrication 3D",
        description: "Modélisation et impression 3D pour le prototypage rapide, la création de pièces uniques et de designs complexes.",
    },
    {
        icon: BrainCircuit,
        title: "Conseil & Optimisation IA",
        description: "Intégration de l'intelligence artificielle pour automatiser, optimiser vos processus et créer des services innovants.",
    },
];

export default function ServicesSection() {
    return (
        <section id="services" className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl font-headline">Nos Compétences</h2>
                    <p className="mt-4 text-xl text-muted-foreground">Au carrefour de la créativité et de la technologie.</p>
                </div>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        
                        return (
                            <Card key={index} className="bg-card text-left border-2 rounded-none flex items-start gap-6 p-6">
                                <Icon className="w-12 h-12 text-accent flex-shrink-0 mt-1" />
                                <div>
                                    <CardTitle className="font-headline text-2xl mb-2">{service.title}</CardTitle>
                                    <p className="text-muted-foreground font-body text-lg">{service.description}</p>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
