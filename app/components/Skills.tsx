import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Tilt from "react-parallax-tilt";
import { PortfolioData } from "~/types/portfolio";

const Skills = ({ data }: { data: PortfolioData }) => {
  const textRef = useRef(null);
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

  const skills = data.skills;

  return (
    <div className="w-[98%] md:w-[92%] mx-auto mt-20 md:mt-40 " id="skills">
      <p
        ref={textRef}
        className="uppercase text-3xl md:text-6xl text-center md:text-left  font-bold"
      >
        Technical <span className="text-[#CBACF9]">Skills</span>{" "}
      </p>

      <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-10 mx-2">
        {skills.map((skill) => (
          <Tilt key={skill.name} className="flex gap-4 justify-center items-center border rounded-xl w-[25vw] h-24 md:w-52  hover:bg-indigo-950 ease-out duration-500">
            <img src={skill.photoUrl} alt={skill.name} className="w-14" />
            <p className="font-semibold text-xl hidden sm:block ">{skill.name}</p>
          </Tilt>
        ))}
      </div>
      <div className="flex md:flex-row flex-col items-center mt-10">
        <p className="text-lg md:text-4xl font-bold md:ml-20">LeetCode Profile : </p>


        <Tilt tiltMaxAngleX={15}
          tiltMaxAngleY={15}
          perspective={1000}
          transitionSpeed={4000}
          scale={1}
          gyroscope={true} className="my-20w-[70vw] md:w-[40rem] mx-auto">
          <img src="https://leetcard.jacoblin.cool/kumar_kshitij?ext=heatmap" alt="" className="w-full my-5" />
        </Tilt>
      </div>
    </div>
  )
}

export default Skills
