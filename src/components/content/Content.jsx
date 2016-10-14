// Dependencies
import React from 'react';
import SectionTitleBar from '../SectionTitleBar/SectionTitleBar.jsx';
import ReminderForm from '../ReminderForm/ReminderForm.jsx';
import Table from 'react-toolbox/lib/table/Table';
import Button from 'react-toolbox/lib/button';
import TableTheme from 'react-toolbox/lib/table/theme.scss';

// Styles
import styles from './Content.scss';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.processReminders = this.processReminders.bind(this);
    this.getPendingReminders = this.getPendingReminders.bind(this);
    this.getShownReminders = this.getShownReminders.bind(this);
    this.addReminder = this.addReminder.bind(this);
    this.removeReminder = this.removeReminder.bind(this);

    this.state = {
      reminders: (
          window.localStorage.reminders
          &&
          JSON.parse(window.localStorage.reminders)
        ) || [],
    }
  }

  processReminders() {
    let remindersChanged = false;
    this.state.reminders.forEach((reminder) => {
      if(!reminder.shownAt) {
        remindersChanged = true;
        reminder.time--;
        if(reminder.time == 0) {
          Notification.requestPermission((status) => {
            new Notification(reminder.name, {
              body: reminder.description
            });
          });

          reminder.shownAt = new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
        }
      }
    });

    if(remindersChanged) {
      this.setState({
          reminders: [...this.state.reminders]
        },
        () => {
          window.localStorage.reminders = JSON.stringify(this.state.reminders);
        }
      );
    }
  }

  componentDidMount() {
    setInterval(this.processReminders, 1000);
  }

  addReminder(reminder) {
    this.setState
      ((state) => ({
        reminders: [...state.reminders, reminder]
      }),
      () => {
        window.localStorage.reminders = JSON.stringify(this.state.reminders);
      }
    );
  }

  removeReminder(index) {
    this.setState
      ((state) => {
        state.reminders.splice(index, 1);
        return {
          reminders: state.reminders
        }
      },
      () => {
        window.localStorage.reminders = JSON.stringify(this.state.reminders);
      }
    );
  }

  getPendingReminders() {
    const reminders = [];

    this.state.reminders.forEach((reminder, index) =>
      reminder.time > 0 && reminders.push(
        Object.assign({}, { index, ...reminder })
      ));

    return reminders.map((reminder) =>
      Object.assign(reminder, {
        remove:
          <Button
            label="Remove"
            onClick={() => this.removeReminder(reminder.index)}
            raised
            accent
          />,
      })
    );
  }

  getShownReminders() {
    const reminders = [];

    this.state.reminders.forEach((reminder, index) =>
      reminder.shownAt && reminders.push(
        Object.assign({}, { index, ...reminder })
      ));

    return reminders.map((reminder) =>
      Object.assign(reminder, {
        remove:
          <Button
            label="Remove"
            onClick={() => this.removeReminder(reminder.index)}
            raised
            accent
          />,
      })
    );
  }

  render() {
    const ReminderModel = {
      name: {type: String},
      description: {type: String},
    };

    const PendingReminderModel = Object.assign({}, ReminderModel, {
        time: {type: String},
        remove: {type: Object},
      }
    );

    const ShownReminderModel = Object.assign({}, ReminderModel, {
        'shownAt': {type: String},
        remove: {type: Object},
      }
    );

    return (
      <div className={styles.content}>
        <div className={styles.addReminder}>
          <SectionTitleBar flat>
            Add Reminder
          </SectionTitleBar>
          <ReminderForm addReminder={this.addReminder}/>
        </div>
        <div className={styles.reminders}>
          <SectionTitleBar flat accent>
            Pending Reminders
          </SectionTitleBar>
          <div className={styles.pendingReminders}>
            <Table
              theme={TableTheme}
              model={PendingReminderModel}
              selectable={false}
              source={this.getPendingReminders()}
            />
          </div>
          <SectionTitleBar flat>
            Shown Reminders
          </SectionTitleBar>
          <div className={styles.shownReminders}>
            <Table
              theme={TableTheme}
              model={ShownReminderModel}
              selectable={false}
              source={this.getShownReminders()}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
