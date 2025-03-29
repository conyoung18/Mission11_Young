// Each individual book
export interface CartItem {
  bookID: number;
  title: string;
  price: number;
  quantity: number; // number of books ordered
}