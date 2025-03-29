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
      <div className="container mt-5">
        <WelcomeBand />
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card shadow-lg p-4 text-center">
              <h2 className="mb-4">Confirm Your Selection</h2>

              <h4 className="fw-bold">{title}</h4>
              <p className="text-muted">
                Are you sure you want to add this book to your cart?
              </p>

              <p className="fs-5 fw-bold text-success">
                Total Price: ${(Number(price) * quantity).toFixed(2)}
              </p>

              {/* Quantity Controls */}
              <div className="d-flex justify-content-center align-items-center mb-3">
                <button
                  className="btn btn-outline-secondary btn-sm mx-2"
                  onClick={() => setQuantity(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  ➖
                </button>
                <span className="fs-4 fw-bold px-3">{quantity}</span>
                <button
                  className="btn btn-outline-secondary btn-sm mx-2"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  ➕
                </button>
              </div>

              {/* Buttons */}
              <div className="d-grid gap-2">
                <button
                  className="btn btn-success btn-lg shadow-sm"
                  onClick={handleAddToCart}
                >
                  ✅ Yes, Add to Cart
                </button>
                <button
                  className="btn btn-danger btn-lg shadow-sm"
                  onClick={() => navigate(-1)}
                >
                 No, Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ConfirmationPage;