import { AppBar, colors, Container, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { constants } from '../constants';
import { formatDate } from '../utils/date';
import { JaDatePicker } from './controls';

const useStyles = makeStyles((theme) => ({
  appbar: {
    position: 'sticky',
    background: colors.brown[50],
  },
  appIcon: {
    width: '32px',
    height: '32px',
    margin: '10px',
    background: 'transparent',
  },
  appTitle: {
    color: colors.grey[800],
    marginLeft: '10px',
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  margin: {
    flex: '1 0 0',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  noMPifXS: {
    [theme.breakpoints.down('xs')]: {
      margin: '0px',
      padding: '0px',
    },
  },
  datePicker: {
    width: '220px',
    margin: '0px',
    '& .MuiFilledInput-root': {
      // TextField の背景色を変更する
      backgroundColor: 'transparent',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
}));

export type HeaderProps = {
  date: Date;
};

export const Header = (props: HeaderProps) => {
  const [t] = useTranslation();
  const history = useHistory();

  const onChange = useCallback(
    (date: MaterialUiPickersDate) => {
      if (date) history.push(`/${formatDate(date, '-')}`);
    },
    [history]
  );

  const classes = useStyles();
  return (
    <AppBar className={classes.appbar}>
      <Container className={classes.noMPifXS} maxWidth="xl">
        <Toolbar className={classes.noMPifXS}>
          <img
            className={classes.appIcon}
            src={`${process.env.PUBLIC_URL}/logo192.png`}
            alt="logo"
            loading="lazy"
            data-testid="header__appicon"
          />
          <Typography className={classes.appTitle} variant="h6" noWrap data-testid="header__apptitle">
            {constants.meta.title}
          </Typography>
          <div className={classes.margin} />
          <JaDatePicker
            className={classes.datePicker}
            value={props.date}
            name="date"
            label={t('label.date')}
            minDate={constants.system.minDate}
            maxDate={constants.system.maxDate}
            margin="normal"
            variant="inline"
            inputVariant="filled"
            disableToolbar={false}
            animateYearScrolling={true}
            disableKeyboardInput={true}
            // KeyboardDatePicker の下線を非表示にできない
            // https://github.com/mui/material-ui-pickers/issues/1039
            //
            // InputProps={{
            //   disableUnderline: true,
            // }}
            //
            // どうしても消せないので createTheme で override した
            //
            PopoverProps={{
              transformOrigin: { horizontal: 'left', vertical: 'top' },
            }}
            onChange={onChange}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
