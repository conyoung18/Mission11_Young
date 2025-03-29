import { useNavigate} from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">🛒 Your Shopping Cart</h2>

        {cart.length === 0 ? (
          <p className="text-center text-muted">Your cart is empty 🛍️</p>
        ) : (
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Title</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item: CartItem) => (
                <tr key={item.bookID}>
                  <td>{item.title}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm animate-click"
                      onClick={() => {
                        console.log('Removing item with bookID:', item.bookID);
                        removeFromCart(item.bookID);
                      }}
                    >
                      🗑️ Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Total and Buttons */}
        <div className="text-end mt-4">
          <h3 className="fw-bold text-success">
            Total: $
            {cart
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </h3>
        </div>

        <div className="d-grid gap-2 mt-3">
          <button className="btn btn-primary btn-lg shadow-sm">
            💳 Checkout
          </button>
          <button
            className="btn btn-secondary btn-lg shadow-sm"
            onClick={() => navigate('/books')}
          >
            📚 Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
