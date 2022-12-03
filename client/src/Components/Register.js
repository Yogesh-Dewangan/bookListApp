import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import { registerUser } from './apiUtils';

export default function Register() {
    const [user, setUser] = useState({
        username:'',
        password:'',
        cpassword:''
    })
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        registerUser(user)
            .then(res => {
                console.log(res);
                // navigate('/'); 
            })
            .catch(err => console.log(err))
    }

    return <div className='container p-5'>
        <div className='d-grid gap-2 col-5 mx-auto mt-5 bg-secondary'>
            <img/>
            <h1 className='text-center my-4 text-white'>Register</h1>
            <form className='d-flex flex-column align-items-center' method='POST' onSubmit={submitHandler}>
                <input 
                    type='email' 
                    name='username' 
                    value={user.username} 
                    placeholder='Username' 
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
                <input 
                    type='text' 
                    name='cpassword' 
                    value={user.cpassword} 
                    placeholder='Confirm Password' 
                    className='form-control my-3 w-75 bg-light'
                    onChange={(e) => {
                        setUser((user) => ({
                            ...user,
                            cpassword: e.target.value
                        }))
                    }}
                />
                <div className="d-grid gap-2 col-6 mx-auto">
                    <button 
                        type='submit' 
                        className='btn btn-primary my-3'
                    >REGISTER</button>
                </div>
                <Link to='/' className='text-decoration-none'>
                <h5 className='text-center my-3 text-light'>LOGIN</h5>
                </Link>
            </form>
        </div>
    </div>
}