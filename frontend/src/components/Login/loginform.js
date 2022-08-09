import { Component } from 'react'

class LoginForm extends Component {

    render(){
        return (
        <form>
        <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
            <input type="email" className="form-control" id="inputEmail3" onChange={this.props.EmailHandler.bind(this)} placeholder="Email"/>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
            <input type="password" className="form-control" id="inputPassword3" placeholder="Password" onChange={this.props.passwordHandler.bind(this)} />
            </div>
        </div>
        <div className="form-group row">
            <div className="col-sm-10">
            <button type="submit" onClick={this.props.SubmitHandler.bind(this)} className="btn btn-primary">Sign in</button>
            </div>
        </div>
        </form>
        );
    }

}

export default LoginForm;