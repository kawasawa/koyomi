import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 275,
  },
  image: {
    height: 140,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: theme.spacing(2),
  },
  titleBox: {
    display: 'flex',
  },
  balloon: {
    display: 'block',
    boxSizing: 'border-box',
    margin: '-3px 0 0 5px',
    padding: '0px 10px',
    background: '#fafafa',
    border: '1px solid #aaa',
    borderRadius: 3,
  },
  balloonBefore: {
    display: 'block',
    width: 10,
    height: 10,
    margin: '-6px 0 0 10px',
    background: '#fafafa',
    borderLeft: '1px solid #aaa',
    borderBottom: '1px solid #aaa',
    transform: 'rotate(135deg)',
    WebkitTransform: 'rotate(135deg)',
  },
}));

export type DateResultItemProps = {
  title: string;
  value?: string;
  kana?: string;
  summary1?: string;
  summary2?: string;
  balloon?: string;
  url?: string;
  icon?: string;
  image: string;
};

export const DateResultItem = ({ props }: { props: DateResultItemProps }) => {
  console.log('DEBUG: render DataResultItem');

  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.image} component="img" src={props.image} data-testid="data-result-image" />
      <CardActionArea onClick={() => window.open(props.url, '_blank', 'noreferrer')}>
        <CardContent>
          <Box className={classes.titleBox}>
            <Typography variant="subtitle1" color="primary" gutterBottom data-testid="data-result-title">
              {props.title}
            </Typography>
            {props.icon ? (
              <img className={classes.icon} src={props.icon} alt="icon" loading="lazy" data-testid="data-result-icon" />
            ) : null}
          </Box>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <Box ml={1}>
                <Typography variant="h5" color="textPrimary" gutterBottom data-testid="data-result-value">
                  {props.value}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box ml={1.5}>
                <Typography variant="h6" color="textSecondary" gutterBottom data-testid="data-result-kana">
                  {props.kana}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Typography variant="body1" color="textPrimary" gutterBottom data-testid="data-result-summary1">
            {props.summary1}
          </Typography>
          <Typography variant="body2" color="textSecondary" data-testid="data-result-summary2">
            {props.summary2}
          </Typography>
        </CardContent>
        {props.balloon && (
          <CardActions>
            <Box className={classes.balloon}>
              <Box className={classes.balloonBefore} />
              <Typography variant="subtitle2" color="textPrimary" gutterBottom data-testid="data-result-balloon">
                {props.balloon}
              </Typography>
            </Box>
          </CardActions>
        )}
      </CardActionArea>
    </Card>
  );
};
