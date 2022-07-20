import { signInWithGooglePopup, createUserFromAuth } from '../../utils/firebase/firebase.utils';

const Signin = () => {

  const signInToGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserFromAuth(user);
    console.log(user);
  }

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={ signInToGoogle }>Sign in with google account</button>
    </div>
  )
};

export default Signin;