const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

// Required for side-effects
const express = require('express');
const engines = require('express-react-views');
const cors = require('cors');
const bodyparser = require('body-parser');
const path = require('path');
const sha512 = require('js-sha512');
const request = require('request');
const httpBuildQuery = require('http-build-query');

// Interswitch Variables
const mac ='D3D1D05AFE42AD50818167EAC73C109168A0F108F32645C8B59E897FA930DA44F9230910DAC9E20641823799A107A02068F7BC0F4CC41D2952E249552255710F';
const prodid =  1076;
const payitemid = 101;
const qurl = 'https://sandbox.interswitchng.com/collections/api/v1/gettransaction.json?'; 
// End Interswitch Variables

// Create a new Express Instance
const app = express();

app.use(cors({ origin: true }));

// Set the view engine to jsx
// app.engine('jsx', engines.createEngine());
// app.set('views', __dirname + '/views');
// app.set('views', './views');
// app.set('view engine', 'jsx');

// set the view engine to ejs
app.set('view engine', 'ejs');

// Add middleware for bod-parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

//set static path
// app.use(express.static(path.join(__dirname, '../public')));
// app.use(express.static(path.join(__dirname, '../dist')));
// app.use(express.static(path.join(__dirname, '../build')));



// // Get route for the index page 
// app.get('/api/interswitch/test', function(req, res){
//     res.render('index', { name: 'John' });

// });


// Get route for the index page 
app.get('/api/interswitch/checkout', function(req, res){
    // res.send("STOW INTERSWITCH API");
    res.render('interswitch/interswitch');
});

// Get route for the requery page
app.get('/api/interswitch/requery', function(req, res){
    res.render('interswitch/requery');
});

// const proxy = 'http://username:password%25@domain'; // replace proxy with the right detail if you are behind a proxy


// Post route for the redirect page (redirect.ejs)
app.post('/api/interswitch/confirm', function(req, res){


    var xtxn =  req.body.txnref; // txnref posted from webpay redirect
    var amount = req.body.amount; // amount posted from webpay redirect
    var parameters = {
        productid:prodid,
        transactionreference:xtxn,
        amount:amount
    };

    // parameter buider using http.build-query
    params = httpBuildQuery(parameters);

    // computing hash value with product_id, transaction ref, mac key
    const hashv =prodid + xtxn + mac;
    thash = sha512(hashv); // using js-sha512

    var conf_url = 'https://stow.ng/payment/confirm/'+xtxn;
    var conf_status = 307;

    // console.log(conf_url);
    // http get request options 
    const options = {     
        Accept: '*/*',
        url: qurl + params,
        method: 'GET',
    //  proxy: proxy,

        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.1) Gecko/2008070208 Firefox/3.0.1',
            'Accept-Language': 'en-us,en;q=0.5',
            'Keep-Alive': '300',
            'Connection': 'keep-alive',
            'Hash':  thash,
        }
    }
    request(options, function(err, result) {  
        var rst =JSON.parse(result.body);  
        var request_response= {
        // response from transaction leg
            r_amt : req.body.amount/100,
            r_resp :req.body.resp,
            r_txnref : req.body.txnref,
            r_payRef : req.body.payRef,
            r_desc : req.body.desc,

        // respoanse from confrimation leg
            c_amt : rst.Amount/100,
            c_transRef : rst.MerchantReference || null,
            c_ref : rst.PaymentReference || null,
            c_respCode : rst.ResponseCode || null,
            c_respDsc : rst.ResponseDescription || null,
            c_date : rst.TransactionDate || null,

        };

        // res.render('interswitch/redirect', request_response);
        
        const payId = request_response.c_transRef;
        const paymentValid = 
            request_response.c_respCode == "00" 
            ? true
            : false;

        let newPaymRef = 
            db
            .collection('payments')
            .doc(payId)
            .set({
                paymentValid,
                ...request_response,
                ...req.body,
                ...parameters,
            }, {
                merge: true,
            })
            .then(ref => {
                res.redirect(conf_status,conf_url);
            })
            .catch(error => console.log(error) );

    }).end();

});

