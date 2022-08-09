import { Component } from 'react';
import classes from './layout.module.css'
import { Button } from 'react-bootstrap';
import { NavLink,Link } from 'react-router-dom';
import { connect } from 'react-redux';
class Header extends Component {

    render() {
       return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
         <NavLink to="/" className="nav-link" >My Shop</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" >Home</NavLink>
              {/* <a className="nav-link" href="#">Home</a> */}
            </li>
            <li className="nav-item">
            <NavLink to="/products" className="nav-link" >Products</NavLink>
              {/* <a className="nav-link" href="#">Products</a> */}
            </li>
            <li className="nav-item">
            <NavLink to="/faq" className="nav-link" >FAQs</NavLink>
              {/* <a className="nav-link" href="#">FAQs</a> */}
            </li>
            
            <li className="nav-item text-right">
            <NavLink to="/contact-us" className="nav-link" >Contact Us</NavLink>
              {/* <a className="nav-link" href="#">Contact Us</a> */}
            </li>

            {this.props.authenticated && <li className="nav-item text-right">
            <NavLink to="/orders" className="nav-link" >My Orders</NavLink>
              {/* <a className="nav-link" href="#">Contact Us</a> */}
            </li>}
            
          </ul>
            
        </div>
        {this.props.authenticated && <li className="nav-item text-right">
            <NavLink to="/cart" className="nav-link" ><i className="fas fa-shopping-cart" style={{color:"white",textDecoration:"none",marginBottom: 20+"px"}}><span style={{fontSize:7+"px",position: "absolute",top: 36+"px",marginLeft: -5+"px"}}>{this.props.cart}</span></i></NavLink>
              {/* <a className="nav-link" href="#">Contact Us</a> */}
            </li>}
        {!this.props.authenticated && <ul className="nav navbar-nav navbar-right">
            <li className="nav-item">
            <NavLink to="/login" className={`${classes.login} nav-link `} activeclassname="active" >Login</NavLink>
                {/* <a className={`${classes.login} nav-link `} href="#">Login</a> */}
            </li>
        </ul>}
        {this.props.authenticated && <ul className="nav navbar-nav navbar-right">
            <li className="nav-item">
            <NavLink to="/logout" className={`${classes.login} nav-link `} activeclassname="active" >Logout</NavLink>
                {/* <a className={`${classes.login} nav-link `} href="#">Login</a> */}
            </li>
        </ul>}
      </nav>
       )
    }
}
const mapStateToProps = state => ({
  authenticated: state.isAuthenticatedState,
  cart: state.CartCounter
});
export default connect(mapStateToProps)(Header);
//export default Header;