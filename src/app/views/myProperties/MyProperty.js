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

import MyPropertyDetailHeader from './components/MyPropertyDetailHeader';

import { withRouter } from "react-router-dom";

import { FirestoreDocument } from 'react-firestore';
import MyPropertyPanels from './components/MyPropertyPanels';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
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
    height: '4%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '48%',
    [theme.breakpoints.down('md')]: {
      paddingTop: '54%',
    }, // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function MyProperty(props) {
  const { loading,match,history } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { id } = match.params;

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
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
                        <MyPropertyPanels />
                      <MyPropertyDetailHeader data={data}/>


                    </Card>
                  )
          }}
          />
        </Container>
      
    </div>
  );
}
