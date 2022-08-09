import { Component } from 'react'
import { Link} from 'react-router-dom';
import CartElement from '../Cart/CartElement';

class Orders extends Component {

    constructor() {
        super();
        this.state = {
            OrderData : ""
        }
    }

    componentDidMount(){
        let url = 'http://localhost:8080/order/'+localStorage.getItem('uid')
        
        fetch(url).then((response) => {
            return response.json()
        }).then((data) => {
            if(data.data == 0){
                this.setState({ OrderData : "" })
            }else{
                this.setState({ OrderData : data.data.my_orders })
            }
            
        }).catch((err) => {
            console.log(err)
        })

    }

    render() {
        return (
            <div className="container mt-5">
            <section className="h-100 h-custom" style={{backgroundColor: "#eee"}}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col">
                        <div className="card">
                        <div className="card-body p-4">

                            <div className="row">
                            <div className="col-lg-12">
                                <h5 className="mb-3"><Link to="/" className="text-body"><i
                                    className="fas fa-long-arrow-alt-left me-2"></i>Continue shopping</Link></h5>
                                <hr/>

                                <div className="align-items-center mb-4">
                                    <p className="mb-1">Order History</p>
                                   {this.state.OrderData == "" && <p className="mb-0">Oops! It seems you have not order anything yet.</p>}
                                   
                                </div>

                                <div className="card mb-3">
                                {
                                
                                
                                Object.values(this.state.OrderData).map((results,index)=>{ 
                                    
                                    return (
                                    <CartElement productName={results.productName
                                    } productPrice = {results.price} productQuantity={results.quantity} key={index} productImage={results.image_path} type="order" />
                                    )
                                }) 
                                }   
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

export default Orders;