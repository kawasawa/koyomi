import { AppBar, Box, Container, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  appbar: {
    position: 'sticky',
  },
  applogo: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  appIcon: {
    width: '32px',
    height: '32px',
    marginRight: '20px',
  },
}));

export const Header = ({ children }: { children?: React.ReactNode }) => {
  const [t] = useTranslation();
  const classes = useStyles();
  return (
    <AppBar className={classes.appbar} color="default">
      <Container maxWidth="xl">
        <Toolbar>
          <Box className={classes.applogo}>
            <img
              className={classes.appIcon}
              src={`${process.env.PUBLIC_URL}/logo192.png`}
              alt="logo"
              loading="lazy"
              data-testid="header__applogo--icon"
            />
            <Typography variant="h6" noWrap data-testid="header__applogo--title">
              {t('label.app-title')}
            </Typography>
          </Box>
          <div style={{ flex: '1 0 0' }} />
          {children}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
