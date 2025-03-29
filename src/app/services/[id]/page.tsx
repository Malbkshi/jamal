import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServices, Service } from "@/lib/services";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, CreditCard, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ServicePageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const services = await getServices();
  const service = services.find((s: Service) => s.id === params.id);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: `${service.title} - Manal Al Jamal Beauty Center`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const services = await getServices();
  const service = services.find((s) => s.id === params.id);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] w-full">
          <Image
            src={service.image_url || "/images/services/cleaning.png"}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                {service.title}
              </h1>
              <p className="mx-auto max-w-2xl text-lg md:text-xl">
                {service.description}
              </p>
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Main Content */}
            <div className="md:col-span-2">
              <div className="prose max-w-none">
                <h2 className="text-3xl font-bold">About This Service</h2>
                <p className="text-lg text-gray-600">{service.long_description}</p>

                <h3 className="mt-8 text-2xl font-bold">Features</h3>
                <ul className="mt-4 space-y-2">
                  {service.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <Star className="mr-2 h-5 w-5 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Booking Card */}
            <div className="rounded-lg border bg-white p-6 shadow-lg">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-primary">
                  {service.price} ريال
                </h3>
                <p className="text-gray-600">per session</p>
              </div>

              <div className="mb-6 space-y-4">
                <div className="flex items-center text-gray-600">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  <span>{service.duration} minutes per session</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  <span>Flexible scheduling</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <CreditCard className="mr-2 h-5 w-5 text-primary" />
                  <span>Secure payment options</span>
                </div>
              </div>

              <Link href={`/booking?serviceId=${service.id}`}>
                <Button
                  className="w-full"
                  size="lg"
                >
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-3xl font-bold">
              Related Services
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {services
                .filter(
                  (s: Service) =>
                    s.id !== service.id && s.category === service.category
                )
                .slice(0, 3)
                .map((relatedService: Service) => (
                  <div
                    key={relatedService.id}
                    className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
                  >
                    <div className="relative h-48">
                      <Image
                        src={relatedService.image_url || "/images/services/cleaning.png"}
                        alt={relatedService.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="mb-2 text-xl font-bold">
                        {relatedService.title}
                      </h3>
                      <p className="text-gray-600">
                        {relatedService.description}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 