import Book from "./Book/Book";
import {useEffect, useState} from "react";

const BookShelf = ({books, name, onUpdateBook, shelves}) => {
    let [shelfBooks, setShelfBooks] = useState([]);
    useEffect(() => {
        const b = books.filter((book) => {
            return book.shelf === name;
        });
        setShelfBooks(b);
    }, [])
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{name.replace(/([a-z])([A-Z])/g, '$1 $2')}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {
                        shelfBooks.map((book) => (
                            <li key={book.id}>
                                <Book book={book} shelves={shelves} onUpdateShelf={onUpdateBook}/>
                            </li>
                        ))
                    }
                </ol>
            </div>
        </div>
    )
}

export default BookShelf;
