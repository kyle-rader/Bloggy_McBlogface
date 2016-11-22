import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Icon, Button } from 'semantic-ui-react';

Resume = class Resume extends React.Component {

  render() {
    return (
    <div className="ui container">
      <div className="ui header">
        <Icon color="green" name="book" />
        <div className="content">
          <h2>Resume</h2>
        </div>
      </div>

      <Button as="a"
        href="https://github.com/kyle-rader/resume/blob/master/Kyle_Rader_Resume.pdf"
        target="_blank"
        content="LaTeX Resume on Github"
        icon='github'
        labelPosition='right'
      />
    </div>
    );
  }
};
