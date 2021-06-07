import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signin, signinGoogle } from '../helpers/auth';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "email") {
      setEmail(value);
    }
    else if (name === "password") {
      setPassword(value);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signin(email, password);
    } catch (error) {
      setError(error.message);
    }
  }

  const googleSignIn = async () => {
    try {
      await signinGoogle();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <h1>
            Sign In YouChat
          </h1>
          <div>
            <input placeholder="Email" name="email" onChange={handleChange} type="email" value={email} />
          </div>
          <div>
            <input placeholder="Password" name="password" onChange={handleChange} value={password} type="password" />
          </div>
          <div>
            {error ? <p>{error}</p> : null}
            <button type="submit">Sign In</button>
          </div>
          <hr></hr>
          <button onClick={googleSignIn} type="button">Sign Up with Google</button>
          <p>New user? <Link to="/signup" replace={true}><a href="/#">Sign Up</a></Link></p>
        </form>
      </div>
    </>
  );

}

export default Login;