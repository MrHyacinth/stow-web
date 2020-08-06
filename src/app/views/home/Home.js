import React from "react";
import BackToTop from "react-back-to-top-button";
import ScrollToTop from "react-scroll-to-top";

import { Frame, Page, Stack, Scroll, useCycle } from "framer";
import { motion } from "framer-motion";
import { enquireScreen } from "enquire-js";

import { Row, Col, Layout, Menu, Breadcrumb } from "antd";

import About from "./sections/About";
import Hero from "./sections/Hero";
import Banner from "./sections/Banner";
import HowItWorks from "./sections/HowItWorks";
import SeriesGrid from "./sections/SeriesGrid";
import ResidentialSegment from "./sections/ResidentialSegment";
import FAQ from "./sections/FAQ";

import HomeCard from "./components/HomeCard";
import HeaderHome from "./HeaderHome";
import imgLogo from "assets/logo.js";

const { Header, Content, Footer } = Layout;

const cards = [
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/stow-62251.appspot.com/o/web%2Fassets%2Fimg%2Fsavings.png?alt=media&token=30c186ca-c8dc-4ad2-bb45-928f8331631c",
    text: "Enhanced savings culture and verifiable credit records"
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/stow-62251.appspot.com/o/web%2Fassets%2Fimg%2Fhome-ownership.png?alt=media&token=6ad4b776-ee9c-48af-9a77-20c222b77b31",
    text: "Broadened home ownership"
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/stow-62251.appspot.com/o/web%2Fassets%2Fimg%2Fhome-savings.png?alt=media&token=b6b9cc54-4942-45d7-a8d8-5179bce6221c",
    text: "A trustworthy real estate market place"
  }
];

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

const { location } = window;

const Home = props => {
  const [isMobile, setIsMobile] = React.useState(false);

  const toTop = () => {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  };

  React.useEffect(() => {
    enquireScreen(b => {
      setIsMobile(b);
      console.log(isMobile);
    });
  }, []);

  return (
    <Layout className="layout">
      <HeaderHome />

      <Content>
        <div
          style={{
            height: "100%",
            width: "100%"
          }}
        >
          <motion.div
            className="section"
            initial={{
              opacity: 0,
              y: -20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
          >
            <Hero />
          </motion.div>

          <motion.div
            className="section"
            initial={{
              opacity: 0,
              y: 80
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
          >
            <Row justify="center" align="middle">
              {cards.map((card, ind) => (
                <Col
                  key={ind}
                  xl={8}
                  lg={8}
                  md={20}
                  sm={20}
                  xs={20}
                  style={styles.colContainer}
                >
                  <HomeCard image={card.image} text={card.text} ind={ind} />
                </Col>
              ))}
            </Row>
          </motion.div>

          <motion.div
            className="section"
            initial={{
              opacity: 0,
              y: -20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
          >
            <Banner />
          </motion.div>

          <motion.div
            className="section"
            initial={{
              opacity: 0,
              y: -20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
          >
            <SeriesGrid />
          </motion.div>

          <motion.div
            id="payment-plans"
            className="section"
            initial={{
              opacity: 0,
              y: -20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
          >
            <ResidentialSegment />
          </motion.div>

          <motion.div
            className="section"
            initial={{
              opacity: 0,
              y: 80
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
          >
            <About />
          </motion.div>

          <motion.div
            className="section"
            initial={{
              opacity: 0,
              y: 80
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
          >
            <FAQ />
          </motion.div>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;

const styles = {
  colContainer: {
    padding: "2em"
  }
};
