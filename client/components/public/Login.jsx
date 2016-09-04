import React from 'react';

// Define our login comp

Login = class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      err: null,
      email: '',
      password: '',
    };
  }

  login(event) {
    event.preventDefault();

    let email = $(this.refs.email).val();
    let password = $(this.refs.password).val();

    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({err: err});
      }
    });
  }

  getErrorMessage() {
    if (this.state.err != null) {
      return <div className="ui error message">{this.state.err.reason}</div>;
    }
    else {
      return null;
    }
  }

  render() {
    return (
    <div className="login ui middle aligned center aligned grid">
      <div className="column">
        <form className="ui large form" onSubmit={(e) => this.login(e)}>
          <div className="ui raised segment">
            <h2 className="ui green header">
              <div className="content">
                Log In
              </div>
            </h2>
            <div className="field">
              <div className="ui left icon input">
                <i className="user icon"></i>
                <input type="text" ref="email" placeholder="Username or Email" autoComplete="off" defaultValue={this.state.email}/>
              </div>
            </div>
            <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input type="password" ref="password" placeholder="Password" autoComplete="off" defaultValue={this.state.password}/>
              </div>
            </div>
            <input className="ui fluid large green submit button" type="submit" value="Login" />
          </div>
        </form>
        {() => this.getErrorMessage()}

        <div className="ui message">
          <a href="/requestpasswordreset">Forgot Password</a>
        </div>
      </div>
    </div>);
  }
}
