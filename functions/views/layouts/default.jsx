var React = require('react');

function DefaultLayout(props) {
  return (
    <html>
      <head>
      	<title>{props.title}</title>
      	<link
	      href="/server.css"
	      rel="stylesheet"
	    />
      	<link
	      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900"
	      rel="stylesheet"
	    />
	    
      </head>
      <body>{props.children}</body>
    </html>
  );
}

module.exports = DefaultLayout;