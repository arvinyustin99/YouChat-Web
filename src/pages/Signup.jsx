import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../helpers/auth';

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "email"){
      setEmail(value);
    } else if (name === "password"){
      setPassword(value);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signup(email, password);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>
          Sign Up YouChat
          </h1>
        <div>
          <input placeholder="Email" name="email" type="email" onChange={handleChange} value={email} />
        </div>
        <div>
          <input placeholder="Password" name="password" onChange={handleChange} value={password} type="password" />
        </div>
        <div>
          {error ? <p>{error}</p> : null}
          <button type="submit">Sign up</button>
        </div>
        <hr></hr>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}

export default SignUp;