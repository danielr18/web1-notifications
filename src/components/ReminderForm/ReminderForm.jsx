import React from 'react';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';

import Reminder from '../ReminderForm/Reminder';

import styles from './ReminderForm.scss'

class ReminderForm extends React.Component {
  constructor(props) {
    super(props);
    this.addReminder = this.addReminder.bind(this);
    this.clearFormFields = this.clearFormFields.bind(this);
    this.state = {
      name: '',
      description: '',
      time: '',
    };
  }

  clearFormFields() {
    this.setState({
      name: '',
      description: '',
      time: ''
    });
  }

  addReminder() {
    const {name, description, time} = this.state;
    const reminder = new Reminder(name, description, time);
    this.props.addReminder(reminder);
  }

  handleChange(name, value) {
    this.setState({
      [name]: value
    });
  };

  handleTimeChange(value) {
    if(value > 0) {
      this.setState({
        time: value
      });
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <Input
          type='text'
          label='Name'
          className="a b"
          value={this.state.name}
          onChange={this.handleChange.bind(this, 'name')}
          maxLength={16}
        />
        <Input
          type='text'
          label='Description'
          multiline
          style={{resize: 'vertical'}}
          // rows="4"
          // Rows not working yet. https://github.com/react-toolbox/react-toolbox/pull/862
          value={this.state.description}
          onChange={this.handleChange.bind(this, 'description')}
        />
        <Input
          type='number'
          className={styles.timeInput}
          label='Seconds'
          min={1}
          value={this.state.time}
          onChange={this.handleTimeChange.bind(this)}
        />
        <div className={styles.actionButtons}>
          <Button
            icon='add'
            label='Add Reminder'
            onClick={this.addReminder}
            raised
            accent
          />
          <Button
            icon='clear'
            label='Clear Fields'
            onClick={this.clearFormFields}
            raised
            primary
          />
        </div>
      </div>
    );
  }
}

export default ReminderForm;
