import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Tilt from "react-parallax-tilt";
import { PortfolioData } from "~/types/portfolio";

const Experience = ({ data }: { data: PortfolioData }) => {
  const textRef = useRef(null);
  const experienceData = data.experiences;
  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { xPercent: -100 },
      {
        xPercent: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 180%",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  }, []);


  return (
    <div className="w-[92%]  mx-auto mt-20 md:mt-40" id="experience">
      <p
        ref={textRef}
        className="uppercase text-3xl md:text-6xl text-center md:text-left font-bold"
      >
        My <span className="text-[#CBACF9]">Experiences</span>
      </p>

      {experienceData.map((experience) => (
        <div className="mt-5 md:mt-10" data-aos="fade-up" key={experience.id}>
          <Tilt
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            perspective={1000}
            className="flex flex-col md:flex-row gap-10 p-3 bg-gradient-to-br from-[#010320] to-[#111325] rounded-xl border border-gray-600">
            <img
              src={experience.photoUrl}
              alt={experience.company}
              className="rounded-lg w-96 object-scale-down"
            />
            <div>
              <p className="text-2xl md:text-3xl font-bold hidden md:block">
                {experience.company}
              </p>
              <p className="text-2xl md:text-3xl font-bold md:hidden block">
                {experience.company}
              </p>
              <p className="text-md md:text-lg font-medium">
                {experience.role}
              </p>
              <p className="font-medium text-gray-400 text-lg">
                {experience.period}
              </p>
              <div dangerouslySetInnerHTML={{ __html: experience.description }} className="space-y-1 mt-5 text-sm md:text-base" />
            </div>
          </Tilt>
        </div>
      ))}
    </div>
  );
};

export default Experience;
