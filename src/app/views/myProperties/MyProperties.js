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

import MyPropertyCard from './components/MyPropertyCard';

import { withRouter } from "react-router-dom";

import { FirestoreCollection } from 'react-firestore';

import firebase from 'firebase/app';
import 'firebase/firestore';

import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';

const MyProperties = () => {
  const uid = firebase.auth().currentUser ? firebase.auth().currentUser.uid : '';
  const [dBdata, loading, error] = useCollectionData(
    firebase.firestore()
      .collection("transactions")
      .where("uid", "==", uid)
      .where("paid", ">", 0)
    ,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  console.log(dBdata);
  return (
    <div>

        {error && <strong>Error: {JSON.stringify(error)}</strong>}

        {loading && <div><Spin /></div>}

        {dBdata && (
          <MyPropertyCard 
            data={dBdata}
          />
        )}

    </div>
  );
};


// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// function MyProperties(props) {
// 	const { history } = props;
// 	const classes = useStyles();

//   var uid = firebase.auth().currentUser ? firebase.auth().currentUser.uid : '';
//   console.log(uid);
  
//   return (
//     <React.Fragment>
//       <Container>
      
//         <div className={classes.heroContent}>
//             <Typography variant="h6" align="center" color="textSecondary" paragraph>
//               My Properties
//             </Typography>
//         </div>

//         <div
//           className="cardList"
//         >
//           <FirestoreCollection
//             path="transactions"
//             filter={['uid','==',uid],['paid','>',0]}
//             render={({ isLoading, data, error}) => {
//               return isLoading ? (
//                 <Spin />
//               ) : (
//                 <MyPropertyCard 
//                   data={data}
//                 />
//   	        )
//       	      }}
//           />
//         </div>

//         <hr />

//       </Container>
      
//     </React.Fragment>
//   );
// }

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
    padding: theme.spacing(2,1,2,1),
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

export default withRouter(MyProperties);

