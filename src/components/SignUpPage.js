import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { register } from '../actions/user';

class SingUp extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
        user: {
            userName: '',
            password: ''
        },
        submitted: false
    };
  }
  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    const newState = {};
    for(let key in user){
      if(key === name) {
        newState[name] = value;
      } else {
        newState[key] = user[key]
      }
    }
    this.setState(() => ({
      user: newState
    }));
  }
  handleSubmit(event) {
    event.preventDefault();
    const { user } = this.state;
    console.log(user);
    if (user.userName && user.password) {
      // this.setState({ submitted: true });
      // this.props.dispatch(register(user));
    }
  }
  render () {
    const { registering  } = this.props;
    const { user, submitted } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Register</h2>
        <form name="form" onSubmit={this.handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" name="userName" value={user.username} onChange={this.handleChange} />
                {submitted && !user.username &&
                    <div className="help-block">Username is required</div>
                }
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="text" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                {submitted && !user.password &&
                    <div className="help-block">Password is required</div>
                }
            </div>
            <div className="form-group">
                <button className="btn btn-primary">Register</button>
            </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps)(SingUp);
