import { useState } from "react";
import { signInWithGooglePopup, createUserFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { UserContext } from "../../context/user.context";

import './sign-in-form.styles.scss';

const defaultFormUser = {
  email: '',
  password: '',
};

const SignInForm = () => {

  const [formUser, setFormUser] = useState(defaultFormUser);
  const { email, password } = formUser;

  const signWithToGoogle = async () => {
    await signInWithGooglePopup();
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormUser({ ...formUser, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(email, password);
      if (user) {
        setFormUser(defaultFormUser);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password.</span>
      <form onSubmit={ handleSubmit }>
        <FormInput 
          type="email" required name="email" value={ email } onChange={ handleChange } label="Email"
        />
        <FormInput 
          type="password" required name="password" value={ password } onChange={ handleChange } label="Password"
        />
        <div className="buttons-container">
          <Button
            type="submit"
          >
            Sign in
          </Button>
          <Button
            type="button"
            buttonType="google"
            onClick={ signWithToGoogle }
          >
            Sign in with google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;