// Post route to post user data to webpay
app.post('/api/interswitch/payment', function(req, res){
    const { 
        tid, 
        uid, 
        unm, 
        pid, 
        pnm, 
        amt, 
        cur, 
        paymentPlan,
        paymentPlanPrice,
        paymentOption,

        rurl ,
    } = req.body;
    var amtt = +(Math.round(amt + "e+2")  + "e-2") * 100;
    var amount = +(Math.round(amtt + "e+2") +"e-2");
    var trf = "INT-"
    for (var i = 0; i < 6; i++) {
        trf += (Math.floor(Math.random()*(9 - 0) + 0)).toString();
    }
    var item_b = req.body.item;
    // redirect url from webpay
    // var rurl = "https://us-central1-stow-62251.cloudfunctions.net/api/interswitch/confirm";

    // hash value computation
    hashv  = trf + prodid + payitemid + amount + rurl + mac;
    var hash = sha512(hashv);

    let paymentDate = new Date().toString();

    let paymData = {
        ...req.body,
        paymentDate,
        paymentMethod: 'interswitch',
        trf,
    };
    // console.log(paymData);
    let paymRef = 
        db.collection('payments')
        .doc(trf)
        .set(paymData)
        .then(ref => {})
        .catch(error => console.log(error) );

    let transRef = 
        db.collection('transactions')
        .doc(tid)
        .collection('payments')
        .doc(trf)
        .set(paymData)
        .then(ref => {
            res.render('interswitch/payment',  {
                tid,
                uid,
                unm,

                pid,
                pnm,

                prodid,
                payitemid,
                trf,

                itm: item_b,
                amt: amount,
                cur,

                paymentPlan,
                paymentPlanPrice,
                paymentOption,

                hash,
                rurl,
            });
        })
        .catch(error => console.log(error) );

    // return payment summary view, user click pay to redirect to webpay
   
});



// Post route for requery page (requery.ejs)
app.post('/api/interswitch/requery_response', function(req,res) {
        var xtxn =  req.body.txn_ref; // txnref posted from webpay redirect
        var amtt = +(Math.round(req.body.amount + "e+2")  + "e-2") * 100;
        var amount = +(Math.round(amtt + "e+2") +"e-2");
        var parameters = {
            productid:prodid,
            transactionreference:xtxn,
            amount:amount
        };
        // parameter buider using http.build-query
        params = httpBuildQuery(parameters);

        // computing hash value with product_id, transaction ref, mac key
        const hashv =prodid + xtxn + mac;
        thash = sha512(hashv); // using js-sha512

        // http get request options 
        const options = {     
            Accept: '*/*',
            url: qurl + params,
            method: 'GET',
            // proxy: proxy,

            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.1) Gecko/2008070208 Firefox/3.0.1',
                'Accept-Language': 'en-us,en;q=0.5',
                'Keep-Alive': '300',
                'Connection': 'keep-alive',
                'Hash':  thash,
            }
        }
        request(options, function(err, result) {  
        var rst =JSON.parse(result.body); 

        // respoanse from requery leg 
        var request_response= {
            c_amt : rst.Amount/100,
            c_transRef : rst.MerchantReference,
            c_ref : rst.PaymentReference,
            c_respCode : rst.ResponseCode,
            c_respDsc : rst.ResponseDescription,
            c_date : rst.TransactionDate

        }
        // return payment status page; webpay status return on requery leg
        res.render('interswitch/requery_response', request_response);
        

        }).end();
});

exports.apiInterswitchPayment = functions.https.onRequest(app);


exports.updatePayments = functions.firestore
    .document('payments/{r_txnref}')
    .onUpdate((change, context) => {

        const data = change.after.data();
        const { tid, r_amt, paymentValid } = data;
        const { r_txnref } = context.params;
        
        const lastPayment = paymentValid ? parseInt(r_amt) : 0;
        const lastPaymentDate = new Date().toString();
        const lastPaymentReference = r_txnref;

        let transRef = 
        db.collection('transactions')
        .doc(tid)
        .update({
            lastPayment,
            lastPaymentDate,
            lastPaymentReference,
            paid: admin.firestore.FieldValue.increment(lastPayment),
        })
         // Then return a promise of a set operation to update the count
        return change.after.ref.set({
            aggregated: true,
        }, {merge: true});
    });
