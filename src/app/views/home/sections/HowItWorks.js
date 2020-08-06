import React from 'react';
import { Row, Col } from 'antd';
import { motion } from "framer-motion";

const HowItWorks = props => {
	// console.log(props);
	return (
	        <Row
					className="contact"
					className="sectionHowItWorks"
		        style={{
		        	width: '80%',
		        	margin: '0 auto',
		        }}
	        >
	      		
      			<Col span={14}>
      				<img
      					src="https://firebasestorage.googleapis.com/v0/b/stow-62251.appspot.com/o/web%2Fassets%2Fimg%2FhowItWorks.png?alt=media&token=057380dc-e0d7-46ce-b900-1d954c9433f0"
  					/>
	      		</Col>
	      			
      			<Col span={10}
      				className="sectionHowItWorksImg"
	      		>
	      		</Col>
		    </Row>
	)
}

export default HowItWorks;