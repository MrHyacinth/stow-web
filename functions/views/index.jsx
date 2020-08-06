var React = require('react');
var DefaultLayout = require('./layouts/default');

function HelloMessage(props) {
  	return (
	  	<DefaultLayout title={'Interswitch Payment'}>
      		<div>Hello {props.name}</div>
		</DefaultLayout>
	)
}

module.exports = HelloMessage;