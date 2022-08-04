import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
  appIcon: {
    width: 32,
    height: 32,
  },
}));

export const AppLogo = ({ className }: { className: string }) => {
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
        data-testid="applogo__image"
      />
      <div style={{ width: 20 }} />
      <Typography variant="h6" noWrap data-testid="applogo__title">
        {t('label.app-title')}
      </Typography>
    </Box>
  );
};
