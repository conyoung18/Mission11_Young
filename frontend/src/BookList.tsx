import { useEffect, useState } from "react";
import { Book } from "./types/Book";

function BookList() {
    
    const [books, setBooks]= useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(`http://localhost:4000/Book`);
            const data = await response.json();
            setBooks(data);
        };

        fetchBooks();
    }, [])
    
    return (
      <>
        <h1>List of Books</h1>
        <br />
        {books.map((b) => (
          <div id="bookCard">
            <h3>{b.title}</h3>

            <ul>
                <li><strong>Author:</strong> {b.author}</li>
                <li><strong>Publisher:</strong> {b.publisher}</li> 
                <li><strong>ISBN:</strong> {b.isbn}</li>
                <li><strong>Classification: </strong> {b.classification}</li>
                <li><strong>Category: </strong> {b.category}</li>
                <li><strong>Number of Pages:</strong> {b.pageCount}</li>
                <li><strong>Price:</strong> {b.price}</li>
            </ul>
          </div>
        ))}
      </>
    );
}

export default BookList;