import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";

const contactInfo = [
  {
    icon: MapPin,
    title: "Address",
    content: "Plot No. A-76/3/2, MIDC Malegaon, Sinnar, Dist. Nashik - 422103, Maharashtra, India",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+91 7058017626",
    link: "tel:+917058017626",
  },
  {
    icon: Mail,
    title: "Email",
    content: "aarkpackaging@gmail.com",
    link: "mailto:aarkpackaging@gmail.com",
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "Monday - Saturday: 9:00 AM - 6:00 PM",
  },
];

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-warm-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in-up">
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold">
              Contact <span className="text-primary">Us</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Get in touch for inquiries, quotes, or any questions about our products and services
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-card p-8 md:p-10 rounded-2xl shadow-card">
                <h2 className="font-heading text-2xl font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium">
                        Company Name
                      </label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your requirements..."
                      rows={5}
                    />
                  </div>
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold mb-4">Get in Touch</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We're here to help you with all your packaging needs. Reach out to us 
                  through any of the following channels, and our team will get back to 
                  you promptly.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{info.title}</h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="bg-muted rounded-xl overflow-hidden h-[250px] flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="w-10 h-10 text-primary mx-auto mb-3" />
                  <p className="font-semibold">MIDC Malegaon, Sinnar</p>
                  <p className="text-sm text-muted-foreground">Dist. Nashik, Maharashtra</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Bar */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-primary-foreground">
            <div className="text-center md:text-left">
              <h3 className="font-heading text-xl font-bold">Need Immediate Assistance?</h3>
              <p className="opacity-90">Call us directly for quick quotes and inquiries</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="hero" asChild>
                <a href="tel:+917058017626">
                  <Phone className="mr-2 w-5 h-5" />
                  +91 7058017626
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
                <a href="mailto:aarkpackaging@gmail.com">
                  <Mail className="mr-2 w-5 h-5" />
                  Email Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
