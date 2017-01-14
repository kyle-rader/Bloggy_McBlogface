import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import moment from 'moment';

import hljs from 'highlight.js';
import Markdown from 'markdown-it';

const markit = Markdown({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  },
  html: true,
});

const DATE_FORMAT = 'MMM D, YYYY';

Post = class Post extends React.Component {

  makeStateFromProps(props) {
    return {
      createdAt: moment(props.createdAt).format(DATE_FORMAT),
      lastUpdated: moment(props.lastUpdated).fromNow(),
    };
  }

  constructor(props) {
    super(props);
    this.state = this.makeStateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.makeStateFromProps(nextProps));
  }

  render() {
    const { title, body } = this.props;
    const bodyRendered = markit.render(body);

    return (
    <div className="post">
      <Header>
        <Header.Content>{title}</Header.Content>
        <Header.Subheader as="small">
          <strong>Created: </strong> {this.state.createdAt} &nbsp;&nbsp;<strong>Updated:</strong> {this.state.lastUpdated}
        </Header.Subheader>
      </Header>
      <div dangerouslySetInnerHTML={{__html: bodyRendered}} />
    </div>
    );
  }
}

Post.propTypes = {
  title: React.PropTypes.string.isRequired,
  body: React.PropTypes.string.isRequired,
  createdAt: React.PropTypes.object.isRequired,
  lastUpdated: React.PropTypes.object.isRequired,
};
