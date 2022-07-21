import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { UserContext } from "../../context/user.context";
import { CartDropdownContext } from "../../context/cart-dropdown-context";
import { signOutUser } from '../../utils/firebase/firebase.utils';

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import './navigation.styles.scss';

const Navigation = () => {

  const { currentUser } = useContext(UserContext);
  const { isDropdown } = useContext(CartDropdownContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link to="/" className="logo-container">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link to="/shop" className="nav-link">SHOP</Link>
          {
            currentUser ? (
              <span className="nav-link" onClick={ signOutUser }>SIGN OUT</span>
            ) : (
              <Link to="/authentication" className="nav-link">SIGN IN</Link>
            )
          }
          <CartIcon />
        </div>
        { isDropdown && <CartDropdown /> }
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation;