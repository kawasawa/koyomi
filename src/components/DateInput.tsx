import { makeStyles } from '@material-ui/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { AppState } from '../stores/root';
import { formatDate } from '../utils/date';
import JaDatePicker from './atoms/JaDatePicker';

const useStyles = makeStyles(() => ({
  datePicker: {
    width: '25ch',
  },
}));

const DateInput = memo(function _({ minDate, maxDate }: { minDate?: Date; maxDate?: Date }) {
  console.log('DEBUG: render DataInput');

  const history = useHistory();
  const classes = useStyles();
  const [t] = useTranslation();
  const { date } = useSelector((state: AppState) => state.view);

  return (
    <JaDatePicker
      className={classes.datePicker}
      value={date}
      name="date"
      label={t('label.date')}
      minDate={minDate}
      maxDate={maxDate}
      margin="normal"
      variant="inline"
      inputVariant="filled"
      disableToolbar={false}
      animateYearScrolling={true}
      disableKeyboardInput={true}
      onChange={(date) => {
        if (date) history.push(`/${formatDate(date)}`);
      }}
      data-testid="date-picker"
    />
  );
});

export default DateInput;
