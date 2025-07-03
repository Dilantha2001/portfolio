import React from "react";
import { motion } from "framer-motion";
import ResumeCard from "./ResumeCard";

const Experience = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className="w-full flex flex-col lgl:flex-row gap-10 lgl:gap-20"
    >
      <div>
        <div className="py-6 lgl:py-12 font-titleFont flex flex-col gap-4">
          <p className="text-sm text-designColor tracking-[4px]">2010 - 2022</p>
          <h2 className="text-3xl md:text-4xl font-bold">
            Most Recent Projects
          </h2>
        </div>
        <div className="mt-6 lgl:mt-14 w-full h-[1000px] border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">
          <ResumeCard
            title="Sr. Software Engineer"
            subTitle="Google Out Tech - (2017 - Present)"
            result="USA"
            des="Google's hiring process is an important part of our culture. Googlers care deeply about their teams and the people who make them up."
          />
          <ResumeCard
            title="Web Developer & Trainer"
            subTitle="Apple Developer Team - (2012 - 2016)"
            result="MALAYSIA"
            des="A popular destination with a growing number of highly qualified homegrown graduates, it's true that securing a role in Malaysia isn't easy."
          />
          <ResumeCard
            title="Front-end Developer"
            subTitle="Nike - (2020 - 2011)"
            result="Oman"
            des="The Oman economy has grown strongly over recent years, having transformed itself from a producer and innovation-based economy."
          />
        </div>
      </div>
      <div>
        <div className="py-6 lgl:py-12 font-titleFont flex flex-col gap-4">
          <p className="text-sm text-designColor tracking-[4px]">2001 - 2020</p>
          <h2 className="text-3xl md:text-4xl font-bold">Trainer Experience</h2>
        </div>
        <div className="mt-6 lgl:mt-14 w-full h-[1000px] border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">
          <ResumeCard
            title="Parcel Pickup and Delivery System (Jan 2025 - Present)"
            subTitle="January 2025 Present"
            result="Web"
            des="Developed a mobile and web-based system for the Sri Lankan Postal Department using React, React Native, PHP, and MySQL.

Integrated GPS tracking and payment gateways for real-time parcel tracking and secure transactions.

Designed an intuitive interface, allowing customers to place orders, track parcels, and estimate delivery costs."
          />
          <ResumeCard
            title="Online Book Store"
            subTitle="April-2025  May 2025 "
            result="Web"
            des="Built a full-stack online bookstore using React, Tailwind CSS, and MongoDB.

Created a responsive UI, shopping cart functionality, and secure checkout process.

Developed an admin dashboard for managing book inventory and tracking customer orders."
          />
          <ResumeCard
            title="Tuition Class Management Mobile App"
            subTitle="March 2025 - May 2025"
            result="App"
            des="Designed a mobile app for tuition class management using Android and Firebase.

Implemented student enrollment, class scheduling, and attendance tracking features.

Integrated Firebase for authentication, real-time database, and cloud storage."
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Experience;
