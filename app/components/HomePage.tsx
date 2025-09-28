import { useEffect, useRef } from "react";
import { FaLocationArrow } from "react-icons/fa6";
import { FiDownloadCloud } from "react-icons/fi";
import { gsap } from "gsap";
import ParallaxBG from "~/utils/ParallaxBG";
import MagicButton from "~/utils/MagicButton";
import AnimatedText from "~/utils/AnimatedText";
import AboutMe from "./AboutMe";
import Experience from "./Experience";
import Projects from "./Projects";
import Skills from "./Skills";
import Education from "./Education";
import Socials from "./Socials";
import { PortfolioData } from "~/types/portfolio";

const HomePage = ({ data }: { data: PortfolioData }) => {

    const heroTextRef = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const aboutMeRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            heroTextRef.forEach((ref, index) => {
                if (!ref.current) return;
                gsap.from(ref.current, {
                    y: -200,
                    opacity: 0,
                    ease: "power4.out",
                    duration: 4,
                    delay: 0.5 + index * 0.25,
                });
            });
        });

        return () => ctx.revert();
    }, []);
    return (
        <div className="" id="home">
            <div className="relative z-10 -mb-20 w-[95%] mx-auto">
                <ParallaxBG>
                    <p
                        ref={heroTextRef[3]}
                        className="font-spacemono text-lg md:text-3xl text-center mt-56 mx-auto"
                    >
                        {data.personal.headline}
                    </p>

                    <div className="flex flex-col justify-center items-center my-16 z-10">
                        <div ref={heroTextRef[2]} className="overflow-y-clip">
                            <h1 className="text-xl md:text-3xl opacity-75 font-bold font-spacemono ">
                                Hey, I am
                            </h1>
                        </div>
                        <div ref={heroTextRef[1]} className="overflow-y-clip">
                            <h1 className="text-3xl md:text-7xl font-bold uppercase text-[#CBACF9]">
                                <AnimatedText delay={200} text={data.personal.name} />
                            </h1>
                        </div>
                    </div>

                    <div ref={heroTextRef[0]} className="flex gap-3 md:gap-10 justify-center mx-auto">
                        <a target="_blank" rel="noopener noreferrer" href={data.personal.resumeLink} className="md:w-44">
                            <MagicButton
                                title="Resume"
                                icon={<FiDownloadCloud size={20} />}
                                position="right"
                                otherClasses="font-semibold"

                            />
                        </a>
                        <a href="#contact" className="md:w-44">

                            <MagicButton
                                title="Contact Me"
                                icon={<FaLocationArrow size={20} />}
                                position="right"
                                otherClasses={" font-semibold whitespace-nowrap"}
                            />
                        </a>
                    </div>
                </ParallaxBG>
            </div>
            <AboutMe
                sectionRef={aboutMeRef}
                data={data}
            />
            <Experience data={data} />
            <Projects data={data} />
            <Skills data={data} />
            <Education data={data} />
            <Socials />
            <div className="h-48">

            </div>
            <img alt=""
                src="assets/grid-pattern.png"
                className="absolute top-0 mx-auto w-full "
            />
            <img alt="" src="assets/spotlight-1.png" className="absolute w-[50vw] top-0" />
            <img alt=""
                src="assets/spotlight.png"
                className="absolute w-[50vw] top-0 right-0"
            />
        </div>
    )
}

export default HomePage