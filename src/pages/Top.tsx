import { KeyboardEvent, MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { AccountBox, GitHub, Menu } from '@material-ui/icons';
import clsx from 'clsx';
import 'date-fns';
import * as util from 'util';

import './Top.css';
import {
  SYSTEM_MAX_DATE,
  SYSTEM_MIN_DATE,
  LOG_E_INVALID_FORMAT,
  LOG_E_OUT_OF_RANGE,
  URL_CREATORPAGE,
  URL_REPOSITORY,
} from '../constant';
import { setDate } from '../stores/slices/viewSlice';
import { formatDate } from '../utils/date';
import ListItemLink from '../components/atoms/ListItemLink';
import Copyright from '../components/Copyright';
import DateInput from '../components/DateInput';
import DateResult from '../components/DateResult';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuList: {
    width: 220,
  },
  menuListFull: {
    width: 'auto',
  },
  menuTopBox: {
    display: 'flex',
    margin: theme.spacing(3),
  },
  titleBox: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  appIcon: {
    width: 32,
    height: 32,
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

const Top = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [t] = useTranslation();

  const anchor: Anchor = 'left';
  const [anchorState, setAnchorState] = useState({ top: false, left: false, bottom: false, right: false });

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
    toast.info(util.format(t('message.error.date-range'), formatDate(SYSTEM_MIN_DATE), formatDate(SYSTEM_MAX_DATE)));
    history.push(`/`);
    return null;
  }
  console.info(`Info: TargetDate = ${targetDate}`);
  dispatch(setDate(targetDate));

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    var e = event as KeyboardEvent;
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) return;
    setAnchorState({ ...anchorState, [anchor]: open });
  };

  const appLogo = (className: string) => (
    <Box className={className}>
      <img className={classes.appIcon} src={`${process.env.PUBLIC_URL}/logo192.png`} alt="logo" loading="lazy" />
      <div style={{ width: 20 }} />
      <Typography variant="h6" noWrap>
        {t('label.app-title')}
      </Typography>
    </Box>
  );

  const menuList = (anchor: Anchor) => (
    <Box
      className={clsx(classes.menuList, {
        [classes.menuListFull]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {appLogo(classes.menuTopBox)}
      <Divider />
      <List>
        <ListItemLink href={URL_REPOSITORY} target="_blank">
          <ListItemIcon>
            <GitHub />
          </ListItemIcon>
          <ListItemText primary={t('label.repository')} />
        </ListItemLink>
        <ListItemLink href={URL_CREATORPAGE} target="_blank">
          <ListItemIcon>
            <AccountBox />
          </ListItemIcon>
          <ListItemText primary={t('label.creator')} />
        </ListItemLink>
      </List>
    </Box>
  );

  return (
    <Box className={classes.root}>
      <AppBar className={classes.header} position="sticky" color="default">
        <Toolbar>
          <IconButton className={classes.menuButton} edge="start" onClick={toggleDrawer(anchor, true)}>
            <Menu />
          </IconButton>
          <Drawer anchor={anchor} open={anchorState[anchor]} onClose={toggleDrawer(anchor, false)}>
            {menuList(anchor)}
          </Drawer>
          {appLogo(classes.titleBox)}
          <div style={{ flex: '1 0 0' }} />
          <DateInput minDate={SYSTEM_MIN_DATE} maxDate={SYSTEM_MAX_DATE} />
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box className={classes.content}>
          <DateResult />
        </Box>
      </Container>
      <Box className={classes.footer}>
        <Copyright />
      </Box>
    </Box>
  );
};

export default Top;
