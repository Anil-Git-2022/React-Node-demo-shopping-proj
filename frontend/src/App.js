import logo from './logo.svg';
import './App.css';
import Shop from './components/Shop/shop'
import Header from './components/layouts/header'
import Faq from './components/Faq/faq'
import Contact from './components/ContactUs/contact'
import Products from './components/Product/Product'
import Login from './components/Login/login'
import Logout from './components/Logout/logout'
import ProductDetail from './components/Product/ProductDetail'
import Cart from './components/Cart/cart'
import Orders from './components/Orders/order'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {BrowserRouter as Router,Routes,Route,Redirect,Switch} from 'react-router-dom';
import { AuthActions } from './store/loginstore'
import { connect } from 'react-redux';
// import WithRouter from './Hooks'
// function App() {
//   return (
//     <div >
//       <Header />
//       {/* <Router> */}
//         <Routes>
//             <Route path='/' element={<Shop/>} exact/>
//             <Route path='/products' element={<Products/>} exact />
//             <Route path='/faq' exact element={<Faq/>}/>
//             <Route path='/contact-us' exact element={<Contact/>}/>
//             <Route path='/login' exact element={<Login/>}/>
//             <Route path='/product-detail/:id' exact element={<ProductDetail/>}/>
//         </Routes>
//       {/* </Router> */}
      
//     </div>
//   );
// }
//console.log(AuthActions)
//For Version react router dom 6.2.0 use Routes
//For Version react router dom 5.3.0 use Router
class App extends React.Component {
  
  render() {
     
    return (
      <div >
      <Header />  
        
        {/* <Routes> 
            <Route path='/' element={<Shop/>} exact/>
            <Route path='/products' element={<Products/>} exact />
            <Route path='/faq' exact element={<Faq/>}/>
            <Route path='/contact-us' exact element={<Contact/>}/>
            {!this.props.authenticated && <Route path='/login' exact element={<Login/>}/>}
            {this.props.authenticated && <Route path='/logout' exact element={<Logout/>}/>}
            <Route path='/product-detail/:id' exact element={<ProductDetail />}/>
          </Routes> */}

          <Switch> 
          
            <Route path='/' exact >
            <Shop/>
            </Route>
            <Route path='/products'  exact >
            <Products/>
            </Route>
            <Route path='/faq' exact >
            <Faq/>
            </Route>
            <Route path='/contact-us' exact >
            <Contact/>
            </Route>
            <Route path='/orders' exact >
            <Orders/>
            </Route>
            {this.props.authenticated && <Route path='/cart' exact >
            <Cart/>
            </Route>}
            {!this.props.authenticated && <Route path='/login' exact ><Login/></Route>}
            {this.props.authenticated  && <Route path='/logout' exact><Logout/></Route>}
            <Route path='/product-detail/:id' exact ><ProductDetail /></Route>
          </Switch>
        
      </div>
    );
  }
}
const mapStateToProps = state => ({
  authenticated: state.isAuthenticatedState
});
export default connect(mapStateToProps)(App);
//export default App;
