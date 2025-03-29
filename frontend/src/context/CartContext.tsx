import { createContext, ReactNode, useContext, useState } from 'react';
import { CartItem } from '../types/CartItem';

// set up actions for cart
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (bookID: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined); // create the context

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((c) => c.bookID === item.bookID);
      const updatedCart = prevCart.map(
        (c) =>
          c.bookID === item.bookID
            ? { ...c, price: c.price + item.price, quantity: c.quantity + 1 }
            : c // check to see if item exists in the cart already
        // if so, add the price and 1 to the quanitity to reflect new total
      );

      return existingItem ? updatedCart : [...prevCart, item]; // add item to cart
    });
  };

  const removeFromCart = (bookID: number) => {
    setCart((prevCart) => prevCart.filter((c) => c.bookID !== bookID)); // filter out any item in the current cart whose id is not in the previous cart
  };

  const clearCart = () => {
    // set cart to an empty array
    setCart(() => []);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  // export useCart so the user can use it in BooksPage.tsx
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider'); // error handling
  }
  return context;
};