import 'date-fns';

import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, KeyboardDatePickerProps, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import jaLocale from 'date-fns/locale/ja';
import React, { useCallback, useState } from 'react';

export type JaDatePickerProps = {
  disableKeyboardInput?: boolean | undefined;
} & KeyboardDatePickerProps;

export class JaDateFnsUtils extends DateFnsUtils {
  // ポップアップヘッダーの年
  getYearText = (date: Date) => {
    const era = getEra(date);
    return era ? `${era} (${date.getFullYear()}) 年` : 'y年';
  };
  // ポップアップヘッダーの月日
  getDatePickerHeaderText = (date: Date) => {
    return `${this.format(date, 'M月 d日')} (${getJpWeek(date)})`;
  };
  // ポップアップカレンダーの年月
  getCalendarHeaderText = (date: Date) => {
    const era = getEra(date);
    const jpMonth = getJpMonth(date);
    return era ? `${era} 年 ${date.getMonth() + 1}月 (${jpMonth})` : `y年 M月 (${jpMonth})`;
  };
}

export const JaDatePicker = ({ disableKeyboardInput, ...props }: JaDatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>(props.value ? new Date(props.value.toString()) : undefined);
  const [open, setOpen] = useState<boolean>(false);

  const onClick = useCallback(() => {
    if (disableKeyboardInput) setOpen(true);
  }, [disableKeyboardInput, setOpen]);
  const onOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);
  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const onChange = useCallback(
    (date: MaterialUiPickersDate) => {
      if (!date) return;
      setDate(new Date(date.toString()));
    },
    [setDate]
  );

  return (
    <MuiPickersUtilsProvider utils={JaDateFnsUtils} locale={jaLocale}>
      <KeyboardDatePicker
        {...props}
        label={`${date ? `${getEra(date)}年 ${getJpMonth(date)}` : undefined}`}
        format="yyyy年 MM月 dd日"
        okLabel={props.okLabel ?? 'OK'}
        cancelLabel={props.cancelLabel ?? 'キャンセル'}
        InputProps={{ readOnly: disableKeyboardInput ?? false }}
        onClick={onClick}
        onOpen={onOpen}
        onClose={onClose}
        onChange={(date, value) => {
          onChange(date);
          props.onChange && props.onChange(date, value);
        }}
        open={open}
      />
    </MuiPickersUtilsProvider>
  );
};

const getEra = (date: Date) => {
  const yyyyMMdd = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  for (let i = ERAS.length - 1; 0 <= i; i--) {
    if ((ERAS[i].date ?? NaN) <= yyyyMMdd) {
      const eraYear = date.getFullYear() - Math.floor(ERAS[i].date / 10000) + 1;
      return `${ERAS[i].name}${eraYear}`;
    }
  }
  return undefined;
};

export const getJpWeek = (date: Date) => JP_WEEKS[date.getDay()];

export const getJpMonth = (date: Date) => JP_MONTHS[date.getMonth()];

const ERAS = [
  { name: '慶応', date: 18650408 },
  { name: '明治', date: 18680908 },
  { name: '大正', date: 19120730 },
  { name: '昭和', date: 19261225 },
  { name: '平成', date: 19890108 },
  { name: '令和', date: 20190501 },
];

export const JP_MONTHS = [
  '睦月',
  '如月',
  '弥生',
  '卯月',
  '皐月',
  '水無月',
  '文月',
  '葉月',
  '長月',
  '神無月',
  '霜月',
  '師走',
];

export const JP_WEEKS = ['日', '月', '火', '水', '木', '金', '土'];
