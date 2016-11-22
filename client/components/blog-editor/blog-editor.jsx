import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/markdown';
import 'brace/theme/monokai';

BlogEditor = class BlogEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  _onEditorChange(e) {

  }

  render() {
    return (
    <Authed params={{accessLevel: "admin"}}>
      <div className="ui container">
        <div className="ui header">
          <i className="green edit icon"></i>
          <div className="content">
            <h2>Editor</h2>
          </div>
        </div>

        <div className="ui grid">
          <div className="four wide column">
            <PostListSelector />
          </div>
          <div className="twelve wide column">
            <div className="text-area">
              <AceEditor
                mode="markdown"
                theme="monokai"
                onChange={ (e) => this._onEditorChange(e) }
                name="ace-editor"
                editorProps={{$blockScrolling: true}}
                width="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </Authed>
    );
  }
}
