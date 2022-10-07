import "../css/App.css";
import {useEffect, useState} from "react";
import {getAll, update} from "../services/BooksAPI";
import BookShelf from "./BookShelf";
import SearchBar from "./SearchBooks/SearchBar";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import NotFound from "./NotFound";

function App() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const shelves = ["wantToRead", "read", "currentlyReading"]

    const updateBookShelf = async (book, newShelf) => {
        setIsLoading(false);
        await update(book, newShelf);
        book.shelf = newShelf;
        setBooks([...books.filter((bk) => {
            return bk.id !== book.id;
        }), book])
        setIsLoading(true);
    }

    useEffect(async () => {
        setIsLoading(false);
        getAll().then(books => {
            setBooks(books)
            setIsLoading(true);
        });
    }, [])


    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={
                    <div className="app">
                        <div className="list-books">
                            <div className="list-books-title">
                                <h1>MyReads</h1>
                            </div>
                            {
                                shelves.map((shelf) => {
                                        return (
                                            isLoading &&
                                            <BookShelf books={books} shelves={shelves} onUpdateBook={updateBookShelf}
                                                       name={shelf} key={shelf}/>
                                        )
                                    }
                                )
                            }
                        </div>
                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>
                }></Route>
                <Route path="/search" element={
                    <SearchBar bookOnShelves={books} onUpdateBook={updateBookShelf} shelves={shelves}/>
                }></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
