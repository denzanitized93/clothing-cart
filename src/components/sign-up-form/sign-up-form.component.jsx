import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserFromAuth } from '../../utils/firebase/firebase.utils'

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { UserContext } from "../../context/user.context";

import './sign-up-form.styles.scss';

const defaultFormUser = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUpForm = () => {

  const [formUser, setFormUser] = useState(defaultFormUser);
  const { displayName, email, password, confirmPassword } = formUser;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormUser({ ...formUser, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert(`Password didn't match`);
      return;
    };
    
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      if (user) {
        await createUserFromAuth(user, { displayName })
        setFormUser(defaultFormUser);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className="sign-up-container">
      <h2>Sign up with your email and password.</h2>
      <form onSubmit={ handleSubmit }>
        <FormInput 
          type="text" required name="displayName" value={ displayName } onChange={ handleChange } label="Display Name"
        />
        <FormInput 
          type="email" required name="email" value={ email } onChange={ handleChange } label="Email"
        />
        <FormInput 
          type="password" required name="password" value={ password } onChange={ handleChange } label="Password"
        />
        <FormInput 
          type="password" required name="confirmPassword" value={ confirmPassword } onChange={ handleChange } label="Confirm Password"
        />
        <Button
          type="submit"
        >
          Create user
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;