import React, { useState } from 'react';
import supabase from './supabaseClient';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    //Get user information from userstd table, filtering by user email address
    const { data, error } = await supabase
      .from("userstb")
      .select("*")
      .eq('email', email)
      .single();
    if (error || !data) {
      setMessage("User not found");
      return;
    }
    // Check if password from form field matches the password from table
  const isValid = await bcrypt.compare(password, data.password);
    if (isValid) {
      localStorage.setItem('userID', JSON.stringify(data.id));
      navigate('/dashboard');
    } else {
      setMessage("Incorrect password");
    }
  };
  return (
    <div>
      <h1>Login Page</h1>
      {message && <span>{ message }</span>}
      <Form onSubmit={handleLogin}>
        <Form.Label className="mt-2">Email</Form.Label>
        <Form.Control
          className="my-2"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <Form.Label className="mt-2">Password</Form.Label>
        <Form.Control
          className="my-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <div className="d-flex justify-content-between">
          <Button variant="secondary" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Login;