import { Link, Typography } from '@material-ui/core';

import { APP_AUTHOR, URL_CREATORPAGE } from '../constant';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center" data-testid="copyright">
      {'© '}
      <Link color="inherit" href={URL_CREATORPAGE} target="_blank" data-testid="crator-page-url">
        {APP_AUTHOR}
      </Link>
      {' All Rights Reserved.'}
    </Typography>
  );
};

export default Copyright;
