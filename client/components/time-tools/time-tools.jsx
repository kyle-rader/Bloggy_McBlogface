import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Segment, Header, Grid, Icon, Button, Input, Message, Label } from 'semantic-ui-react';

import { debounce } from 'lodash';
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
    };
  }

  render() {
    const now = this.state.now.format();
    const nowUnix = this.state.now.unix();

    return (
      <Container className='time-tools'>
        <Header as='h1' icon={<Icon name='clock' color='violet'/>} content='Time Tools' subheader='Using Moment.js'/>

        <Button.Group size='small' basic>
          <Button content='Set Now' icon='clock' labelPosition='right' onClick={ () => this.setState({ now: m() }) }/>
          <Button content='Begin Hour' icon='clock' labelPosition='right' onClick={ () => this._startOf('hour') }/>
          <Button content='Begin Day' icon='clock' labelPosition='right' onClick={ () => this._startOf('day') }/>
          <Button content='Begin Week' icon='clock' labelPosition='right' onClick={ () => this._startOf('week') }/>
          <Button content='Begin Month' icon='clock' labelPosition='right' onClick={ () => this._startOf('month') }/>
          <Button content='Begin Year' icon='clock' labelPosition='right' onClick={ () => this._startOf('year') }/>
        </Button.Group>

        <br/>
        <br/>

        <Grid>
          <Grid.Row columns='2' width='equal'>
            <Grid.Column>
              <label>Date String</label>
              <Input fluid size='large'
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
              <Input fluid size='large'
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

        <Grid>
          <Grid.Row columns='5' width='equal'>
            { this._renderAddTimeColumns() }
          </Grid.Row>
        </Grid>

        <Message info>
          You can paste a new time string or unix time stamp into the input fields above.<br/><br/>
          If you have suggestions or requests for this tool please send them to <a href="mailto:kyle@kylerader.ninja">kyle@kylerader.ninja</a>
        </Message>

      </Container>
    );
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
    const units = ['hour', 'day', 'week', 'month', 'year'];
    return units.map((unit) => (
      <Grid.Column key={ unit }>
        <Button.Group size='tiny'>
          <Button content={ `${unit.slice(0,1).toUpperCase()}${unit.slice(1)}` }/>
          <Button basic color='red' icon='minus' onClick={() => this._addTime({ [unit]: -1 }) }/>
          <Button basic color='green' icon='plus' onClick={() => this._addTime({ [unit]: 1 }) }/>
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
