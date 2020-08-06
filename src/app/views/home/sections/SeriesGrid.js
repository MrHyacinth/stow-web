import * as React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Row, Col } from "antd";
import { Frame, Page, Stack, Scroll, useCycle } from "framer";

const transition = { duration: 0.3, ease: [0.13, 0.23, 0.23, 0.23] };

const thumbnailVariants = {
  initial: { scale: 0.9, opacity: 0 },
  enter: { scale: 1, opacity: 1, transition },
  exit: {
    scale: 0.3,
    opacity: 0,
    transition: { duration: 0.2, ...transition }
  }
};

const frameVariants = {
  hover: { scale: 0.95 }
};

const imageVariants = {
  hover: { scale: 1.1 }
};

const Thumbnail = ({ serie }) => {
  const { name, description, img } = serie;
  return (
    <motion.div className="thumbnail" variants={thumbnailVariants}>
      <motion.div
        className="frame"
        whileHover="hover"
        variants={frameVariants}
        transition={transition}
      >
          <motion.img
            src={img}
            alt={description}
            variants={imageVariants}
            transition={transition}
          />
      </motion.div>
    </motion.div>
  )
};

const series = [
  { 'name': 'Quartz', description: 'Mass Affordable', img: 'https://firebasestorage.googleapis.com/v0/b/stow-62251.appspot.com/o/web%2Fassets%2Fimg%2Fquartz-update-486x600.jpg?alt=media&token=0d3d6864-85a0-42bc-b3ba-889aecba7120' },
  { 'name': 'Sapphire', description: 'Luxury', img: 'https://firebasestorage.googleapis.com/v0/b/stow-62251.appspot.com/o/web%2Fassets%2Fimg%2Fsapphire-brigthened-update-486x600.jpg?alt=media&token=05819272-1285-4eaf-86c1-9012b6ef33e7' },
  { 'name': 'Emerald', description: 'Premium', img: 'https://firebasestorage.googleapis.com/v0/b/stow-62251.appspot.com/o/web%2Fassets%2Fimg%2Femerald-image-486x600.jpg?alt=media&token=0d0f0ca8-7759-4969-9925-3c1f45d07ee2' },
];

const SeriesGrid = () => (
  <>
    <div className="gallery" id="residential-segment">
      <motion.div
        className="thumbnails"
        initial="initial"
        animate="enter"
        exit="exit"
        variants={{ exit: { transition: { staggerChildren: 0.1 } } }}
      >
      <h2 className="center" 
        style={{
          margin: '1em',
        }}
      > 
        Our Residential Segments
      </h2>
        <Row
          spacing={8}
        >
          {series.map((serie, i) => (
            <Col
              key={i}
              xl={8}
              lg={8}
              md={8}
              sm={24}
              xs={24}
            >
            
              <Thumbnail key={i} serie={serie}/>
            </Col>
          ))}
        </Row>
      </motion.div>
    </div>
  </>
);

export default SeriesGrid;