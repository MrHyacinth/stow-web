import React from 'react';
import { Row, Col, Button } from 'antd';
import { motion } from "framer-motion";
import history from "history.js";

const Hero = props => {
	// console.log(props);
	return (
	        <Row
	        id="residential"
      		className="sectionHero"
	        >
		      	<Col span={12}>
			      	<Row
	      				className="heroContainer"
	      			>
			      		<motion.img 
			      		initial={{
			      			opacity: 0,
			      			y:80,
			      		}}
			      		animate={{
			      			opacity: 1,
			      			y:0,
			      		}}
	      					className="sectionHeroImg"
	      					src="https://firebasestorage.googleapis.com/v0/b/stow-62251.appspot.com/o/web%2Fassets%2Fimg%2Fpotential.png?alt=media&token=10d52356-bce0-4aa0-94cf-27910f9b801c"
	  					/>

		      			<Button
							className="forceLeft primaryBtnStow buttonHome"
							onClick={ () => {
								history.push('/signup');
							}}
						>
							Start Here
						</Button>
					</Row>
	      		</Col>
		    </Row>
	)
}

export default Hero;