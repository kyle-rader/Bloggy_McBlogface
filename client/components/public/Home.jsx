import React from 'react';

Home = React.createClass({

    render() {
        return (
        <div className="ui container grid">
            <br/>
            <div className="row">
                <div className="text-center column">
                    <img className="ui centered small image" src="/img/logo-512.png"/>
                    <h1>{Meteor.settings.public.siteName}</h1>
                </div>
            </div>
            <br/>
        </div>
        );
    }
});
