import { createContext, useState } from "react";

export const CartDropdownContext = createContext({
  isDropdown: false
});

export const CartDropdownProvider = ({ children }) => {
  const [ isDropdown, setIsDropdown ] = useState(false);
  const value = { isDropdown, setIsDropdown };

  return <CartDropdownContext.Provider value={ value }>{ children }</CartDropdownContext.Provider>
}