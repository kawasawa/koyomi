import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { formatDate } from '../utils/date';
import { JaDatePicker } from './controls';

const useStyles = makeStyles(() => ({
  datePicker: {
    width: '25ch',
  },
}));

type DateInputProps = {
  initialDate: Date;
  minDate?: Date;
  maxDate?: Date;
};

export const DateInput = ({ initialDate, minDate, maxDate }: DateInputProps) => {
  console.log('DEBUG: render DataInput');

  const history = useHistory();
  const classes = useStyles();
  const [t] = useTranslation();

  return (
    <JaDatePicker
      className={classes.datePicker}
      value={initialDate}
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
        if (date) history.push(`/${formatDate(date, '-')}`);
      }}
      data-testid="dateInput__picker"
    />
  );
};
