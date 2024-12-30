"use client";
import { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
// GLOBAL CUSTOM COMPONENTS
import Newsletter from "components/newsletter";
import Reviews from "components/Reviews/Reviews";
// LOCAL CUSTOM COMPONENTS
import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5";
import Section6 from "../section-6";
import Section7 from "../section-7";
import Section8 from "../section-8";
import Section9 from "../section-9";
import Section10 from "../section-10";
import { DataStructure } from "models/types";
import BannerTop from "components/BannerTop";

const AnimatedSection = ({ children }: any) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const variants = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hidden: { opacity: 0, y: 50 },
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default function FashionTwoPageView({ data }: { data: DataStructure }) {
  return (
    <div className="bg-white">
      <BannerTop props={""} textColor={""} />
      <AnimatedSection>
        {/* Navbar Section */}
        <Section1 data={data?.navbar} />
      </AnimatedSection>
      <AnimatedSection>
        {/* Promotional Section */}
        <Section2 />
      </AnimatedSection>
      <AnimatedSection>
        {/* Featured Products Section */}
        <Section3 />
      </AnimatedSection>
      <AnimatedSection>
        {/* Most Sold Products Section */}
        <Section4 products={data?.landing?.collections?.mostSoldProducts} />
      </AnimatedSection>
      <AnimatedSection>
        {/* New Arrivals Section */}
        <Section5 />
      </AnimatedSection>
      <AnimatedSection>
        {/* Discount Products Section */}
        <Section6 products={data?.landing?.collections?.discountProducts} />
      </AnimatedSection>
      <AnimatedSection>
        {/* Best Sellers Section */}
        <Section7 />
      </AnimatedSection>
      {/* <AnimatedSection> */}
      {/* Trending Products Section */}
      {/* <Section8 />
      </AnimatedSection> */}
      {/* <AnimatedSection> */}
      {/* Customer Favorites Section */}
      {/* <Section9 /> */}
      {/* </AnimatedSection> */}
      <AnimatedSection>
        {/* Collections Section */}
        <Section10 products={data?.landing?.collections} />
      </AnimatedSection>
      <AnimatedSection>
        {/* Customer Reviews Section */}
        <Reviews review={data?.landing?.reviews} />
      </AnimatedSection>
      <AnimatedSection>
        {/* Newsletter Subscription Section */}
        <Newsletter />
      </AnimatedSection>
    </div>
  );
}
