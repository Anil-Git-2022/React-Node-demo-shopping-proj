import { Component } from 'react'
import ProductCard from './ProductCard';

const DUMMY_DATA = [
    // {
    //     "id" : 1,
    //     "imageUrl" : "speaker.jpg",
    //     "title" : "Speaker",
    //     "description" : "Boat Speaker ",
    //     "buttontext" : "BUY NOW"
    // },
    // {
    //     "id" : 2,
    //     "imageUrl" : "LED.jpg",
    //     "title" : "LED",
    //     "description" : "Samsung LED",
    //     "buttontext" : "BUY NOW"
    // },
    // {
    //     "id" : 3,
    //     "imageUrl" : "phone.jpg",
    //     "title" : "Phone",
    //     "description" : "Redmi Phone",
    //     "buttontext" : "BUY NOW"
    // },
]

class Shop extends Component {

    constructor() {
        super()
        this.state = {
            DATA : [],
        };
    }
    
    componentDidMount(){
        
        const url = 'http://localhost:8080/product/'

        fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            //console.log(data.data)
           
            DUMMY_DATA.push(data.data)
             this.setState({ DATA: DUMMY_DATA[0]})
            
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    componentDidUpdate(){
        
        const url = 'http://localhost:8080/product/'

        fetch(url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            //console.log(data.data)
           
            DUMMY_DATA.push(data.data)
             this.setState({ DATA: DUMMY_DATA[0]})
            
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    // constructor() {
    //     super();
    //     // this.state = {

    //     // }
    // } imageUrl={data.imageUrl} title={data.title} description={data.description} buttontext={data.buttontext} 

    render(){
        return (
            <div>
               {/* { DUMMY_DATA.map((data,index) => {
                   return <ProductCard key={index} imageUrl={data.imageUrl} title={data.title} description={data.description} buttontext={data.buttontext} id={data.id}/>
               }) } */}
               { this.state.DATA.map((data,index) => {
                   return <ProductCard key={index} imageUrl={data.Image} type="shop" title={data.Name} description={data.Description} buttontext="BUY NOW" price={data.Price} productid={data._id}/>
               }) }
            </div>
        );
        
    }

}

export default Shop;