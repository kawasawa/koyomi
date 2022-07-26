import { Box, Divider, Drawer, IconButton, List, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import { AccountBox, GitHub, Menu } from '@material-ui/icons';
import clsx from 'clsx';
import React, { KeyboardEvent, MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { URL_CREATORPAGE, URL_REPOSITORY } from '../constants';
import { AppLogo } from './AppLogo';
import { ListItemLink } from './atoms';

const useStyles = makeStyles((theme) => ({
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
}));

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export const DrawerMenu = ({ anchor }: { anchor: Anchor }) => {
  console.log('DEBUG: render DrawerMenu');

  const [anchorState, setAnchorState] = useState({ top: false, left: false, bottom: false, right: false });

  const classes = useStyles();
  const [t] = useTranslation();

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    const e = event as KeyboardEvent;
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) return;
    setAnchorState({ ...anchorState, [anchor]: open });
  };

  return (
    <>
      <IconButton
        className={classes.menuButton}
        edge="start"
        onClick={toggleDrawer(anchor, true)}
        data-testid="menu-button"
      >
        <Menu />
      </IconButton>
      <Drawer anchor={anchor} open={anchorState[anchor]} onClose={toggleDrawer(anchor, false)}>
        <Box
          className={clsx(classes.menuList, {
            [classes.menuListFull]: anchor === 'top' || anchor === 'bottom',
          })}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <AppLogo className={classes.menuTopBox} />
          <Divider />
          <List data-testid="menu-list">
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
      </Drawer>
    </>
  );
};
