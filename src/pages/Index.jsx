import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Package, Truck, Award, Users, ArrowRight, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import companyBuilding from "@/assets/company-building.png";
import tapeVariety from "@/assets/tape-variety.jpeg";

const features = [
  {
    icon: Package,
    title: "Wide Product Range",
    description: "BOPP tapes, printed tapes, colored tapes and all packaging materials",
  },
  {
    icon: Truck,
    title: "Pan Maharashtra Delivery",
    description: "Reliable supply chain across all districts of Maharashtra",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "ISO certified manufacturing with strict quality controls",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Dedicated support and customized packaging solutions",
  },
];

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Happy Clients" },
  { value: "50+", label: "Product Varieties" },
  { value: "100%", label: "Quality Assured" },
];

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
        </div>
        
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-primary-foreground space-y-8 animate-fade-in-up">
              <div className="inline-block px-4 py-2 bg-primary-foreground/10 rounded-full text-sm font-medium backdrop-blur-sm">
                Trusted Packaging Partner Since 2013
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold leading-tight">
                Quality Packaging <br />
                <span className="text-gold">Solutions</span> for <br />
                Every Business
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-xl leading-relaxed">
                AARK Packaging Industries is a leading manufacturer and supplier of 
                B.O.P.P. Self Adhesive Printed Tapes and all types of packaging 
                materials across Maharashtra.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="xl" variant="hero" asChild>
                  <Link to="/products">
                    Explore Products
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="xl" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
                  <Link to="/contact">Get a Quote</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative animate-fade-in animation-delay-200">
              <div className="relative rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src={companyBuilding}
                  alt="AARK Packaging Industries Manufacturing Facility"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-elevated hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-lg">ISO Certified</p>
                    <p className="text-sm text-muted-foreground">Quality Assured</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className={`text-center animate-fade-in-up animation-delay-${(index + 1) * 100}`}>
                <p className="font-heading text-4xl md:text-5xl font-extrabold text-primary">
                  {stat.value}
                </p>
                <p className="text-muted-foreground mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-warm-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Why Choose AARK Packaging?
            </h2>
            <p className="text-muted-foreground text-lg">
              We deliver excellence in every roll of tape and packaging solution
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`bg-card p-8 rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-fade-in-up animation-delay-${(index + 1) * 100}`}
              >
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src={tapeVariety}
                  alt="AARK Packaging - Wide variety of BOPP tapes"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="font-heading text-3xl md:text-4xl font-bold">
                Complete Range of <span className="text-primary">Packaging Solutions</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                From transparent BOPP tapes to custom printed solutions, we manufacture 
                and supply the complete range of packaging tapes to meet every business need.
              </p>
              
              <ul className="space-y-4">
                {[
                  "BOPP Self Adhesive Tapes",
                  "Brown & Transparent Tapes",
                  "Colored Tapes (Yellow, Blue, Red, Green)",
                  "Custom Printed Tapes",
                  "Industrial Packaging Materials",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button size="lg" asChild>
                <Link to="/products">
                  View All Products
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-primary-foreground space-y-6">
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Ready to Partner with Us?
            </h2>
            <p className="text-lg opacity-90">
              Get competitive pricing and reliable supply of quality packaging materials 
              for your business. Contact us today for a free quote!
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="xl" variant="hero" asChild>
                <Link to="/contact">
                  Request a Quote
                </Link>
              </Button>
              <Button size="xl" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
                <a href="tel:+917058017626">
                  Call Now: +91 7058017626
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
