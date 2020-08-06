var React = require('react');
var DefaultLayout = require('../layouts/default');


function priceFormat(num)
{
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}


function RedirectInterswitch(props) {
	console.log(props);

	const bgCol = props.c_respCode == "00" ? "#7cc244" : "#f44336";
  	return (
	  	<DefaultLayout title={'Interswitch Payment Response'}>
  		 	<div
  		 		style={{
	 			 	display: 'flex',
				    flexDirection: 'column',
				    flex: 1,
				    padding: '1em',
				    color: '#f5f7f7',
  		 			backgroundColor: bgCol,
	 			    textAlign: 'left',
				    alignItems: 'flex-start',
  		 		}}
  		 	>
        		<h2>STOW: Payment Response</h2>
			         
	            <table>
	            
	                <tr>
	                    <td>Amount:</td>
                    	<td>{`₦ ${priceFormat(props.r_amt)}`}</td> 
	                </tr>

	                <tr>
	                    <td>Reference:</td>
	                    <td>{ props.r_txnref  }</td>
	                </tr>

	                <tr>
	                    <td>Response:</td>
	                    <td>{ props.r_desc }</td>
	                </tr>

		        </table>


	       	</div>   
	       	<table>
                <tr>
                    <td><a href="javascript:history.go(-4)">Back to Checkout</a></td>
                    <td><a href="/dashboard">To Dashboard</a></td>
               </tr> 
        	</table>  
		</DefaultLayout>
	)
}

module.exports = RedirectInterswitch;
// 
// Sample Data
// {
//   rurl: 'http://localhost:5000/api/interswitch/confirm',
//   amt: '400000',
//   cur: '566',
//   pid: 'ZMSfilxpyqwt6xSUjGxF',
//   pnm: 'Safe Haven',
//   uid: 'zmeyUwGmw0h0ljN14hXvuKzmbgC3',
//   unm: "Sargent D'Artagnan",
//   paymentPlan: 'Outright',
//   paymentPlanPrice: '8000000',
//   paymentOption: '6 months',
//   tid: 'WGINQ8gpLNhHXkxTqHm8',
//   paymentDate: 'Tue Jun 16 2020 00:28:54 GMT+0000 (Coordinated Universal Time)',
//   paymentMethod: 'interswitch',
//   trf: 'INT-557810'
// }
