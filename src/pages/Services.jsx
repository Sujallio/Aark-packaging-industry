import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Factory, Truck, Palette, Wrench, ArrowRight, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import warehouseTapes from "@/assets/warehouse-tapes.jpeg";
import brandedBoxes from "@/assets/branded-boxes.jpeg";
import shippingPackages from "@/assets/shipping-packages.jpeg";

const services = [
  {
    icon: Factory,
    title: "Manufacturing",
    description:
      "State-of-the-art manufacturing facility producing high-quality BOPP tapes and packaging materials with strict quality control at every stage.",
    image: warehouseTapes,
    features: [
      "Modern production machinery",
      "Consistent quality output",
      "High volume capacity",
      "Quick turnaround times",
    ],
  },
  {
    icon: Palette,
    title: "Custom Printing",
    description:
      "Personalized tape printing services with your company logo, brand name, or custom designs for enhanced brand visibility and security.",
    image: brandedBoxes,
    features: [
      "Full color printing",
      "Custom logo placement",
      "Brand messaging options",
      "Security printing available",
    ],
  },
  {
    icon: Truck,
    title: "Pan-Maharashtra Delivery",
    description:
      "Reliable distribution network ensuring timely delivery of packaging materials across all districts of Maharashtra.",
    image: shippingPackages,
    features: [
      "All Maharashtra districts covered",
      "Bulk order handling",
      "Timely deliveries",
      "Safe packaging for transit",
    ],
  },
];

const additionalServices = [
  {
    icon: Wrench,
    title: "Bulk Orders",
    description: "Competitive pricing for large volume orders with dedicated account management.",
  },
  {
    icon: CheckCircle,
    title: "Quality Assurance",
    description: "Every product undergoes rigorous testing to ensure consistent adhesive strength and durability.",
  },
  {
    icon: Factory,
    title: "Custom Specifications",
    description: "Tapes manufactured to your exact specifications - width, length, color, and adhesive type.",
  },
];

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-warm-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in-up">
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Comprehensive packaging solutions from manufacturing to delivery
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="rounded-2xl overflow-hidden shadow-elevated">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-[350px] md:h-[400px] object-cover"
                    />
                  </div>
                </div>

                <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                      <service.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h2 className="font-heading text-3xl font-bold">{service.title}</h2>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button size="lg" asChild>
                    <Link to="/contact">
                      Learn More
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Additional Services
            </h2>
            <p className="text-muted-foreground text-lg">
              We go beyond just products to provide complete solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <div
                key={service.title}
                className={`bg-background p-8 rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in-up animation-delay-${(index + 1) * 100}`}
              >
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              How We Work
            </h2>
            <p className="text-muted-foreground text-lg">
              Simple process to get your packaging needs fulfilled
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Inquiry", desc: "Share your requirements" },
              { step: "02", title: "Quotation", desc: "Receive competitive pricing" },
              { step: "03", title: "Production", desc: "Quality manufacturing" },
              { step: "04", title: "Delivery", desc: "Timely dispatch" },
            ].map((item, index) => (
              <div key={item.step} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-heading text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-heading text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="w-5 h-5 text-border" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-primary-foreground space-y-6">
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Let's Discuss Your Requirements
            </h2>
            <p className="text-lg opacity-90">
              Contact us today for customized packaging solutions tailored to your business needs
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="xl" variant="hero" asChild>
                <Link to="/contact">Get Started</Link>
              </Button>
              <Button size="xl" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
                <a href="mailto:aarkpackaging@gmail.com">Email Us</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
