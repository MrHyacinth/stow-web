import React from "react";
import { Card } from 'antd';

const { Meta } = Card;

const HomeCard = props => {
const { image, text, ind } = props;
	return (
	  <Card
	  	bordered
	    hoverable
	    style={{ 
	    	height: '24em',
	    	justifyContent: 'space-evenly',
		    flex: 1,
		    display: 'flex',
		    flexDirection: 'column',
	    }}
	    cover={<img alt="stow" src={image} style={{ width: '50%'}}
	    	className={
	    		// ind == 2 ? 'roundBordImage' 
    			ind == 2 ? 'firstBordImage' 
			 	: ind == 0 ? 'firstBordImage' 
				: ''
			}

	    />}
	  >
	    <Meta title={(
	    	<p>{text.slice(0,25)}<br />
	    	{text.slice(25,60)}</p>
    	)} 
	    	className="homeCard"
    	/>
	  </Card>
	)
}

export default HomeCard;