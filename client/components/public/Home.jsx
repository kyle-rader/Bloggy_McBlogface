import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Image } from 'semantic-ui-react';

Home = class Home extends React.Component {

  render() {
    return (
    <Container>
      <Header textAlign="center">
        <Image size="tiny" src="/img/logo-512.png"/>
        <h1 className="ui h1">{Meteor.settings.public.siteName}</h1>
        <Header.Subheader>
          <h3>Life is a Game</h3>
        </Header.Subheader>
      </Header>

      <PostList page={1} />
    </Container>
    );
  }

}
