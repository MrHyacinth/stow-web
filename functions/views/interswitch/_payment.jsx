var React = require('react');
var DefaultLayout = require('../layouts/default');

function priceFormat(num)
{
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function PayInterswitch(props) {
	console.log(props);
	console.log('props.hash');
	console.log(props.hash);
	const bgCol = "#F5F7F7";

  	return (
	  	<DefaultLayout title={'Interswitch Payment'}>
  		 	<div 
  		 		style={{
	 			 	display: 'flex',
				    flexDirection: 'column',
				    flex: 1,
				    padding: '1em',
				    color: '#000000',
  		 			backgroundColor: bgCol,
	 			    textAlign: 'left',
				    alignItems: 'flex-start',
  		 		}}
  		 	>
			         
	            <table>
	                <tr>
	                    <td>Customer Name:</td>
	                    <b>
	                    	<td>{props.unm}</td> 
                    	</b>
	                </tr>
	                <tr>
	                    <td>Property Name:</td>
	                    <b>
	                    	<td>{props.pnm}</td> 
                    	</b>
	                </tr>
	                <tr>
	                    <td>Payment Plan:</td>
	                    <b>
	                    	<td>{props.paymentPlan}</td> 
                    	</b>
	                </tr>
	                <tr>
	                    <td>Payment Option:</td>
	                    <b>
	                    	<td>{props.paymentOption}</td> 
                    	</b>
	                </tr>
	                <tr>
	                    <td>Amount:</td>
	                    <b>
	                    	<td>{`₦ ${priceFormat(props.amt/100)}`}</td> 
                    	</b>
	                </tr>

	            </table>

                <form 
                    action="https://sandbox.interswitchng.com/collections/w/pay" 
                    method="POST"
                >
                    <input name="amount" type="hidden" value={props.amt} />
                    <input name="currency" type="hidden" value={props.cur} />
                    <input name="cust_id" type="hidden" value={props.uid}  />
                    <input name="hash" type="hidden" value={props.hash} />
                    <input name="txn_ref" type="hidden" value={props.trf} />
                    <input name="pay_item_id" type="hidden" value={props.payitemid} />
                    <input name="product_id" type="hidden" value={props.prodid} />
                    <input name="site_redirect_url" type="hidden" value={props.rurl} />

                    <input name="cust_id_desc" type="hidden" value={props.uid} />
                    <input name="cust_name" type="hidden" value={props.unm} />
                    <input name="cust_name_desc" type="hidden" value={props.unm} />
                  
                    <div className="wrapper">
	                    <tr>
	                        <td colspan="5">
	                        	<input type="submit" 
	                        		value="Pay via Interswitch" 
                        		/>
	                    	</td>
	                    </tr>
                    </div>

                </form>
                <tr>
                    <td colspan="5">
                    	<img src="https://firebasestorage.googleapis.com/v0/b/stow-62251.appspot.com/o/web%2Fassets%2Fimg%2Fisw_logo.png?alt=media&token=3c1a4880-5241-4143-b7f3-9bb179fa144a"/>
                	</td>
                </tr>
	       	</div>   
		</DefaultLayout>
	)
}

module.exports = PayInterswitch;
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
