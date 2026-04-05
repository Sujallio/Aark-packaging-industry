import { Plus, Minus, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const WHATSAPP_NUMBER = "917058017626"; // AARK's phone number

const ProductCard = ({ id, title, description, features, icon, image }) => {
  const { items, addItem, updateQuantity, generateWhatsAppLink } = useCart();
  const cartItem = items.find((item) => item.id === id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => addItem(id, title);
  const handleIncrement = () => updateQuantity(id, quantity + 1);
  const handleDecrement = () => updateQuantity(id, quantity - 1);
  
  const whatsappLink = generateWhatsAppLink(WHATSAPP_NUMBER);

  return (
    <div className={`bg-card rounded-xl shadow-card hover:shadow-elevated transition-all duration-300 border overflow-hidden flex flex-col ${quantity > 0 ? 'border-primary ring-2 ring-primary/20' : 'border-border'}`}>
      {/* Product Image */}
      {image && (
        <div className="w-full h-48 bg-secondary/50 flex items-center justify-center overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-4">
          {!image && (
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              {icon}
            </div>
          )}
          {quantity > 0 && (
            <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full ml-auto">
              <Check className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary">Added</span>
            </div>
          )}
        </div>
      
        <h3 className="font-heading text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{description}</p>
        
        <ul className="space-y-1.5 mb-6">
          {features.map((feature) => (
            <li key={feature} className="text-xs flex items-center gap-2 text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {feature}
            </li>
          ))}
        </ul>

        {quantity === 0 ? (
          <Button onClick={handleAdd} className="w-full mt-auto" variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add to Enquiry
          </Button>
        ) : (
          <div className="space-y-3 mt-auto">
            <div className="flex items-center gap-3">
              <Button
                onClick={handleDecrement}
                size="icon"
                variant="outline"
                className="h-10 w-10"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <div className="flex-1 text-center">
                <span className="font-semibold text-lg">{quantity}</span>
                <span className="text-muted-foreground text-sm ml-1">units</span>
              </div>
              <Button
                onClick={handleIncrement}
                size="icon"
                variant="outline"
                className="h-10 w-10"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <Button 
              asChild 
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                Continue on WhatsApp
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
