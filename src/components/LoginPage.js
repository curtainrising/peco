import React from 'react';
import { connect } from 'react-redux';
import { withRouter} from "react-router-dom";
import { loginRequest } from '../redux/actionCreators';


class Login extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(data) {
    console.log('login');
    this.props.dispatch(loginRequest({},this.props.history));
  }
  render () {
    if (this.props.user.isAtuhenticated) {
      this.props.history.push('/');
    }
    return (
      <div>
        <h1>Log in</h1>
        <button onClick={this.handleSubmit}>log in</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default withRouter(connect(mapStateToProps)(Login));
