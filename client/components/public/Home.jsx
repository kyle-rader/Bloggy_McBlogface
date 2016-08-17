import React from 'react';

Home = React.createClass({

    toggleSidebar() {
        $('.app-root > .ui.sidebar').sidebar('toggle');
    },

    render() {
        return (
        <div className="ui container grid">
            <br/>
            <div className="row">
                <div className="text-center column">
                    <img className="ui centered medium image" src="/img/logo-1024.png"/>
                    <h1>{Meteor.settings.public.siteName}</h1>
                    <button className="ui blue button" onClick={this.toggleSidebar}>Toggle Sidebar</button>
                </div>
            </div>
            <br/>
        </div>
        );
    }
});
