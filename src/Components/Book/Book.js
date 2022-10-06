import BookCategories from "./BookCategories";
import {useState} from "react";

const Book = ({book, shelves, onUpdateShelf}) => {
    let [curShelf, setCurShelf] = useState(book.shelf);

    const updateShelf = (e) => {
        const newShelf = e.target.value;
        setCurShelf(newShelf);
        onUpdateShelf(book, newShelf);
    }

    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage:
                            `url("${book.imageLinks.smallThumbnail}")`,
                    }}
                ></div>
                <BookCategories currentCategory={curShelf} shelves={shelves} onChangeShelf={updateShelf}/>
            </div>
            <div className="book-title">{book.title}</div>
            {book.authors && <div className="book-authors">{book.authors[0]}</div>}
        </div>
    )
}

export default Book;