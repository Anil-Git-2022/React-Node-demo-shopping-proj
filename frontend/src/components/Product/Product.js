import React,{ Component } from 'react'
import { withRouter } from 'react-router-dom';
class Product extends Component {

    constructor(){
        super()
        this.state = {
            productName : "",
            productPrice : "",
            productImage : "",
            productDescription : "",
            message : ""
        }
        
    }

    SubmitProduct(e){
        e.preventDefault()
        // const data = {
        //     "name":this.state.productName,
        //     "description":this.state.productDescription,
        //     "price":this.state.productPrice,
        //     "image":this.state.productImage 
        // }
        const formData = new FormData()
        formData.append("image",this.state.productImage)
        formData.append("price",this.state.productPrice)
        formData.append("description",this.state.productDescription)
        formData.append("name",this.state.productName)
        let fetchData = {
            method: 'POST',
            body: formData,
            // headers: new Headers({
            //   'Accept': 'application/json',
            //   'Content-Type': 'multipart/form-data'
            // })
        }

        let url = "http://localhost:8080/product/add"

        fetch(url,fetchData)
        .then((response) => {
            if(response.ok){
                this.setState({message: "Data added successfully"})
                this.props.history.push('/')
            }else{
                this.setState({message : "Sorry!some error found file reading data"})
            }
           // return response.json()
        }).catch((err) => {
            console.log(err)
        })
    }

    productNameHandler(event){
        this.setState({productName:event.target.value})
    }
    productPriceHandler(event){
        this.setState({productPrice:event.target.value})
    }
    productImageHandler(event){
        console.log(event.target.files[0])
        this.setState({productImage:event.target.files[0]})
    }
    productDescriptionHandler(event){
        this.setState({productDescription:event.target.value})
    }

    render(){
        return (
            <div className="container">
            <h3 className="text-center mt-5">Add Product</h3>
            <div className="text-center">{this.state.message}</div>
            <form className="p-5" encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Product Name</label>
                    <input type="text" onChange={this.productNameHandler.bind(this)} className="form-control" id="name" aria-describedby="ProductName" placeholder="Product Name"/>
                </div>
                
                <div className="form-group">
                    <label htmlFor="description">Product Price($)</label>
                    <input type="text" onChange={this.productPriceHandler.bind(this)} className="form-control" id="price" placeholder="price"/>
                </div>
                <div className="form-group">
                    <label htmlFor="productImage">Product Image</label>
                    <input type="file" onChange={this.productImageHandler.bind(this)} className="form-control mr-5" id="productImage"/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Product Description</label>
                    <textarea className="form-control mb-5" onChange={this.productDescriptionHandler.bind(this)} id="description" placeholder="Description"></textarea>
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.SubmitProduct.bind(this)}>Add Product</button>
            </form>
            </div>
        );
    }

}

export default withRouter(Product);