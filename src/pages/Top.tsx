import 'date-fns';

import { AppBar, Box, Container, makeStyles, Toolbar } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as util from 'util';

import { AppLogo, Copyright, DateInput, DateResult, DrawerMenu } from '../components';
import { LOG_E_INVALID_FORMAT, LOG_E_OUT_OF_RANGE, SYSTEM_MAX_DATE, SYSTEM_MIN_DATE } from '../constants';
import { formatDate } from '../utils/date';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  content: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  footer: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export const Top = () => {
  const history = useHistory();
  const classes = useStyles();
  const [t] = useTranslation();

  const params = useParams<{ date?: string }>();
  console.info(`Info: params.date = ${params.date}`);

  const targetDate = params.date ? new Date(params.date) : new Date();
  if (isNaN(targetDate.getDate())) {
    console.error(`Error: ${LOG_E_INVALID_FORMAT} ${params.date}`);
    toast.info(t('message.error.date-format'));
    history.push(`/`);
    return null;
  }
  if (targetDate < SYSTEM_MIN_DATE || SYSTEM_MAX_DATE < targetDate) {
    console.error(`Error: ${LOG_E_OUT_OF_RANGE} ${targetDate}`);
    toast.info(
      util.format(t('message.error.date-range'), formatDate(SYSTEM_MIN_DATE, '-'), formatDate(SYSTEM_MAX_DATE, '-'))
    );
    history.push(`/`);
    return null;
  }
  console.info(`Info: TargetDate = ${targetDate}`);

  return (
    <Box className={classes.root}>
      <AppBar className={classes.header} position="sticky" color="default">
        <Toolbar>
          <DrawerMenu anchor="left" />
          <AppLogo className={classes.title} />
          <div style={{ flex: '1 0 0' }} />
          <DateInput initialDate={targetDate} minDate={SYSTEM_MIN_DATE} maxDate={SYSTEM_MAX_DATE} />
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box className={classes.content}>
          <DateResult date={targetDate} />
        </Box>
      </Container>
      <Box className={classes.footer}>
        <Copyright />
      </Box>
    </Box>
  );
};
