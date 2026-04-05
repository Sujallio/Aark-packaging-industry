import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import tapeVariety from "@/assets/tape-variety.jpeg";

// Import product images
import transparentTape from "@/assets/bopp-transparent-tape.png";
import brownTape from "@/assets/bopp-brown-tape.png";
import colouredTapes from "@/assets/bopp-coloured-tapes.png";
import printedTapes from "@/assets/bopp-printed-tapes.png";
import jumboRolls from "@/assets/bopp-jumbo-rolls.png";
import stretchFilm from "@/assets/stretch-film.png";
import strappingRolls from "@/assets/strapping-rolls.png";

const productCategories = [
  {
    id: "transparent-bopp",
    title: "Transparent BOPP Tapes",
    description: "Crystal clear tapes ideal for clean packaging and labeling applications.",
    features: ["Premium clarity", "Strong bond", "Professional finish"],
    image: transparentTape,
  },
  {
    id: "brown-bopp",
    title: "Brown BOPP Tapes",
    description: "Industrial-grade brown tapes perfect for carton sealing and heavy-duty packaging needs.",
    features: ["High adhesive strength", "Moisture resistant", "Available in multiple widths"],
    image: brownTape,
  },
  {
    id: "colored-bopp",
    title: "Colored BOPP Tapes",
    description: "Vibrant colored tapes for coding, identification, and decorative purposes.",
    features: ["Yellow, Blue, Red, Green options", "Bright colors", "Easy identification"],
    image: colouredTapes,
  },
  {
    id: "printed-bopp",
    title: "Printed BOPP Tapes",
    description: "Custom printed tapes with your brand logo for enhanced branding and security.",
    features: ["Custom designs", "Brand promotion", "Tamper evidence"],
    image: printedTapes,
  },
  {
    id: "jumbo-rolls",
    title: "BOPP Jumbo Rolls",
    description: "Large format jumbo rolls for high-volume packaging operations and conversions.",
    features: ["Bulk quantities", "Cost-effective", "Industrial grade"],
    image: jumboRolls,
  },
  {
    id: "stretch-film",
    title: "Stretch Film",
    description: "Protective stretch wrap for bundling and securing items during storage and transport.",
    features: ["Superior cling", "Puncture resistant", "Multiple thicknesses"],
    image: stretchFilm,
  },
  {
    id: "strapping-rolls",
    title: "Strapping Rolls",
    description: "Heavy-duty strapping rolls for securing heavy packages and pallets.",
    features: ["High tensile strength", "Durable", "Professional bundling"],
    image: strappingRolls,
  },
];

const Products = () => {
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
              Our <span className="text-primary">Products</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Select products and quantities, then continue to WhatsApp for quick enquiry
            </p>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={tapeVariety}
                alt="AARK Packaging - Wide variety of BOPP tapes and packaging materials"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
            </div>
            
            <div className="space-y-6">
              <h2 className="font-heading text-3xl md:text-4xl font-bold">
                Quality <span className="text-primary">Packaging Materials</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                At AARK Packaging Industries, we manufacture a comprehensive range of BOPP 
                (Biaxially Oriented Polypropylene) self-adhesive tapes and packaging materials. 
                Our products are designed to meet the diverse needs of businesses across various industries.
              </p>
              <div className="bg-secondary/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">How to order:</strong> Select products below, 
                  adjust quantities, and click "Continue on WhatsApp" to send your enquiry directly to us.
                </p>
              </div>
            </div>
          </div>

          {/* Product Categories Grid */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Select Products
            </h2>
            <p className="text-muted-foreground text-lg">
              Click to add products to your enquiry list
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                features={product.features}
                image={product.image}
                icon={<Package className="w-6 h-6 text-primary" />}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-primary-foreground space-y-6">
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Need Custom Products?
            </h2>
            <p className="text-lg opacity-90">
              We offer customization options for tape width, length, color, and printing. 
              Get in touch to discuss your specific requirements.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button size="xl" variant="hero" asChild>
                <Link to="/contact">Request Custom Quote</Link>
              </Button>
              <Button size="xl" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
                <a href="tel:+917058017626">Call: +91 7058017626</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
