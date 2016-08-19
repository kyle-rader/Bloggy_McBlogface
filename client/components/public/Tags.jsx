import React from 'react';
import { Meteor } from 'meteor/meteor';

Tags = React.createClass({

    mixins:[ReactMeteorData],
    getMeteorData() {
        return {};
    },

    render() {
        return (
        <div className="ui container">
            <div className="ui header">
                <i className="tags icon"></i>
                <div className="content">
                    <h2>Tags</h2>
                </div>
            </div>
        </div>
        );
    }

});
