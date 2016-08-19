import React from 'react';

Home = React.createClass({

    render() {
        return (
        <div className="ui container">
            <div className="ui center aligned header">
                <img className="ui tiny image" src="/img/logo-512.png"/>
                <div className="content">
                    <h1 className="ui h1">{Meteor.settings.public.siteName}</h1>
                    <div className="sub header">
                        <h3 className="ui h3">Code, Life, & Cool Stuff</h3>
                    </div>
                </div>
            </div>
        </div>
        );
    }
});
