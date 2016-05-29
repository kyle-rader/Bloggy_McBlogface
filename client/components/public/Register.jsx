import React from 'react';
import { Meteor } from 'meteor/meteor';

// Define our login comp

Register = React.createClass({

    getInitialState() {
      return {
        err: null,
        newAccountEmail: null
      };
    },

    componentDidMount() {
      let form = $(this.refs.registerForm);
      // init dropdowns
      $('#registerForm .ui.dropdown').dropdown();

      // Init form validation and submission
      $(form).form({
        fields: {
          firstname: {
            identifier: 'firstname',
            rules: [{
              type: 'empty',
              prompt: 'Enter your first name'
            }]
          },
          lastname: {
            identifier: 'lastname',
            rules: [{
              type: 'empty',
              prompt: 'Enter your last name'
            }]
          },
          email: {
            identifier: 'email',
            rules: [{
                type: 'empty',
                prompt: 'Enter an email'
              },
              {
                type: 'email',
                prompt: 'Enter a valid email'
              }
            ]
          },
          password: {
            identifier: 'password',
            rules: [{
              type: 'empty',
              prompt: 'Enter a password'
            },
            {
              type: 'minLength[6]',
              prompt: 'Min length of 6!'
            }]
          },
          confirmPassword: {
            identifier: 'confirmPassword',
            rules: [{
              type: 'match[password]',
              prompt: 'Passwords do not match!'
            }]
          },
          phone: {
            identifier: 'phone',
            rules: [{
              type: 'empty',
              prompt: 'Enter your phone #'
            },
            {
              type: 'minLength[10]',
              prompt: 'Min length of 10'
            }]
          }
        },
        inline: true,
        onSuccess: (event, fields) => {
          event.preventDefault();

          // Call Meteor method to create account.
          Meteor.call('userCreate', fields, (err, result) => {
            if(err) {
              this.setState({err: err});
            } else {
              this.setState({err: null, newAccountEmail: result.email});
            }
          });
        }
      });
    },

    getErrorMsg() {
      if (this.state.err) {
        return (
        <div className="ui error message">
          {this.state.err.reason}
        </div>);
      }
    },

    getSuccessMsg() {
      if (this.state.newAccountEmail) {
        return (
          <div className="ui success message">
            <h3>Welcome to the Meteor React Starter!</h3>
            <h4>A verification email has been sent to <strong>{this.state.newAccountEmail}</strong></h4>
            <a className="ui facebook button" target="_blank" href="">
              <i className="facebook icon"></i>
              Share
            </a>
          </div>);
      }
    },

    getForm() {
      if (!this.state.newAccountEmail) {
        return (
          <form id="registerForm" className="ui large form" ref="registerForm">
            <div className="ui raised segment transparent-bg">
              <h2 className="ui blue header">
                <div className="content">
                  Register
                </div>
              </h2>

              <div className="two fields">
                <div className="field">
                  <label className="text-left">First Name</label>
                  <input type="text" name="firstname" placeholder="eg. Kyle" autoComplete="off" defaultValue={this.state.firstname}/>
                </div>
                <div className="field">
                  <label className="text-left">Last Name</label>
                  <input type="text" name="lastname" placeholder="eg. Rader" autoComplete="off" defaultValue={this.state.lastname}/>
                </div>
              </div>

              <div className="field">
                <label className="text-left">Email</label>
                <div className="ui left icon input">
                  <i className="mail icon"></i>
                  <input type="text" name="email" placeholder="your.email@gmail.com" autoComplete="off" defaultValue={this.state.email}/>
                </div>
              </div>
              <div className="two fields">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input type="password" name="password" placeholder="Password" autoComplete="off" defaultValue={this.state.password}/>
                  </div>
                </div>
                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" autoComplete="off" defaultValue={this.state.confirmPassword}/>
                  </div>
                </div>
              </div>
              <div className="field">
                <input className="ui input" name="phone" placeholder="Phone Number" defaultValue={this.state.phone} />
              </div>

              <input className="ui fluid large blue submit button" type="submit" value="Join" />
            </div>
          </form>
        );
      }
    },


    render() {
      return (
      <div className="register ui middle aligned center aligned grid custom-bg road">
          <div className="column">

              {this.getForm()}
              {this.getSuccessMsg()}
              {this.getErrorMsg()}

              <div className="ui message">
                <a href="/login">Log In</a>
              </div>
          </div>
      </div>);

    }
});
