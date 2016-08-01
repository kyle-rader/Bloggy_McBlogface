// Application header

import React from 'react';

AppHeader = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            user: Meteor.user(),
            isAdmin: Meteor.user() && Meteor.user().roles && (Meteor.user().roles.indexOf('admin') > -1),
            isVolunteer: Meteor.user() && Meteor.user().roles && (Meteor.user().roles.indexOf('volunteer') > -1)
        };
    },

    logout(event) {
        event.preventDefault();
        return Meteor.logout( () => FlowRouter.go('/'));
    },

    componentDidMount() {
        if (this.refs.profileDropdown)
            $(this.refs.profileDropdown).dropdown();

        $(this.refs.menuDropdown).dropdown();
    },

    componentDidUpdate() {
        if (this.refs.profileDropdown)
            $(this.refs.profileDropdown).dropdown();
    },

    getRightMenu() {
        // User is logged in
        if (this.data.user) {

            return (
            <div className="right menu">
                <div className="ui dropdown item" ref="profileDropdown">
                    <i className="blue user icon"></i>
                    {this.data.user.profile.displayName}
                    <div className="menu">
                        <a className="item" href="/editor">
                            <i className="green edit icon"></i>
                            Editor
                        </a>
                        <a className="item" href="/settings">
                            <i className="settings icon"></i>
                            Settings
                        </a>
                        <div className="divider"></div>
                        <a className="item" onClick={this.logout}>
                            <i className="sign out icon"></i>
                            Logout
                        </a>
                    </div>
                </div>
            </div>
            );
        }
        // No User - public menu
        else {
            return (
            <div className="right menu">
                <a className="ui item" href="/login">
                    <i className="green sign in icon"></i>
                    Log In
                </a>
            </div>
            );
        }
    },

    render() {
        return (
        <div className="ui fixed large menu">
            <div className="ui dropdown item" ref="menuDropdown">
                <i className="gray bars icon"></i> Menu
                <div className="menu">
                    <a className="item" href="/">
                        <i className="blue home icon"></i>&nbsp; Home
                    </a>
                </div>
            </div>

            {this.getRightMenu()}
        </div>);
    }
});
