import  React, { Component,useEffect,useState } from 'react'
import {BrowserRouter as Router,Routes,Route,Redirect,Switch,useParams} from 'react-router-dom';
import ProductCard from '../Shop/ProductCard'
function ProductDetail(){

    const { id } = useParams();
    const [getData,setData] = useState([]);
    useEffect(() => {
        // Update the document title using the browser API
       let url = "http://localhost:8080/product/"+id
        fetch(url)
        .then((response) => {
            return response.json()
        }).then(data=>{
            console.log(data)
            setData(data.data[0])
        }).catch(err=>{
            console.log(err)
        })
      },[1]);

    return (
        <div>
            {/* { DUMMY_DATA.map((data,index) => {
                return <ProductCard key={index} imageUrl={data.imageUrl} title={data.title} description={data.description} buttontext={data.buttontext} id={data.id}/>
            }) } */}
           {  <ProductCard imageUrl={getData.Image} title={getData.Name} description={getData.Description} buttontext="BUY NOW" type="productdetail" price={getData.Price} id={getData._id}/>
                }
        </div>
     )
    
}
// class ProductDetail extends Component {

    
//     componentDidMount(){
//         console.log(this.props)
//         // let url = "http://localhost:8080/product/"+this.props.match.params.id
//         // fetch(url)
//         // .then((response) => {
//         //     return response.json()
//         // }).then(data=>{
//         //     console.log(data)
//         // }).catch(err=>{
//         //     console.log(err)
//         // })
//     }

//     render(){
//         //const { id } = this.props.match.params;
       
//         return "Custom Product";
//     }

// }

export default ProductDetail;