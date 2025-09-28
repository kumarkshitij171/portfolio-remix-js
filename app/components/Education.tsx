import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import pkg from 'react-vertical-timeline-component';
const {VerticalTimelineElement,VerticalTimeline} = pkg;
import "react-vertical-timeline-component/style.min.css";
import { PortfolioData } from "~/types/portfolio";

interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  photoUrl?: string;
}

export const EducationCard = ({ education }: { education: Education }) => {
  return (
    <VerticalTimelineElement
      icon={
        <div className="bg-gray-900 rounded-full object-cover w-full h-full">

          <img
            src={education.photoUrl}
            alt={education.institution}
            className="object-cover w-full h-full m-auto rounded-full scale-75"
          />
        </div>
      }
      contentStyle={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        background: "#1d1836",
        color: "#fff",
        boxShadow: "rgba(23, 92, 230, 0.15) 0px 4px 24px",
        backgroundColor: "rgba(17, 25, 40, 0.83)",
        border: "1px solid rgba(255, 255, 255, 0.125)",
        borderRadius: "6px",
      }}
      contentArrowStyle={{
        borderRight: "7px solid  rgba(255, 255, 255, 0.3)",
      }}
      date={education.period}
    >
      <div className="flex items-center">
        <img alt=""
          src={education.photoUrl}
          className="w-28 h-28 object-contain rounded-full"
        />
        <div className="ml-2">
          <span className="text-xl font-medium">{education.institution}</span>
          <br />
          <span className="text-sm font-medium text-gray-300">
            {education.degree}
          </span>
          <br />
          <span className="text-sm font-medium text-gray-300">
            {education.period}
          </span>
        </div>
      </div>
    </VerticalTimelineElement>
  );
};

const Education = ({data}:{data:PortfolioData}) => {
  const education = data.education;

  const textRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { xPercent: -100 },
      {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 170%",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className=" w-[92%] mx-auto mt-20 md:mt-40" id="education">
      <div>
        <div ref={textRef}>
          <p className="uppercase text-3xl md:text-6xl text-center md:text-left mb-10  font-bold">
            My <span className="text-[#CBACF9]">Education</span>{" "}
          </p>
        </div>

        <VerticalTimeline>
          {education.map((education) => (
            <EducationCard key={education.id} education={education} />
          ))}
        </VerticalTimeline>
      </div>
    </div>
  );
};

export default Education;
