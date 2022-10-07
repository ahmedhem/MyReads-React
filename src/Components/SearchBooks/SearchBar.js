import {useEffect, useState} from "react";
import Book from "../Book/Book";
import {search} from "../../services/BooksAPI";
import {Link} from "react-router-dom";

const SearchBar = ({bookOnShelves, onUpdateBook, shelves}) => {

    const [curBooks, setCurBooks] = useState([]);
    const [searchVal, setSearchVal] = useState("");
    const updateResult = (e) => {
        e.preventDefault();
        setSearchVal(e.target.value);
    }

    useEffect(async () => {
        if (searchVal.length === 0) {
         setCurBooks([]);
         return;
        }
        search(searchVal, 5).then((res) => {
            if (res.books.error)
                setCurBooks([]);
            else {
                setCurBooks(res.books);
            }
        });
    }, [searchVal])
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link
                    className="close-search"
                    to="/"
                >
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onInput={updateResult}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {
                        curBooks && curBooks.map((book) => {
                            const shelf = bookOnShelves.filter((bk)=>{
                                return bk.id === book.id;
                            })
                            book.shelf = shelf.length > 0 ? shelf[0].shelf : "none";
                            console.log(book);
                            return(
                                <li key={book.id}>
                                    <Book book={book} shelves={shelves} onUpdateShelf={onUpdateBook}/>
                                </li>
                            )
                        })

                    }
                </ol>
            </div>
        </div>

    )
}
export default SearchBar;