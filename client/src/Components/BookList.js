import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBookList } from "./apiUtils";
import bookCover from "./images/book-cover.png"


export default function BookList() {
    const [bookList, setBookList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getBookList()
            .then(res => {
                // console.log(res.books);
                setBookList(res.books);
            })
    }, [])

    return <div className="container-fluid bg-dark min-vh-100">
        <div className="container">
            <h1 className="text-center text-white">Books List</h1>
            <div className="text-end">
                <button
                    className="btn btn-warning"
                    onClick={(e) => {
                        navigate('/createbook')
                    }}
                >Add New Book</button>
            </div>
            {bookList ? bookList.map((book, index) => {
                return <BookCard book={book} />
            }) : ''}
        </div>
    </div>
}

function BookCard({book}) {
    return <div className="card border" style={{width: '300px'}}>
        <img src={bookCover} className="card-img-top" alt="book" />
        <div className="card-body">
            <h5 className="card-title my-1">{book.title}</h5>
            <p className="card-text my-1">{book.author}</p>
            <p className="card-text my-1">{book.description}</p>
        </div>
    </div>
}