import React from 'react';

Home = React.createClass({

    render() {
        return (
        <div className="ui container grid">
            <br/>
            <div className="row">
                <div className="text-center column">
                    <img className="ui centered medium image" src="/img/logo-1024.png"/>
                    <h1>{Meteor.settings.public.siteName}</h1>
                </div>
            </div>
            <br/>
        </div>
        );
    }
});
