import { Fragment, KeyboardEvent, MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  Link,
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

import './Top.css';
import { setDate } from '../stores/slices/viewSlice';
import ListItemLink from '../components/atoms/ListItemList';
import DateInput, { formatDate, MaxDate, MinDate } from '../components/DateInput';
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

const Top = (props: {} & RouteComponentProps<{ date: string }>) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [anchor, setAnchor] = useState<Anchor>('left');
  const [anchorState, setAnchorState] = useState({ top: false, left: false, bottom: false, right: false });

  const targetDate = props.match.params.date ? new Date(props.match.params.date) : new Date();
  if (isNaN(targetDate.getDate())) {
    toast.info('日付は yyyy-MM-dd の形式で指定してください。');
    console.log(`FormatError: ${props.match.params.date}`);
    history.push(`/`);
    return null;
  }
  if (targetDate < MinDate || MaxDate < targetDate) {
    toast.info(`日付は ${formatDate(MinDate)} から ${formatDate(MaxDate)} までの範囲で指定してください。`);
    console.log(`RangeError: ${targetDate}`);
    history.push(`/`);
    return null;
  }
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
        こよみ
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
        <ListItemLink href="https://github.com/kawasawa/koyomi" target="_blank">
          <ListItemIcon>
            <GitHub />
          </ListItemIcon>
          <ListItemText primary="リポジトリ" />
        </ListItemLink>
        <ListItemLink href="https://kawasawa.github.io/" target="_blank">
          <ListItemIcon>
            <AccountBox />
          </ListItemIcon>
          <ListItemText primary="作成者" />
        </ListItemLink>
      </List>
    </Box>
  );

  return (
    <Box className={classes.root}>
      <AppBar position="sticky" color="default" className={classes.header}>
        <Toolbar>
          <Fragment key={anchor}>
            <IconButton className={classes.menuButton} edge="start" onClick={toggleDrawer(anchor, true)}>
              <Menu />
            </IconButton>
            <Drawer anchor={anchor} open={anchorState[anchor]} onClose={toggleDrawer(anchor, false)}>
              {menuList(anchor)}
            </Drawer>
          </Fragment>
          {appLogo(classes.titleBox)}
          <div style={{ flex: '1 0 0' }} />
          <DateInput />
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box className={classes.content}>
          <DateResult />
        </Box>
      </Container>
      <Box className={classes.footer}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'© '}
          <Link color="inherit" href="https://kawasawa.github.io/" target="_blank">
            Kazuki Awasawa
          </Link>
          {' All Rights Reserved.'}
        </Typography>
      </Box>
    </Box>
  );
};

export default Top;
