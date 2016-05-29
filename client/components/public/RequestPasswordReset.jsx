import React from 'react';
import { Meteor } from 'meteor/meteor';

// Define our login comp

RequestPasswordReset = React.createClass({

    getInitialState() {
      return {
        err: null,
        email: null
      };
    },

    componentDidMount() {
      let form = $(this.refs.resetForm);

      // Init form validation and submission
      $(form).form({
        fields: {
          email: {
            identifier: 'email',
            rules: [{
              type: 'email',
              prompt: 'Enter your email'
            }]
          }
        },
        inline: true,
        onSuccess: (event, fields) => {
          event.preventDefault();
          
          // Call Meteor method to create account.
          Meteor.call('userSendPasswordReset', fields, (err, result) => {
            if (err) {
              this.setState({err: err});
              console.log(err);
            }
            else {
              this.setState({err: null, email: result.email});
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
      if (this.state.email) {
        return (
          <div className="ui success message">
            <h3>A password reset email has been sent to <strong>{this.state.email}</strong></h3>
            <a className="ui facebook button" target="_blank" href="">
              <i className="facebook icon"></i>
              Share on Facebook!
            </a>
          </div>);
      }
    },

    getForm() {
      if (!this.state.email) {
        return (
          <form id="resetForm" className="ui huge form" ref="resetForm">
            <div className="ui raised segment transparent-bg">
              <h2 className="ui violet header">
                <div className="content">
                  Request Password Reset
                </div>
              </h2>
              <div className="field">
                <label className="text-left">Email</label>
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input type="email" name="email" placeholder="your.email@gmail.com" autoComplete="off" />
                </div>
              </div>

              <input className="ui fluid large violet submit button" type="submit" value="Reset" />
            </div>
          </form>
        );
      }
    },

    render() {

      return (
      <div className="request-password-reset ui middle aligned center aligned grid custom-bg road">
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
