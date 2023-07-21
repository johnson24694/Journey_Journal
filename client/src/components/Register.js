import React, {useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    }) 

    const changeHandler = (e) => {
        setUser({...user, [e.target.name]:e.target.value})
    };

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', user, {withCredentials:true})
            .then((res) => {
                console.log(res);
                navigate('/')
            })
            .catch ((err) => {
                console.log(err, "this isn't working");
                console.log(err.response.data.error.errors)
                setErrors(err.response.data.error.errors)
                
            });
    };

return (
    <div>
        <h2>Register</h2>
        <form onSubmit={submitHandler}>
            <div>
                <label className='form-label'>Name:</label>
                <input className='form-control' type="text" onChange={changeHandler} value={user.name} name="name"/>
                {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div>
                <label className='form-label'>Email:</label>
                <input className='form-control' type="email" onChange={changeHandler} value={user.email} name="email" />
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
                <label className='form-label'>Password:</label>
                <input className='form-control' type="password" onChange={changeHandler} value={user.password} name="password" />
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div>
                <label className='form-label'>Confirm Password:</label>
                <input className='form-control' type="password" onChange={changeHandler} value={user.confirmPassword} name="confirmPassword"/>
                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            </div>
            <br/>
            <button>Register</button>
        </form>
        <br/>
    </div>
  )
}

export default Register