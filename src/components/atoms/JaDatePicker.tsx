import { PropTypes, TextFieldProps } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ParsableDate } from '@material-ui/pickers/constants/prop-types';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { WrapperVariant } from '@material-ui/pickers/wrappers/Wrapper';
import 'date-fns';
import jaLocale from 'date-fns/locale/ja';
import DateFnsUtils from '@date-io/date-fns';

import { getJpWeek } from '../../models/CalendarInfo';

class JaDateFnsUtils extends DateFnsUtils {
  getYearText = (date: Date) => this.format(date, 'y年');
  getDatePickerHeaderText = (date: Date) => `${this.format(date, 'M月 d日')} (${getJpWeek(date).value})`;
  getCalendarHeaderText = (date: Date) => this.format(date, 'y年 M月');
}

type Props = {
  value: ParsableDate;
  name: string;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  okLabel?: string;
  cancelLabel?: string;
  placeholder?: string;
  maxDate?: ParsableDate;
  minDate?: ParsableDate;
  margin?: PropTypes.Margin;
  variant?: WrapperVariant;
  inputVariant?: TextFieldProps['variant'];
  disabled?: boolean;
  disableToolbar?: boolean;
  animateYearScrolling?: boolean;
  disableKeyboardInput?: boolean;
  onChange: (date: MaterialUiPickersDate | null, value?: string | null) => void;
};

const JaDatePicker = (props: Props) => {
  return (
    <MuiPickersUtilsProvider utils={JaDateFnsUtils} locale={jaLocale}>
      <KeyboardDatePicker
        {...props}
        okLabel={props.okLabel ?? 'OK'}
        cancelLabel={props.cancelLabel ?? 'キャンセル'}
        format="yyyy年 MM月 dd日"
        animateYearScrolling={props.animateYearScrolling ?? true}
        InputProps={{ readOnly: props.disableKeyboardInput ?? false }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default JaDatePicker;
