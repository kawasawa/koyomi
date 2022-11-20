import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  colors,
  Fade,
  Grid,
  makeStyles,
  Typography,
} from '@mui/material';
import React, { useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

// const useStyles = makeStyles((theme) => ({
//   card: {
//     minWidth: '275px',
//     background: colors.grey[100],
//   },
//   cardMedia: {
//     height: '140px',
//   },
//   cardTitle: {
//     display: 'flex',
//   },
//   cardTitleIcon: {
//     width: '24px',
//     height: '24px',
//     marginLeft: theme.spacing(2),
//   },
//   dateTitle: {
//     color: colors.teal[500],
//     marginBottom: '5px',
//   },
//   dateValue: {
//     color: colors.brown[900],
//     marginBottom: '10px',
//     marginLeft: '10px',
//   },
//   dateKana: {
//     color: colors.brown[500],
//     marginBottom: '10px',
//     marginLeft: '15px',
//   },
//   dateSummary1: {
//     color: colors.brown[500],
//     marginBottom: '10px',
//   },
//   dateSummary2: {
//     color: colors.grey[500],
//   },
//   // balloonText: {
//   //   color: colors.grey[700],
//   // },
//   // balloonTip: {
//   //   display: 'block',
//   //   boxSizing: 'border-box',
//   //   margin: '0px 0 0 5px',
//   //   padding: '0px 10px 5px 10px',
//   //   background: '#fafafa',
//   //   border: '1px solid #aaa',
//   //   borderRadius: '3px',
//   // },
//   // balloonTipTriangle: {
//   //   display: 'block',
//   //   width: '10px',
//   //   height: '10px',
//   //   margin: '-6px 0 0 10px',
//   //   background: '#fafafa',
//   //   borderLeft: '1px solid #aaa',
//   //   borderBottom: '1px solid #aaa',
//   //   transform: 'rotate(135deg)',
//   //   WebkitTransform: 'rotate(135deg)',
//   // },
// }));

export type DateCardProps = {
  title: string;
  value?: string;
  kana?: string;
  summary1?: string;
  summary2?: string;
  // balloon?: string;
  url?: string;
  icon?: string;
  image: string;
};

export const DateCard = (props: DateCardProps) => {
  const { ref, inView } = useInView({ rootMargin: '100px' });

  const onClick = useCallback(() => {
    window.open(props.url, '_blank');
  }, [props]);

  return (
    <Fade ref={ref} in={inView} timeout={800}>
      <Card
      // className={classes.card}
      >
        {/* スマホでスクロールすることを考えると、反応しない範囲を設けた方が良いように思う */}
        <CardMedia
          // className={classes.cardMedia}
          component="img"
          src={props.image}
          alt="card-media"
          data-testid="dateCard__image"
        />

        <CardActionArea onClick={onClick} data-testid="dateCard__actionArea">
          <CardContent>
            <Box
            // className={classes.cardTitle}
            >
              <Typography
                // className={classes.dateTitle}
                variant="subtitle1"
                data-testid="dateCard__title"
              >
                {props.title}
              </Typography>
              {props.icon && (
                <img
                  // className={classes.cardTitleIcon}
                  src={props.icon}
                  alt="card-title-icon"
                  loading="lazy"
                  data-testid="dateCard__icon"
                />
              )}
            </Box>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <Typography
                  // className={classes.dateValue}
                  variant="h5"
                  data-testid="dateCard__value"
                >
                  {props.value}
                </Typography>
              </Grid>
              {props.kana && (
                <Grid item>
                  <Typography
                    // className={classes.dateKana}
                    variant="h6"
                    data-testid="dateCard__kana"
                  >
                    {props.kana}
                  </Typography>
                </Grid>
              )}
            </Grid>
            {props.summary1 && (
              <Typography
                // className={classes.dateSummary1}
                variant="body1"
                data-testid="dateCard__summary1"
              >
                {props.summary1}
              </Typography>
            )}
            {props.summary2 && (
              <Typography
                // className={classes.dateSummary2}
                variant="body2"
                data-testid="dateCard__summary2"
              >
                {props.summary2}
              </Typography>
            )}
          </CardContent>
          {/* {props.balloon && (
            <CardActions>
              <Box className={classes.balloonTip}>
                <Box className={classes.balloonTipTriangle} />
                <Typography className={classes.balloonText} variant="body2" data-testid="dateCard__balloon">
                  {props.balloon}
                </Typography>
              </Box>
            </CardActions>
          )} */}
        </CardActionArea>
      </Card>
    </Fade>
  );
};
