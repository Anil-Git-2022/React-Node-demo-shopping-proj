import { Component } from 'react'
import { NavLink,Link,withRouter } from 'react-router-dom';
import customCss from './cart.module.css';
import { useSelector,connect,useDispatch } from 'react-redux';
import { AuthActions } from '../../store/loginstore'
import CartElement from './CartElement';
let orderTotal = 0;
class Cart extends Component {

    QuantityObj = []
    NameObj = []
    ImageObj = []
    TotalObj = []


    constructor(){
        super();
        this.state = {
            cartData : "",
            productQuantity : "",
            productName : "",
            productPrice : "",
            productPath : ""
        }
    }


    componentDidMount() {
        orderTotal = 0;
        let url = "http://localhost:8080/cart/"+localStorage.getItem('uid')
        fetch(url)
        .then((response) => {
            return response.json()
        }).then(data=>{
            this.setState({cartData : data.data})
            
        }).catch(err=>{
            console.log(err)
        })

    }



    PlaceOrder = (event) => {
        event.preventDefault()
        const formData = new FormData()
        var i=0;
        
        if(event.target.image_path.length > 0){
            for(i=0 ; i<event.target.image_path.length;i++){
                this.ImageObj[i] = event.target.image_path[i].value
                this.NameObj[i] = event.target.product_name[i].value
                this.QuantityObj[i] = event.target.product_quantity[i].value
                this.TotalObj[i] = event.target.product_total[i].value
            }
            
        }
        formData.append("image",this.state.cartData.length == 1 ? event.target.image_path.value:this.ImageObj)
        formData.append("quantity",this.state.cartData.length == 1 ? event.target.product_quantity.value:this.QuantityObj)
        formData.append("total",this.state.cartData.length == 1 ? event.target.product_total.value:this.TotalObj)
        formData.append("name",this.state.cartData.length == 1 ? event.target.product_name.value:this.NameObj)
        formData.append("cart",this.state.cartData.length)
        formData.append("uid",localStorage.getItem('uid'))
        let fetchData = {
            method: 'POST',
            body: formData,
        }

        let url = "http://localhost:8080/order/pay"

        fetch(url,fetchData)
        .then((response) => {
           return response.json()
        }).then((data)=> {
            if(data.status == true){
                //this.props.history.push('/')
                this.setState({message: data.message})
                this.props.CartAdd({ cartval : 0 })
                this.setState({ cartData : 0 })
                this.forceUpdate()
            }else{
                this.setState({message : "Sorry!some error found file reading data"})
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
   

    render(){
        if(this.state.cartData.length > 0){
            return (
            <div className="container mt-5">
            <section className="h-100 h-custom" style={{backgroundColor: "#eee"}}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card">
                        <div className="card-body p-4">
                        <form action="#" method="post" onSubmit={this.PlaceOrder.bind(this)}>
                            <div className="row">
                           
                            <div className="col-lg-7">
                                <h5 className="mb-3"><Link to="/" className="text-body"><i
                                    className="fas fa-long-arrow-alt-left me-2"></i>Continue shopping</Link></h5>
                                <hr/>

                                <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <p className="mb-1">Shopping cart</p>
                                   
                                    <p className="mb-0">You have {this.state.cartData.length} items in your cart</p>
                                </div>
                                 
                                <div>
                                    <p className="mb-0"><span className="text-muted">Sort by:</span> <a href="#!"
                                        className="text-body">price <i className="fas fa-angle-down mt-1"></i></a></p>
                                </div>
                                </div>

                                <div className="card mb-3">
                                {
                                
                                Object.values(this.state.cartData).map((results,index)=>{ 
                                    //console.log(results)
                                    orderTotal +=  parseInt(parseFloat(results.product_info[0].Price) * parseFloat(results.quantity))
                                    
                                    return (
                                    <CartElement productName={results.product_info[0].Name} productPrice = {results.product_info[0].Price} productQuantity = {results.quantity} productImage={results.product_info[0].Image} key={index} productDescription={results.product_info[0].Description} ProductId={results.product_info[0]._id} type="cart" />
                                    )
                                }) 
                                }   
                                </div>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex flex-row align-items-center">
                                            <div className="ms-3">
                                                <h5>Order Total :</h5>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            
                                            <div style={{width:100 + "px" }}>
                                            <h5 className="mb-0">${parseFloat(orderTotal).toFixed(2)}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-5">

                                <div className="card bg-primary text-white rounded-3">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h5 className="mb-0">Card details</h5>
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                        className="img-fluid rounded-3" style={{width: 45+"px"}} alt="Avatar" />
                                    </div>

                                    <p className="small mb-2">Card type</p>
                                    <a href="#!" type="submit" className="text-white"><i
                                        className="fab fa-cc-mastercard fa-2x me-2"></i></a>
                                    <a href="#!" type="submit" className="text-white"><i
                                        className="fab fa-cc-visa fa-2x me-2"></i></a>
                                    <a href="#!" type="submit" className="text-white"><i
                                        className="fab fa-cc-amex fa-2x me-2"></i></a>
                                    <a href="#!" type="submit" className="text-white"><i className="fab fa-cc-paypal fa-2x"></i></a>

                                    {/* <form className="mt-4"> */}
                                    <div className="form-outline form-white mb-4">
                                        <input type="text" id="typeName" className="form-control form-control-lg" siez="17"
                                        placeholder="Cardholder's Name" required/>
                                        <label className="form-label" htmlFor="typeName">Cardholder's Name</label>
                                    </div>

                                    <div className="form-outline form-white mb-4">
                                        <input type="text" id="typeText" className="form-control form-control-lg" siez="17"
                                        placeholder="1234 5678 9012 3457" minLength="19" maxLength="19" required/>
                                        <label className="form-label" htmlFor="typeText">Card Number</label>
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                        <div className="form-outline form-white">
                                            <input type="text" id="typeExp" className="form-control form-control-lg"
                                            placeholder="MM/YYYY" size="7"  minLength="7" maxLength="7" required/>
                                            <label className="form-label" htmlFor="typeExp">Expiration</label>
                                        </div>
                                        </div>
                                        <div className="col-md-6">
                                        <div className="form-outline form-white">
                                            <input type="password" id="typeText" className="form-control form-control-lg"
                                            placeholder="&#9679;&#9679;&#9679;" size="1" minLength="3" maxLength="3" required/>
                                            <label className="form-label" htmlFor="typeText">Cvv</label>
                                        </div>
                                        </div>
                                    </div>

                                    {/* </form> */}

                                    <hr className="my-4"/>

                                    <div className="d-flex justify-content-between">
                                    <p className="mb-2">Subtotal</p>
                                    <p className="mb-2">${parseFloat(orderTotal).toFixed(2)}</p>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                    <p className="mb-2">Shipping</p>
                                    <p className="mb-2">$0.00</p>
                                    </div>

                                    <div className="d-flex justify-content-between mb-4">
                                    <p className="mb-2">Total(Incl. taxes)</p>
                                    <p className="mb-2">${parseFloat(orderTotal).toFixed(2)}</p>
                                    </div>

                                    <button type="submit" className="btn btn-info btn-block btn-lg" >
                                    <div className="d-flex justify-content-between">
                                        <span>${parseFloat(orderTotal).toFixed(2)}</span>
                                        <span>Checkout <i className="fas fa-long-arrow-alt-right ms-2"></i></span>
                                    </div>
                                    </button>

                                </div>
                                </div>

                            </div>
                            
                            </div>
                            </form>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>
            </div>
            );
        }else{
            return (
                <div className="container mt-5">
                <section className="h-100 h-custom" style={{backgroundColor: "#eee"}}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col">
                            <div className="card">
                            <div className="card-body p-4">
    
                                <div className="row">
                                    <div className="bg-success text-white text-center">{this.state.message}</div>
                                <div className="col-lg-7">
                                    <h5 className="mb-3"><Link to="/" className="text-body"><i
                                        className="fas fa-long-arrow-alt-left me-2"></i>Continue shopping</Link></h5>
                                    <hr/>
    
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                    <div>
                                        <p className="mb-1">Shopping cart</p>
                                        <p className="mb-0">You have {this.state.cartData.length == 0 ?'no' : this.state.cartData.length } items in your cart</p>
                                    </div>
                                     
                                    </div>
                                </div>
                                </div>
    
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </section>
                </div>
                ); 
        }
       }

}

const mapStateToProps = state => {
    return {
      CartCount : state.CartCounter
    }
  }
  const mapDispatchToProps = dispatch => {
      //console.log(dispatch)
      return {
          CartAdd : (value) => dispatch(AuthActions.CartAdder(value))
      }
  }
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Cart));