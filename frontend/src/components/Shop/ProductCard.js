import { Component } from 'react';
import { NavLink,Link,withRouter } from 'react-router-dom';
import { AuthActions } from '../../store/loginstore'
import { useSelector,connect,useDispatch } from 'react-redux';
class ProductCard extends Component {
   
    constructor() {
        super();
        this.state = {
            message : "",
            counter : 0
        }
    }

    addToCart(event){
        event.preventDefault()
        const formData = new FormData()
        formData.append("user_id",this.props.UserId)
        formData.append("product_id",this.props.match.params.id)
        formData.append("quantity",1)
        let fetchData = {
            method: 'POST',
            body: formData
        }

        let url = "http://localhost:8080/cart/add"

        fetch(url,fetchData)
        .then((response) => {
            return response.json()
           // return response.json()
        }).then((data)=>{
            
            if(data.status === true){
                
                this.props.CartAdd({cartval : data.document})
                this.setState({ counter : this.state.counter + 1 })
                this.setState( { message :  "Hurray! "+ this.state.counter + " items added to your cart "})
                
                console.log("Data inserted successfully")
            }else{
                console.log("Data cannot be inserted")
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    render(){
        if(this.props.type == 'productdetail'){
        return (
            
            <div className="card align-items-center" >
                    <img className="card-img-top text-center" src={"http://localhost:8080/"+this.props.imageUrl} alt="Card image cap" style={{height:200+"px",width:200+"px"}}/>
                    <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <p className="card-text">{this.props.description}</p>
                    <p className="card-text">{"$"+this.props.price}</p>
                    <Link to={"/product-detail/"+this.props.id} onClick={this.addToCart.bind(this)} className="btn btn-primary">Add To Cart</Link>
                    
                </div>
                <div className="text-white bg-success text-danger">{this.state.message}</div>
            </div>
       
        )
        }else{
            return (
            
                <div className="card align-items-center" >
                        <img className="card-img-top text-center" src={"http://localhost:8080/"+this.props.imageUrl} alt="Card image cap" style={{height:200+"px",width:200+"px"}}/>
                        <div className="card-body">
                        <h5 className="card-title">{this.props.title}</h5>
                        <p className="card-text">{this.props.description}</p>
                        <p className="card-text">{"$"+this.props.price}</p>
                        <Link to={"/product-detail/"+this.props.productid} className="btn btn-primary">{this.props.buttontext}</Link>
                    </div>
                </div>
           
            ) 
        }
    }
}

const mapStateToProps = state => {
    return {
      UserId : state.Uid,
      CartState : state.CartCounter,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    //   //console.log(dispatch)
      return {
        CartAdd : (value) => dispatch(AuthActions.CartAdder(value))
      }
  }
 
//export default Product;
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ProductCard));

//export default withRouter(ProductCard);