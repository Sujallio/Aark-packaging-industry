import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md shadow-soft">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="font-heading text-2xl font-extrabold text-primary tracking-wide">
                AARK
              </span>
              <span className="text-xs font-medium text-muted-foreground -mt-1 tracking-widest">
                PACKAGING
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium text-sm transition-colors duration-200 hover:text-primary ${
                  location.pathname === link.path
                    ? "text-primary font-semibold"
                    : "text-foreground/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+917058017626" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              +91 7058017626
            </a>
            <a
              href="https://aark-packaging-industry-erp.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium px-3 py-2 text-primary border border-primary rounded hover:bg-primary/10 transition-colors"
            >
              ERP Login
            </a>
            <Button asChild>
              <Link to="/contact">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-medium py-2 transition-colors duration-200 hover:text-primary ${
                    location.pathname === link.path
                      ? "text-primary font-semibold"
                      : "text-foreground/80"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a href="tel:+917058017626" className="flex items-center gap-2 text-muted-foreground py-2">
                <Phone className="w-4 h-4" />
                +91 7058017626
              </a>
              <a
                href="https://aark-packaging-industry-erp.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium px-3 py-2 text-primary border border-primary rounded hover:bg-primary/10 transition-colors block text-center"
              >
                ERP Login
              </a>
              <Button asChild className="mt-2">
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  Get Quote
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
