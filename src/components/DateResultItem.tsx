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
    minWidth: '275px',
  },
  cardMedia: {
    height: '140px',
  },
  cardTitle: {
    display: 'flex',
  },
  cardTitleIcon: {
    width: '24px',
    height: '24px',
    marginLeft: theme.spacing(2),
  },
  balloonTip: {
    display: 'block',
    boxSizing: 'border-box',
    margin: '-3px 0 0 5px',
    padding: '0px 10px',
    background: '#fafafa',
    border: '1px solid #aaa',
    borderRadius: '3px',
  },
  balloonTipTriangle: {
    display: 'block',
    width: '10px',
    height: '10px',
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
      <CardActionArea onClick={() => window.open(props.url, '_blank')} data-testid="dateResultItem__actionArea">
        <CardMedia
          className={classes.cardMedia}
          component="img"
          src={props.image}
          alt="card-media"
          data-testid="dateResultItem__image"
        />
        <CardContent>
          <Box className={classes.cardTitle}>
            <Typography variant="subtitle1" color="primary" gutterBottom data-testid="dateResultItem__title">
              {props.title}
            </Typography>
            {props.icon && (
              <img
                className={classes.cardTitleIcon}
                src={props.icon}
                alt="card-title-icon"
                loading="lazy"
                data-testid="dateResultItem__icon"
              />
            )}
          </Box>
          <Grid container direction="row" alignItems="center">
            <Grid item>
              <Box ml={1}>
                <Typography variant="h5" color="textPrimary" gutterBottom data-testid="dateResultItem__value">
                  {props.value}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box ml={1.5}>
                <Typography variant="h6" color="textSecondary" gutterBottom data-testid="dateResultItem__kana">
                  {props.kana}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Typography variant="body1" color="textPrimary" gutterBottom data-testid="dateResultItem__summary1">
            {props.summary1}
          </Typography>
          <Typography variant="body2" color="textSecondary" data-testid="dateResultItem__summary2">
            {props.summary2}
          </Typography>
        </CardContent>
        {props.balloon && (
          <CardActions>
            <Box className={classes.balloonTip}>
              <Box className={classes.balloonTipTriangle} />
              <Typography variant="subtitle2" color="textPrimary" gutterBottom data-testid="dateResultItem__balloon">
                {props.balloon}
              </Typography>
            </Box>
          </CardActions>
        )}
      </CardActionArea>
    </Card>
  );
};
