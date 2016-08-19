import React from 'react';
import { Meteor } from 'meteor/meteor';

Archive = React.createClass({

    mixins:[ReactMeteorData],
    getMeteorData() {
        return {};
    },

    render() {
        return (
        <div className="ui container">
            <div className="ui header">
                <i className="archive icon"></i>
                <div className="content">
                    <h2>Archive</h2>
                </div>
            </div>
        </div>
        );
    }

});
