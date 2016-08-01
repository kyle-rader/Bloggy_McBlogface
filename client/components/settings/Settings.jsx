import React from 'react';

Settings = React.createClass({

    mixins:[ReactMeteorData],
    getMeteorData() {
        return {};
    },

    render() {
        return (
        <div className="ui container grid">
            <h1 className="ui header">
                Settings
            </h1>
        </div>
        );
    }

});
