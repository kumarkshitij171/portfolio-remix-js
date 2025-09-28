import {useEffect,useRef} from "react";
import ProjectCard from "./ProjectCard";
import Tilt  from "react-parallax-tilt";
import { gsap } from "gsap";
import { PortfolioData } from "~/types/portfolio";

const Projects = ({data}:{data:PortfolioData}) => {
  const projects = data.projects;
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
  return (
    <div className="w-[92%] mx-auto mt-20" id="projects">
      <p ref={textRef} className="uppercase text-3xl md:text-6xl text-center md:text-left font-bold">
        Personal <span className="text-[#CBACF9]">Projects</span>{" "}
      </p>
      <div className="flex flex-wrap gap-10 mt-10 justify-center" data-aos="fade-up">
        {projects.map((project) => (
          <Tilt key={project.title} tiltMaxAngleY={15} scale={1}>
            <ProjectCard
              title={project.title}
              desc={project.description}
              image={project.photoUrl!}
              link={project.link || ""}
            />
          </Tilt>
        ))}
      </div>
    </div>
  );
};

export default Projects;
