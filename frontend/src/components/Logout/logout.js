import { Component } from 'react'
import { useSelector,connect,useDispatch } from 'react-redux';
import { AuthActions } from '../../store/loginstore'
import { withRouter } from 'react-router-dom';
class Logout extends Component {
    
    componentDidMount(){
        
        this.props.logout()
        localStorage.setItem("authenticated",false)
        localStorage.removeItem("uid")
        this.props.history.push('/login')
    }
    render(){
        return <div className="container mt-5"><p>You have been Logged out successfully.</p></div>;
       
  

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
            logout : () => dispatch(AuthActions.logout())
        }
    }
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Logout));