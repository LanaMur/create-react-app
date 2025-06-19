import { useState } from 'react';
import supabase from './supabaseClient';
import { Button, Form } from 'react-bootstrap';
import bcrypt from 'bcryptjs';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      //Incript the user password before storing in database
      const hashedPassword = await bcrypt.hash(password, 10);
      //Insert data to database
      const { data, error } = await supabase
        .from('userstb')
        .insert([
          {
            email,
            password: hashedPassword,
          },
        ]);

      if (error) {
        console.error('Error inserting user:', error.message);
      } else {
        console.log('User registered successfully:', data);
        
      }
    } catch (err) {
      console.error('Error hashing password:', err.message);
    }
  
  };

  return (
    <div>
      <h1>Register Page</h1>
      <Form onSubmit={handleRegister} >
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
            REGISTER
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Register;