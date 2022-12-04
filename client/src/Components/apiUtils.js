const URL = 'http://localhost:5000';

export const registerUser = async (user) => {
    const res = await fetch(`${URL}/v1/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    return res.json();
}

export const signInUser = async (user) => {
    const res = await fetch(`${URL}/v1/signin`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    return res.json();
}

export const getBookList = async () => {
    const res = await fetch(`${URL}/v1/books`, {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('token')
        }
    })
    return res.json();
}

export const addBook = async (book) => {
    const res = await fetch(`${URL}/v1/books`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token') 
        },
        body: JSON.stringify(book)
    })
    return res.json();
}
