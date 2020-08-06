import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import { Spin } from 'antd';

import PropertyDetailHeader from './components/PropertyDetailHeader';

import { withRouter } from "react-router-dom";

import { FirestoreDocument } from 'react-firestore';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function Property(props) {
	const { loading,match,history } = props;
  const { id } = match.params;
	const classes = useStyles();
    return (
    <React.Fragment>
        <Container className={classes.cardGrid} maxWidth="md">
          <FirestoreDocument
            path={`/property/${id}`}
            render={({ isLoading, data }) => {
              const item = data ? data : null;
              const images = data && data.photos && [data.primaryPhoto, ...data.photos] || data && [data.primaryPhoto];

              return isLoading || !data ? (
                <Spin />
              ) : (
                    <Card className={classes.card}>
                      <CardActionArea
                        onClick={ () => {
                          const propLink = '/property/'+item.id;
                          history.push(propLink);
                        }}
                      >
                        <CardMedia
                          className={classes.cardMedia}
                          image={item.primaryPhoto.src}
                          title={item.name}
                        />
                        
                        </CardActionArea>
                        <PropertyDetailHeader data={data}/>
                    </Card>
                  )
          }}
          />
        </Container>
      
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 0),
  },
  heroButtons: {
    marginTop: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '48%',
    [theme.breakpoints.down('md')]: {
      paddingTop: '54%',
    },
    [theme.breakpoints.down('md')]: {
      paddingTop: '54%',
    },
  },

  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default withRouter(Property);

