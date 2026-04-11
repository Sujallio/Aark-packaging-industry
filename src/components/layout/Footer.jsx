import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-heading text-2xl font-extrabold tracking-wide">
                AARK
              </span>
              <span className="text-xs font-medium opacity-70 -mt-1 tracking-widest">
                PACKAGING INDUSTRIES
              </span>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Manufacturer and Supplier of B.O.P.P. Self Adhesive Printed Tapes 
              and all types of Packaging Materials across Maharashtra.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Products", path: "/products" },
                { name: "Services", path: "/services" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold">Our Products</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>BOPP Tapes</li>
              <li>Brown Tapes</li>
              <li>Transparent Tapes</li>
              <li>Colored Tapes</li>
              <li>Printed Tapes</li>
              <li>Packaging Materials</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-semibold">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 opacity-80" />
                <span className="text-sm opacity-80">
                  Plot No. A-76/3/2, MIDC Malegaon,<br />
                  Sinnar, Dist. Nashik - 422103
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 opacity-80" />
                <a href="tel:+917058017626" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  +91 7058017626
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 opacity-80" />
                <a href="mailto:aarkpackaging@gmail.com" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  aarkpackaging@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-60">
              © {new Date().getFullYear()} AARK Packaging Industries. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <p className="text-sm opacity-60">
                Serving Maharashtra with quality packaging solutions
              </p>
              <a
                href="http://localhost:5173/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                ERP Login →
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
