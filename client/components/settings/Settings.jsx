import React from 'react';

Settings = React.createClass({

    mixins:[ReactMeteorData],
    getMeteorData() {
        return {};
    },

    render() {
        return (
        <div className="ui container grid">
            <div className="one column row">
                <div className="column">
                    <h1 className="ui header">
                        Settings
                    </h1>
                </div>
            </div>

            <div className="two column row">
                <div className="two wide column">
                    <div className="ui comapct vertical labeled icon menu">
                        <a className="item">
                            <i className="blue lock icon"></i>
                            Security
                        </a>
                        <a className="item">
                            <i className="green pencil icon"></i>
                            Blog
                        </a>
                        <a className="item">
                            <i className="yellow bell icon"></i>
                            Notifications
                        </a>
                    </div>
                </div>

                <div className="fourteen wide column">
                    <div className="ui raised segment">
                        There's gonna be stuff here
                    </div>
                </div>
            </div>
        </div>
        );
    }

});
