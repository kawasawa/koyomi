import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import { AppState } from '../stores/root';
import JaDatePicker from './atoms/JaDatePicker';

const useStyles = makeStyles((theme) => ({
  datePicker: {
    width: '25ch',
  },
}));

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = ('00' + (date.getMonth() + 1)).slice(-2);
  const day = ('00' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

const DateInput = () => {
  const history = useHistory();
  const classes = useStyles();
  const { date } = useSelector((state: AppState) => state.view);

  return (
    <JaDatePicker
      className={classes.datePicker}
      value={date}
      name="date"
      label="日付"
      minDate={MinDate}
      maxDate={MaxDate}
      margin="normal"
      variant="inline"
      inputVariant="filled"
      disableToolbar={false}
      animateYearScrolling={true}
      disableKeyboardInput={true}
      onChange={(date) => history.push(`/${formatDate(date!)}`)}
    />
  );
};

export default DateInput;

export const MinDate = new Date('1900-01-01 00:00:00');
export const MaxDate = new Date('2099-12-31 23:59:59');
