import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
// import Card from '@material-ui/core/Card';
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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Spin } from 'antd';

import { withRouter } from "react-router-dom";

import { FirestoreCollection } from 'react-firestore';

import SearchFilter from './components/SearchFilter';
import PropertySearchCard from './components/PropertySearchCard';


const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function PropertySearch(props) {
	const { history } = props;
	const classes = useStyles();
  const [ filterRes, setFilterRes] = React.useState({
    location: null,
    priceRange: null,
    beds: null,
  });
  const [ filterResFinal, setFilterResFinal] = React.useState(null);

  return (
    <React.Fragment>
          <Container>
      
        <div className={classes.heroContent}>
              <Typography variant="h6" align="center" color="textSecondary" paragraph>
                Filter your search
              </Typography>
            <div className={classes.filterSelects}>
              
                <Grid container spacing={2} justify="center">
                  <SearchFilter 
                    filterRes={filterRes}
                    filterResFinal={filterResFinal}
                    setFilterRes={setFilterRes}
                    setFilterResFinal={setFilterResFinal}
                  />
                </Grid>
            </div>
          </div>
          <Grid container spacing={4} justify="center" >

            <div
              className="cardList"
            >
            <FirestoreCollection
              path="property"
              sort="price,name"
              filter={filterResFinal}
              render={({ isLoading, data, error}) => {
                return isLoading ? (
                  <Spin />
                ) : (
      	          	<PropertySearchCard
                      isLoading={isLoading}
                      data={data}
                    />
        	        )
        	      }}
              />
            </div>
          </Grid>
        </Container>
      
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  filterSelects: {
    backgroundColor: 'transparent',
    padding: theme.spacing(2, 0, 0),
    marginTop: theme.spacing(2),
    width: '100%',
  },
  heroContent: {
    padding: theme.spacing(4, 0, 2),
  },
  heroButtons: {
    marginTop: theme.spacing(2),
  },
  cardGrid: {
    backgroundColor: '#fff',
    padding: theme.spacing(8,4,8,4),
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

export default withRouter(PropertySearch);

