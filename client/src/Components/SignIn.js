import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import { signInUser } from './apiUtils';

export default function SignIn() {
    const [user, setUser] = useState({
        username:'',
        password:''
    })
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        signInUser(user)
            .then(res => {
                console.log(res);
                if(res.status === 'Success') {
                    localStorage.setItem('token', res.token)
                    alert(res.message);
                    navigate('/booklist');
                } else {
                    if(res.status === 'Failed') {
                        setError(res.message);
                    } else {
                        setError(res.error);
                    }
                }
            })
            .catch(err => console.log(err))
    }

    return <div className='container p-5'>
        <div className='d-grid gap-2 col-5 mx-auto mt-5 bg-secondary'>
            {/* <img/> */}
            <h1 className='text-center my-4 text-white'>Member SignIn</h1>
            <form className='d-flex flex-column align-items-center' method='POST' onSubmit={submitHandler}>
                <div className='text-start'>
                    <p className='text-warning text-start'>{error}</p>
                </div>
                <input 
                    type='email' 
                    name='email' 
                    value={user.username} 
                    placeholder='Username Ex: abc@xyz' 
                    className='form-control my-3 w-75 bg-light'
                    onChange={(e) => {
                        setUser((user) => ({
                            ...user,
                            username: e.target.value
                        }))
                    }}
                />
                <input 
                    type='text' 
                    name='password' 
                    value={user.password} 
                    placeholder='Password' 
                    className='form-control my-3 w-75 bg-light'
                    onChange={(e) => {
                        setUser((user) => ({
                            ...user,
                            password: e.target.value
                        }))
                    }}
                />
                <div className="d-grid gap-2 col-6 mx-auto">
                    <button 
                        type='submit' 
                        className='btn btn-primary my-3'
                    >SIGNIN</button>
                </div>
                <Link to='/register' className='text-decoration-none'>
                <h5 className='text-center my-3 text-light'>REGISTER</h5>
                </Link>
            </form>
        </div>
    </div>
}