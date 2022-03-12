import 'date-fns';

import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, KeyboardDatePickerProps, MuiPickersUtilsProvider } from '@material-ui/pickers';
import jaLocale from 'date-fns/locale/ja';
import React from 'react';

import { getJpWeek } from '../../models/CalendarInfo';

class JaDateFnsUtils extends DateFnsUtils {
  getYearText = (date: Date) => this.format(date, 'y年');
  getDatePickerHeaderText = (date: Date) => `${this.format(date, 'M月 d日')} (${getJpWeek(date).value})`;
  getCalendarHeaderText = (date: Date) => this.format(date, 'y年 M月');
}

const JaDatePicker = ({
  disableKeyboardInput,
  ...props
}: {
  disableKeyboardInput?: boolean;
} & KeyboardDatePickerProps) => (
  <MuiPickersUtilsProvider utils={JaDateFnsUtils} locale={jaLocale}>
    <KeyboardDatePicker
      {...props}
      format="yyyy年 MM月 dd日"
      okLabel={props.okLabel ?? 'OK'}
      cancelLabel={props.cancelLabel ?? 'キャンセル'}
      InputProps={{ readOnly: disableKeyboardInput ?? false }}
    />
  </MuiPickersUtilsProvider>
);

export default JaDatePicker;
