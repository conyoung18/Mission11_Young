import { useNavigate} from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  return (
    <div>
      <h2>Your cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((item: CartItem) => (
              <li key={item.bookID}>
                <span>
                  {item.title}: ${item.price.toFixed(2)} x {item.quantity}
                  <strong>Subtotal:</strong> ${(item.price * item.quantity).toFixed(2)}
                </span>
                <button onClick={() => {
                  console.log('Removing item with bookID:', item.bookID); // Debugging log
                  removeFromCart(item.bookID); // Pass the bookID to removeFromCart
                }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <h3>Total: </h3>
      <button>Checkout</button>
      <button onClick={() => navigate('/books')}>Continue Browsing</button>
    </div>
  );
}

export default CartPage;
