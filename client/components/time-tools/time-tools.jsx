import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Segment, Header, Grid, Icon, Button, Input, Message, Label } from 'semantic-ui-react';

import { map } from 'lodash';
import m from 'moment';
import Clipboard from 'clipboard';

TimeTools = class TimeTools extends Component {

  constructor(props) {
    super(props);

    this.format12 = 'M-D-YYYY, h:mm:ss a';
    this.format24 = 'MMMM Do YYYY, HH:mm:ss';

    this.state = {
      now: m(),
      format: 'format12',
      smallScreen: window.innerWidth < 980,
    };
  }

  render() {
    const now = this.state.now.format();
    const nowUnix = this.state.now.unix();

    return (
      <Container className='time-tools'>
        <Header as='h1' icon={<Icon name='clock' color='violet'/>} content='Time Tools' subheader='Using Moment.js'/>

        <Grid stackable>
          <Grid.Row columns='2' width='equal'>
            <Grid.Column>
              <label>Date String</label>
              <Input fluid
                id='time-now'
                name='time-now'
                label={<Button className='cp-btn' color='teal' icon='copy' content='Copy' labelPosition='right' data-clipboard-target='#time-now > input'/>}
                labelPosition='right'
                value={ now }
                onChange={(e) => this._parseNewTime(e)}
              />
            </Grid.Column>
            <Grid.Column>
              <label>Unix Timestamp</label>
              <Input fluid
                id='time-now-unix'
                name='time-now-unix'
                label={<Button className='cp-btn' color='teal' icon='copy' content='Copy' labelPosition='right' data-clipboard-target='#time-now-unix > input'/>}
                labelPosition='right'
                value={ nowUnix }
                onChange={(e) => this._parseNewTime(e)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid doubling >
          <Grid.Row columns={this.state.smallScreen ? '2' : '6' }>
            { this._renderSetTimeButtons() }
          </Grid.Row>
          <Grid.Row columns={this.state.smallScreen ? '2' : '6' } width='equal'>
            { this._renderAddTimeColumns() }
          </Grid.Row>
        </Grid>

        <Message info>
          <p>Clicking Copy selects the text and also copies to the clipboard for you</p>

          <p>You can paste a new time string or unix time stamp into the input fields above.</p>

          <p>If you have suggestions or requests for this tool please send them to <a href="mailto:kyle@kylerader.ninja">kyle@kylerader.ninja</a></p>
        </Message>

      </Container>
    );
  }

  _renderSetTimeButtons() {
    const buttons = [
      { text: 'Set Now', onClick: () => this.setState({ now: m() }) },
      { text: 'Begin Hour', onClick: () => this._startOf('hour') },
      { text: 'Begin Day', onClick: () => this._startOf('day') },
      { text: 'Begin Week', onClick: () => this._startOf('week') },
      { text: 'Begin Month', onClick: () => this._startOf('month') },
      { text: 'Begin Year', onClick: () => this._startOf('year') },
    ];
    return buttons.map((btn) => <Grid.Column key={ btn.text }><Button basic fluid content={ btn.text } icon='clock' labelPosition='right' onClick={ btn.onClick }/></Grid.Column>);
  }

  _parseNewTime(e) {
    const { name, value } = e.target;

    if (name === 'time-now') {
      try {
        const newTime = m(value);
        this.setState({ now: newTime });
      }
      catch(ex) {
        console.log(`Could not parse time string "${value}" into a moment!`);
      }
    } else if (name ==='time-now-unix') {
      try {
        const newTime = m.unix(value);
        this.setState({ now: newTime });
      }
      catch(ex) {
        console.log(`Could not parse unix timestamp "${value}" into a moment!`);
      }
    }
  }

  _renderAddTimeColumns() {
    const units = { minute: 15, hour: 1, day: 1, week: 1, month: 1, year: 1 };
    return map(units, (amount, unit) => (
      <Grid.Column key={ unit }>
        <Button.Group fluid size='tiny'>
          <Button basic color='red' icon='minus' onClick={() => this._addTime({ [unit]: -amount }) }/>
          <Button basic content={ `${unit.slice(0,1).toUpperCase()}${unit.slice(1)}` }/>
          <Button basic color='green' icon='plus' onClick={() => this._addTime({ [unit]: amount }) }/>
        </Button.Group>
      </Grid.Column>
    ));
  }

  _startOf(unit) {
    this.setState({ now: this.state.now.startOf(unit) });
  }

  _addTime(time) {
    this.setState({ now: this.state.now.add(time) });
  }

  componentDidMount() {
    this.clipboard = new Clipboard('.cp-btn');
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }
}
