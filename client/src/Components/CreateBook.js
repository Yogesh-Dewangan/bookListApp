import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addBook } from './apiUtils';

export default function CreateBook() {
    const [book, setBook] = useState({
        title: '',
        ISBN: '',
        author: '',
        description: '',
        published_date: '',
        publisher: ''
    })
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        addBook(book)
            .then(res => {
                console.log(res);
                navigate('/booklist');
            })
            .catch(err => console.log(err))
    }

    return <div className='container-fluid p-5 bg-dark'>
        <div className='d-grid col-6 mx-auto mt-5 bg-dark'>
            <div className='w-100 my-1 mx-5'>
                <button 
                type="button" 
                className="btn btn-outline-warning w-25 mx-5"
                onClick={(e) => {
                    navigate('/booklist')
                }}
                >Show Book List</button>
            </div>
            <h1 className='text-center my-3 text-white'>Add Book</h1>
            <h5 className='text-center my-1 text-white'>Create new book</h5>
            <form className='d-flex flex-column align-items-center' method='POST' onSubmit={submitHandler}>
                <input
                    type='text'
                    name='title'
                    value={book.title}
                    placeholder='Title of the book'
                    className='form-control my-2 mb-4 w-75 bg-light'
                    onChange={(e) => {
                        setBook((book) => ({
                            ...book,
                            title: e.target.value
                        }))
                    }}
                />
                <input
                    type='text'
                    name='ISBN'
                    value={book.ISBN}
                    placeholder='ISBN'
                    className='form-control my-2 w-75 bg-light'
                    onChange={(e) => {
                        setBook((book) => ({
                            ...book,
                            ISBN: e.target.value
                        }))
                    }}
                />
                <input
                    type='text'
                    name='author'
                    value={book.author}
                    placeholder='Author'
                    className='form-control my-2 w-75 bg-light'
                    onChange={(e) => {
                        setBook((book) => ({
                            ...book,
                            author: e.target.value
                        }))
                    }}
                />
                <input
                    type='text'
                    name='description'
                    value={book.description}
                    placeholder='Describe this book'
                    className='form-control my-2 w-75 bg-light'
                    onChange={(e) => {
                        setBook((book) => ({
                            ...book,
                            description: e.target.value
                        }))
                    }}
                />
                <input
                    type='text'
                    name='published_date'
                    value={book.published_date}
                    placeholder='Published Date'
                    className='form-control my-2 w-75 bg-light'
                    onChange={(e) => {
                        setBook((book) => ({
                            ...book,
                            published_date: e.target.value
                        }))
                    }}
                />
                <input
                    type='text'
                    name='publisher'
                    value={book.publisher}
                    placeholder='Publisher of this Book'
                    className='form-control my-2 w-75 bg-light'
                    onChange={(e) => {
                        setBook((book) => ({
                            ...book,
                            publisher: e.target.value
                        }))
                    }}
                />
                <div className="w-75">
                    <button
                        type='submit'
                        className='btn btn-outline-warning my-3 w-100'
                    >REGISTER</button>
                </div>
                <Link to='/' className='text-decoration-none'>
                    <h5 className='text-center my-3 text-light'>LOGIN</h5>
                </Link>
            </form>
        </div>
    </div>
}