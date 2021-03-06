import { Link, Typography } from '@material-ui/core';
import React from 'react';

import { APP_AUTHOR, URL_CREATORPAGE } from '../constants';

export const Copyright = () => {
  console.log('DEBUG: render Copyright');

  return (
    <Typography variant="body2" color="textSecondary" align="center" data-testid="copyright">
      {'© '}
      <Link color="inherit" href={URL_CREATORPAGE} target="_blank" data-testid="creator-page-url">
        {APP_AUTHOR}
      </Link>
      {' All Rights Reserved.'}
    </Typography>
  );
};
