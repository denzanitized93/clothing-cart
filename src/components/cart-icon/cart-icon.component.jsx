import './cart-icon.styles.scss';

import { useContext } from 'react';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartDropdownContext } from '../../context/cart-dropdown-context';

const CartIcon = () => {

  const { setIsDropdown, isDropdown } = useContext(CartDropdownContext);

  return (
    <div className='cart-icon-container' onClick={ () => setIsDropdown(!isDropdown) }>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>0</span>
    </div>
  );
};

export default CartIcon;