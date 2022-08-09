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

export type DateInputProps = {
  initialDate: Date;
  minDate?: Date;
  maxDate?: Date;
};

export const DateInput = ({ ...props }: DateInputProps) => {
  const [t] = useTranslation();
  const history = useHistory();
  const classes = useStyles();
  return (
    <JaDatePicker
      className={classes.datePicker}
      value={props.initialDate}
      name="date"
      label={t('label.date')}
      minDate={props.minDate}
      maxDate={props.maxDate}
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
