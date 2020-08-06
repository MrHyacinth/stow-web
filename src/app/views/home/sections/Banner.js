import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Modal } from 'antd';
import { motion } from "framer-motion";

function info() {
  Modal.info({
    title: 'Freedom to Own',
    content: (
      <div>
        <p>Take Control of Your Future</p>
        <p>Start the journey towards your dream home!</p>
      </div>
    ),
    onOk() {},
  });
}

const Banner = props => {
	// console.log(props);
	return (
	        <Row
	        style={{
	        	width: '90%',
	        	margin: '0 auto',
	        }}
	        >
	      		<Col 
		      		xs={24} 
		      		sm={24} 
		      		md={24} 
		      		lg={12}
		      		xl={12}
      				className="sectionBanner"
	      		>
	      		</Col>
      			<Col 
	      			xs={24} 
	      			sm={24} 
	      			md={24} 
	      			lg={8}
	      			xl={8}
      			>
      			<Row
      				style={{
      					alignItems: 'center',
      				}}
      			>
      				<h2 
	      				style={{
      						color: '#7cc244',
							fontWeight: '600',
	      				}} 
      				>
      					STOW…
      					<br />
						Freedom to
						Own a Home
					</h2>
					<span className="separator  small forceLeft separator separatorAbout " />
					<p>We have optimised our models to enable us meet the housing needs of the working professional across Nigeria and Sub-saharan africa</p>
					<a
						href="https://www.octo5.co/"
						target="_blank"
					>
						<Button
							className="forceLeft primaryBtnStow buttonHome"
						>
							Read More
						</Button>
					</a>
      			</Row>
      			</Col>
		    </Row>
	)
}

export default Banner;