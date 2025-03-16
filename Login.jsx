import React, { useState, useEffect } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Success from './Success';

import axios from 'axios';

const initialForm = {
  email: '',
  password: '',
  terms: false,
};

const errorMessages = {     
  email: 'Please enter a valid email address',
  password: 'Password must be at least 4 characters long',
};

export default function Login() {
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    terms: false
  });

  useEffect(() => {
    const validateForm = () => {
      const newErrors = {};
      // Email kontrolü - sadece input'a dokunulduysa hata göster
      if (!form.email && touched.email) {
        newErrors.email = errorMessages.email;
      } else if (!/\S+@\S+\.\S+/.test(form.email) && touched.email) {
        newErrors.email = errorMessages.email;
      }

      // Şifre kontrolü - sadece input'a dokunulduysa hata göster
      if (!form.password && touched.password) {
        newErrors.password = errorMessages.password;
      } else if (form.password.length < 4 && touched.password) {
        newErrors.password = errorMessages.password;
      }
      
      // Şartlar kontrolü - sadece checkbox'a dokunulduysa hata göster
      if (!form.terms && touched.terms) {
        newErrors.terms = 'You must agree to the terms';
      }

      setErrors(newErrors);
      // Form geçerliliği için tüm koşulları kontrol et
      setIsValid(
        form.email && 
        form.password.length >= 4 && 
        form.terms && 
        /\S+@\S+\.\S+/.test(form.email)
      );
    };
    validateForm();
  }, [form, touched]);


 // Input değeri değiştiğinde çalışan fonksiyon
 const handleChange = (event) => {
  let { name, value, type } = event.target;
  value = type === 'checkbox' ? event.target.checked : value;
  setForm({ ...form, [name]: value });
  // Input'a dokunulduğunu işaretle
  setTouched({ ...touched, [name]: true });
};




  const handleSubmit = (event) => {
    event.preventDefault();
    if (isValid) {
      axios
        .get('https://6540a96145bedb25bfc247b4.mockapi.io/api/login')
        .then((res) => {
          const user = res.data.find(
            (item) => item.password == form.password && item.email == form.email
          );
          if (user) {
            setForm(initialForm);
            alert('Login successful');
            setSuccess(true);
          } else {
            alert('Invalid email or password');
          }
        });
    } else {
      alert('Lütfen formu doğru şekilde doldurun');
    }
  };

  return (
    <div>
      {success ?
        <Success /> :
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Enter your email"
              type="email"
              onChange={handleChange}
              value={form.email}
              invalid={!!errors.email}
              cy-data="email"
            />
            {errors.email && <FormFeedback>{errors.email} </FormFeedback>}
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Enter your password "
              type="password"
              onChange={handleChange}
              value={form.password}
              invalid={!!errors.password}
              cy-data="password"
            />
            {errors.password && <FormFeedback>{errors.password} </FormFeedback>}
          </FormGroup>
          <FormGroup check>
            <Input
              id="terms"
              name="terms"
              checked={form.terms}
              type="checkbox"
              onChange={handleChange}
              invalid={!!errors.terms}
              cy-data="terms"
            />{' '}
            <Label htmlFor="terms" check>
              I agree to terms of service and privacy policy
            </Label>
            {errors.terms && <FormFeedback>{errors.terms} </FormFeedback>}
          </FormGroup>
          <FormGroup className="text-center p-4">
            <Button cy-data="submit" color="primary" disabled={!isValid}>
              Sign In
            </Button>
          </FormGroup>
        </Form>}
    </div>
  );
}
