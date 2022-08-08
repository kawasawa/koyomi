import {
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Fade,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useInView } from 'react-intersection-observer';

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

export type DateResultProps = {
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

export const DateResult = ({ props }: { props: DateResultProps }) => {
  console.log('DEBUG: render DataResult');

  const { ref, inView } = useInView({ rootMargin: '100px' });

  const classes = useStyles();
  return (
    <Fade ref={ref} in={inView} timeout={1000}>
      <Card className={classes.card}>
        {/* スマホでスクロールすることを考えると、反応しない範囲を設けた方が良いように思う */}
        <CardMedia
          className={classes.cardMedia}
          component="img"
          src={props.image}
          alt="card-media"
          data-testid="dateResult__image"
        />

        <CardActionArea onClick={() => window.open(props.url, '_blank')} data-testid="dateResult__actionArea">
          <CardContent>
            <Box className={classes.cardTitle}>
              <Typography variant="subtitle1" color="primary" gutterBottom data-testid="dateResult__title">
                {props.title}
              </Typography>
              {props.icon && (
                <img
                  className={classes.cardTitleIcon}
                  src={props.icon}
                  alt="card-title-icon"
                  loading="lazy"
                  data-testid="dateResult__icon"
                />
              )}
            </Box>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <Box ml={1}>
                  <Typography variant="h5" color="textPrimary" gutterBottom data-testid="dateResult__value">
                    {props.value}
                  </Typography>
                </Box>
              </Grid>
              <Grid item>
                <Box ml={1.5}>
                  <Typography variant="h6" color="textSecondary" gutterBottom data-testid="dateResult__kana">
                    {props.kana}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Typography variant="body1" color="textPrimary" gutterBottom data-testid="dateResult__summary1">
              {props.summary1}
            </Typography>
            <Typography variant="body2" color="textSecondary" data-testid="dateResult__summary2">
              {props.summary2}
            </Typography>
          </CardContent>
          {props.balloon && (
            <CardActions>
              <Box className={classes.balloonTip}>
                <Box className={classes.balloonTipTriangle} />
                <Typography variant="subtitle2" color="textPrimary" gutterBottom data-testid="dateResult__balloon">
                  {props.balloon}
                </Typography>
              </Box>
            </CardActions>
          )}
        </CardActionArea>
      </Card>
    </Fade>
  );
};
