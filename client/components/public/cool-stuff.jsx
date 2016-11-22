import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Icon, List } from 'semantic-ui-react';

CoolStuff = class CoolStuff extends React.Component {

  _items() {
    return [
      {
        title: 'Hemingway Editor',
        link: 'http://beta.hemingwayapp.com/',
      },
      {
        title: 'Netflix Roulette',
        link: 'http://netflixroulette.net/',
      },
      {
        title: 'D3 - Data Driven Documents / Web Graphics',
        link: 'https://d3js.org/',
      },
      {
        title: 'Meteor (what this app is built with)',
        link: 'https://meteor.com',
      },
    ];
  }

  _renderItem({ title, link }, index) {
    const content = <a target="_blank" href={link}>{title}</a>;
    return <List.Item content={content} key={index}/>;
  }

  _renderItems() {
    return _(this._items()).map(this._renderItem);
  }

  render() {
    return (
    <div className="ui container">
      <div className="ui header">
        <Icon color="blue" name="cubes" />
        <div className="content">
          <h2>Cool Stuff</h2>
        </div>
      </div>

      <List relaxed="very">
        {this._renderItems()}
      </List>
    </div>
    );
  }
};
