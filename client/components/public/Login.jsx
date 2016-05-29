import React from 'react';

// Define our login comp

Login = React.createClass({

    getInitialState() {
      return {
        err: null,
        email: '',
        password: ''
      };
    },

    login(event) {
        event.preventDefault();

        let email = $(this.refs.email).val();
        let password = $(this.refs.password).val();

        Meteor.loginWithPassword(email, password, (err) => {
            
            if (err) {
              this.setState({err: err});
            }
        });
    },

    getErrorMessage() {
      if (this.state.err != null) {
        return <div className="ui error message">{this.state.err.reason}</div>;
      }
      else {
        return null;
      }
    },

    render() {
      return (
      <div className="login ui middle aligned center aligned grid custom-bg road">
          <div className="column">
              <form className="ui huge form" onSubmit={this.login}>
                <div className="ui raised segment transparent-bg">
                  <h2 className="ui green header">
                    <div className="content">
                      Log In
                    </div>
                  </h2>
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="user icon"></i>
                      <input type="email" ref="email" placeholder="your.email@address.com" autoComplete="off" defaultValue={this.state.email}/>
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
              {this.getErrorMessage()}

              <div className="ui message">
                <a href="/register">Join!</a> &nbsp; | &nbsp; <a href="/requestpasswordreset">Forgot Password</a>
              </div>
          </div>
      </div>);
    }
});
