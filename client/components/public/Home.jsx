import React from 'react';

Home = React.createClass({

    render() {
        return (
        <div className="ui container">
            <div className="ui center aligned icon header">
                <img className="ui tiny image" src="/img/logo-512.png"/>
                <div className="content">
                    <h1 className="ui h1">{Meteor.settings.public.siteName}</h1>
                    <div className="sub header">
                        Life is a Game
                    </div>
                </div>
            </div>
        </div>
        );
    }
});
