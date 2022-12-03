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