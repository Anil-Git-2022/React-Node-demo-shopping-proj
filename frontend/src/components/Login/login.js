import { Component } from 'react'
import LoginForm from '../Login/loginform'
import { useSelector,connect,useDispatch } from 'react-redux';
import { AuthActions } from '../../store/loginstore'
import Logout from '../Logout/logout'
import { withRouter } from 'react-router-dom';
class Login extends Component {

    constructor(){
        super()
        this.state = {
            username : '',
            password : '',
            message : ''
        }
    }

    // componentDidMount(){
    //     this.forceUpdate();
    // }

    SubmitHandler = (event) => {
        event.preventDefault()
        
        const data = {
            "username" : this.state.username,
            "password" : this.state.password
        }
        const formData = new FormData()
        formData.append("username",this.state.username)
        formData.append("password",this.state.password)
        let fetchData = {
            method: 'POST',
            body: formData
        }

        let url = "http://localhost:8080/login"

        fetch(url,fetchData)
        .then((response) => {
            return response.json()
           // return response.json()
        }).then((data)=>{
            
            if(data.status == true){
                
                this.setState({message : data.message})
                this.props.login() //Access the method by specifying it in dispatcher
                localStorage.setItem('authenticated',true)
                localStorage.setItem('uid',data.data._id)
                this.props.history.push('/')
            }else{
                this.setState({message: data.message})
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    passwordHandler = (event) => {
        this.setState({password : event.target.value})
    }

    EmailHandler = (event) => {
        this.setState({username : event.target.value})
    }

    render(){
        return  (
        <div className="container">
        <h3 className="text-center mt-5">Login Here</h3>
        <div>{this.state.message}</div>
        <LoginForm passwordHandler = {this.passwordHandler} EmailHandler = {this.EmailHandler} SubmitHandler = {this.SubmitHandler}/>
        </div>
        )
        
    }

}
const mapStateToProps = state => {
      return {
        isAuthenticatedState : state.isAuthenticatedState
      }
    }
    
    const mapDispatchToProps = dispatch => {
        //console.log(dispatch)
        return {
            login : () => dispatch(AuthActions.login()),
            logout : () => dispatch(AuthActions.logout())
        }
    }
//export default Login;
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));