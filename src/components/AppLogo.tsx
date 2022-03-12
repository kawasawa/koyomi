import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  appIcon: {
    width: 32,
    height: 32,
  },
}));

const AppLogo = memo(function _({ className }: { className: string }) {
  console.log('DEBUG: render AppLog');

  const classes = useStyles();
  const [t] = useTranslation();

  return (
    <Box className={className}>
      <img
        className={classes.appIcon}
        src={`${process.env.PUBLIC_URL}/logo192.png`}
        alt="logo"
        loading="lazy"
        data-testid="app-logo"
      />
      <div style={{ width: 20 }} />
      <Typography variant="h6" noWrap data-testid="app-title">
        {t('label.app-title')}
      </Typography>
    </Box>
  );
});

export default AppLogo;
