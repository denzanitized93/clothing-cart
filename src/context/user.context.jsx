import { createContext, useEffect, useState } from "react";

import { onAuthStateChangeListener, createUserFromAuth } from '../utils/firebase/firebase.utils'

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
});

export const UserProvider = ({ children }) => {
  const [ currentUser, setCurrentUser ] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      if (user) {
        createUserFromAuth(user);
      }

      setCurrentUser(user);
    })

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={ value }>{ children }</UserContext.Provider>
};