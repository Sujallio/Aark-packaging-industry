import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Target, Eye, Heart, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import companyBoard from "@/assets/company-board.png";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To provide high-quality packaging solutions that help businesses protect and present their products with excellence, while maintaining competitive pricing and reliable service across Maharashtra.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To become the most trusted name in packaging materials industry, known for innovation, quality, and customer-centric approach in every product we manufacture.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "Integrity, quality, and customer satisfaction are at the core of everything we do. We believe in building long-term relationships with our clients through consistent excellence.",
  },
];

const milestones = [
  { year: "2013", event: "Company Founded" },
  { year: "2015", event: "Expanded Production Capacity" },
  { year: "2018", event: "Pan-Maharashtra Distribution" },
  { year: "2020", event: "ISO Certification Achieved" },
  { year: "2023", event: "500+ Happy Clients Milestone" },
];

const About = () => {
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
              About <span className="text-primary">AARK Packaging</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Dedicated to delivering excellence in packaging solutions since 2013
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="font-heading text-3xl md:text-4xl font-bold">
                Your Trusted <span className="text-primary">Packaging Partner</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">AARK Packaging Industries</strong> was established in 2013 with a vision to 
                  provide top-quality packaging materials to businesses across Maharashtra. Located in the 
                  industrial hub of MIDC Malegaon, Sinnar, Nashik, we have grown to become a trusted name 
                  in the packaging industry.
                </p>
                <p>
                  As a leading manufacturer and supplier of B.O.P.P. Self Adhesive Printed Tapes and all 
                  types of packaging materials, we take pride in our commitment to quality, reliability, 
                  and customer satisfaction.
                </p>
                <p>
                  Our state-of-the-art manufacturing facility, combined with a skilled workforce and 
                  stringent quality control processes, ensures that every product leaving our premises 
                  meets the highest standards of excellence.
                </p>
              </div>
              <Button size="lg" asChild>
                <Link to="/contact">
                  Contact Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src={companyBoard}
                  alt="AARK Packaging Industries Company Board"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-elevated hidden md:block">
                <p className="font-heading text-3xl font-bold">10+</p>
                <p className="text-sm opacity-90">Years of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              What Drives Us
            </h2>
            <p className="text-muted-foreground text-lg">
              Our foundation is built on strong principles and clear goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`bg-background p-8 rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 animate-fade-in-up animation-delay-${(index + 1) * 100}`}
              >
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Our Journey
            </h2>
            <p className="text-muted-foreground text-lg">
              Key milestones in our growth story
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border" />
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-center mb-8 last:mb-0 ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}>
                    <div className="inline-block bg-card p-6 rounded-xl shadow-card">
                      <p className="font-heading text-2xl font-bold text-primary">
                        {milestone.year}
                      </p>
                      <p className="text-foreground font-medium">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background" />
                  <div className="w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-primary-foreground space-y-6">
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Ready to Work Together?
            </h2>
            <p className="text-lg opacity-90">
              Let's discuss how we can meet your packaging needs with quality and reliability
            </p>
            <Button size="xl" variant="hero" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
