// /**
// * The app.js program implements webpay integration with
// * ejs view engine. the code is make minimul and simple. any view engine can be use
// * in place of ejs
// * 
// * @author  Akinfolarin AKINBOBOLA
// * @version 1.0
// * @since   2019-01-15 
// * @company Interswitch Limited
// */

// // import modules used modules
// var express = require('express');
// var bodyparser = require('body-parser');
// var path = require('path');
// var sha512 = require('js-sha512');
// var request = require('request');
// // var httpBuildQuery = require('http-build-query');

// // Create a new Express Instance
// var app = express();

// // Add middleware for bod-parser
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({extended: false}));

// //set static path
// app.use(express.static(path.join(__dirname, 'public')));

// // set the view engine to ejs
// app.set('view engine', 'ejs');

// // Get route for the index page (index.ejs)
// app.get('/', function(req, res){
//     res.render('index');
// });

// // Get route for the requery page (requery.ejs)
// app.get('/requery', function(req, res){
//     res.render('requery');
// });

// // variable Declaration and initiallisation
//  // mac key
// const mac ='D3D1D05AFE42AD50818167EAC73C109168A0F108F32645C8B59E897FA930DA44F9230910DAC9E20641823799A107A02068F7BC0F4CC41D2952E249552255710F';
// // product_id used
// const prodid =  1076;
// // Query URL
// const qurl = 'https://sandbox.interswitchng.com/collections/api/v1/gettransaction.json?'; 
// // const proxy = 'http://username:password%25@domain'; // replace proxy with the right detail if you are behind a proxy

// // Post route for the redirect page (redirect.ejs)
// app.post('/confirm', function(req, res){
     
//             var xtxn =  req.body.txnref; // txnref posted from webpay redirect
//             var amount = req.body.amount; // amount posted from webpay redirect
//             var parameters = {
//                 productid:prodid,
//                 transactionreference:xtxn,
//                 amount:amount
//             };
            
//             // parameter buider using http.build-query
//             params = httpBuildQuery(parameters);
            
//             // computing hash value with product_id, transaction ref, mac key
//             const hashv =prodid + xtxn + mac;
//             thash = sha512(hashv); // using js-sha512

//             // http get request options 
//             const options = {     
//                 Accept: '*/*',
//                 url: qurl + params,
//                 method: 'GET',
//             //  proxy: proxy,

//                 headers: {
//                     'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.1) Gecko/2008070208 Firefox/3.0.1',
//                     'Accept-Language': 'en-us,en;q=0.5',
//                     'Keep-Alive': '300',
//                     'Connection': 'keep-alive',
//                     'Hash':  thash,
//                 }
//             }

//           request(options, function(err, result) {  
//             var rst =JSON.parse(result.body);  
//             var request_response= {
//             // response from transaction leg
//                 r_amt : req.body.amount/100,
//                 r_resp :req.body.resp,
//                 r_txnref : req.body.txnref,
//                 r_payRef : req.body.payRef,
//                 r_desc : req.body.desc,

//             // respoanse from confrimation leg
//                 c_amt : rst.Amount/100,
//                 c_transRef : rst.MerchantReference,
//                 c_ref : rst.PaymentReference,
//                 c_respCode : rst.ResponseCode,
//                 c_respDsc : rst.ResponseDescription,
//                 c_date : rst.TransactionDate

//             }

//              // return payment status page; webpay status return before confrimation leg and return after confirmation leg
//             res.render('redirect', request_response);
//             // res.send(rst);
            
//             }).end();
        
           
            
// });

// // Post route for requery page (requery.ejs)
// app.post('/requery_response', function(req,res) {
//         var xtxn =  req.body.txn_ref; // txnref posted from webpay redirect
//         var amtt = +(Math.round(req.body.amount + "e+2")  + "e-2") * 100;
//         var amount = +(Math.round(amtt + "e+2") +"e-2");
//         var parameters = {
//             productid:prodid,
//             transactionreference:xtxn,
//             amount:amount
//         };

//         // parameter buider using http.build-query
//         params = httpBuildQuery(parameters);

//         // computing hash value with product_id, transaction ref, mac key
//         const hashv =prodid + xtxn + mac;
//         thash = sha512(hashv); // using js-sha512

//         // http get request options 
//         const options = {     
//             Accept: '*/*',
//             url: qurl + params,
//             method: 'GET',
//             // proxy: proxy,

//             headers: {
//                 'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.1) Gecko/2008070208 Firefox/3.0.1',
//                 'Accept-Language': 'en-us,en;q=0.5',
//                 'Keep-Alive': '300',
//                 'Connection': 'keep-alive',
//                 'Hash':  thash,
//             }
//         }

//         request(options, function(err, result) {  
//         var rst =JSON.parse(result.body); 

//         // respoanse from requery leg 
//         var request_response= {
//             c_amt : rst.Amount/100,
//             c_transRef : rst.MerchantReference,
//             c_ref : rst.PaymentReference,
//             c_respCode : rst.ResponseCode,
//             c_respDsc : rst.ResponseDescription,
//             c_date : rst.TransactionDate

//         }

//         // return payment status page; webpay status return on requery leg
//         res.render('requery_response', request_response);
        

//         }).end();


// });

// // Post route to post user data to webpay
// app.post('/payment', function(req, res){
//     var amtt = +(Math.round(req.body.amt + "e+2")  + "e-2") * 100;
//     var amount = +(Math.round(amtt + "e+2") +"e-2");
//     var user_nm = req.body.user;
//     var item_b = req.body.item;
//     var trf = "AVA-"
//     for (var i = 0; i < 6; i++) {
//         trf += (Math.floor(Math.random()*(9 - 0) + 0)).toString();
//     }
//     // redirect url from webpay
//     var site_redirect_url = "http://localhost:3000/confirm";

//     // hash value computation
//     hashv  = trf + prodid + "101" + amount + site_redirect_url + mac;
//     var hash = sha512(hashv);
    
//     // return payment summary view, user click pay to redirect to webpay
//     res.render('payment',  {
//         nm: user_nm,
//         itm: item_b,
//         amt: amount,
//         trn: trf,
//         hash: hash,
//         url: site_redirect_url
//     });

// });

// // Start Server @port || 3000
// const port = process.env.PORT || 3000;
// app.listen(port, function(){
//     console.log("Server Started at port:3000 ");
// })

