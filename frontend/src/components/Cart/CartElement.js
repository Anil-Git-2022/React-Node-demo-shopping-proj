import { Component } from 'react';
import { NavLink,Link,withRouter } from 'react-router-dom';
class CartElement extends Component {

    cartdelete = (event) => {
        event.preventDefault();
        console.log(event.target.getAttribute('dataid'))
    }

    render(){
        if(this.props.type == 'cart'){
        return (
        <div className="card-body">
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                        <div>
                        <img
                            src={"http://localhost:8080/"+this.props.productImage}
                            className="img-fluid rounded-3" alt="Shopping item" style={{width: 65+"px"}} />
                        </div>
                        <input type="hidden" name="image_path"  value={"http://localhost:8080/"+this.props.productImage} />
                        <div className="ms-3">
                        <h5>{this.props.productName}</h5>
                        <input type="hidden" name="product_name" value={this.props.productName} />
                        <p className="small mb-0">{this.props.productDescription}</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                        <div style={{width:50 +"px"}}>
                        <h5 className="fw-normal mb-0">{this.props.productQuantity}</h5>
                        <input type="hidden" name="product_quantity" value={this.props.productQuantity} />
                        </div>
                        <div style={{width:100 + "px" }}>
                        <h5 className="mb-0">${parseFloat(parseFloat(this.props.productPrice) * parseFloat(this.props.productQuantity)).toFixed(2)}</h5>
                        <input type="hidden" name="product_total" value={parseFloat(parseFloat(this.props.productPrice) * parseFloat(this.props.productQuantity)).toFixed(2)}  />
                        </div>
                        <Link to="/" value={this.props.ProductId} onClick={this.cartdelete.bind(this)} style={{color:"#cecece" }}><i className="fas fa-trash-alt" dataid={this.props.ProductId}></i></Link>
                    </div>
                </div>
            </div>

        )
        }else{
            return (
                <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                                <div>
                                <img
                                    src={this.props.productImage}
                                    className="img-fluid rounded-3" alt="Shopping item" style={{width: 65+"px"}} />
                                </div>
                                <div className="ms-3">
                                <h5>{this.props.productName}</h5>
                                </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                                <div style={{width:50 +"px"}}>
                                <h5 className="fw-normal mb-0">{this.props.productQuantity}</h5>
                                </div>
                                <div style={{width:100 + "px" }}>
                                <h5 className="mb-0">${this.props.productPrice}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
        
                ) 
        }
    }
}


export default CartElement;

//export default withRouter(ProductCard);