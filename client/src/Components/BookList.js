import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function BookList() {
    const [bookList, setBookList] = useState([]);
    const navigate = useNavigate();
    const url = 'http://localhost:5000';

    const getBookList = async () => {
        const res = await fetch(`${url}/v1/books`, {
            method: 'GET',
            methods: {
                'Authorization': localStorage.getItem('token')
            }
        })
        return res.json();
    }

    useEffect(() => {
        getBookList()
            .then(res => {
                console.log(res);
                // setBookList()
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
            {bookList ? bookList.map(book => {
                <BookCard book={book} />
            }) : ''}
        </div>
    </div>
}

export function BookCard(book) {
    return <div className="card" style="width: 18rem;">
        <img src="" class="card-img-top" alt="book" />
        <div class="card-body">
            <h5 class="card-title">{book.title}</h5>
            <p class="card-text">{book.author}</p>
            <p class="card-text">{book.description}</p>
        </div>
    </div>
}