import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";
import { useState } from "react";

function ConfirmationPage() {
  const navigate = useNavigate();
  const { title, bookID, price } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  // function to add a book to cart
  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || 'No book found',
      price: Number(price),
      quantity: quantity, // start with a quantity of 1 when first added
    };

    console.log('Adding to cart:', newItem); // Debugging log
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <h2>Confirmation</h2>

      <div>
        <h4>Do you want to add {title} to your cart?</h4>
        <p>Total Price: ${(Number(price) * quantity).toFixed(2)}</p>{' '}
        {/* Dynamically calculate total price */}
      </div>

      <div>
        <button
          onClick={() => setQuantity(quantity - 1)}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>

      <div>
        <button onClick={handleAddToCart}>Yes</button>
        <button onClick={() => navigate(-1)}>No</button>
      </div>
    </>
  );
}
export default ConfirmationPage;