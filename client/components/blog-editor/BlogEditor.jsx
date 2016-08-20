import React from 'react';
import { Meteor } from 'meteor/meteor';

BlogEditor = React.createClass({

    mixins:[ReactMeteorData],
    getMeteorData() {
        return {};
    },

    render() {
        return (
        <div className="ui container">
            <div className="ui header">
                <i className="green edit icon"></i>
                <div className="content">
                    <h2>Editor</h2>
                </div>
            </div>
        </div>
        );
    }
});
