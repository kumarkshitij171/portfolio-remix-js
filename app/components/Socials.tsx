import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Socials: React.FC = () => {
  const cardClass =
    "rounded-3xl hover:scale-105 transition-all duration-300 flex items-center justify-center font-bold text-xl [&>*]:scale-75 md:[&>*]:scale-100 shadow-lg hover:shadow-xl";
  const refs = Array(10)
    .fill(0)
    .map(() => useRef<HTMLAnchorElement | null>(null)); 
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { xPercent: -100 },
        {
          xPercent: 5,
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
    }
  }, []);

  return (
    <div className="flex flex-col justify-between overflow-x-hidden mt-28" id="contact">
      <div ref={textRef}>
        <p className="uppercase text-3xl md:text-6xl text-center md:text-left mb-10 font-bold">
          My <span className="text-[#CBACF9]">Profiles</span>
        </p>
      </div>
      <div className={`md:grow flex flex-col container p-5 min-h-48 mx-auto gap-5`}>
        <div className={`md:grow-[1] flex flex-wrap gap-5`}>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/i-kshitij-kumar"
            ref={refs[0]}
            className={`${cardClass} bg-[#0A66C2] text-white w-16 grow hover:grow-[1.5]`}
          >
            <img src="socials/linkedin.png" className="w-20" alt="LinkedIn" />
          </a>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://leetcode.com/u/kumar_kshitij/"
            ref={refs[1]}
            className={`${cardClass} bg-gradient-to-br from-slate-100 to-yellow-100 text-white w-16 grow hover:grow-[1.5]`}
          >
            <img src="socials/lc.webp" className="w-20" alt="Leetcode" />
          </a>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://github.com/kumarkshitij171"
            ref={refs[2]}
            className={`${cardClass} bg-[#24292F] text-white w-16 grow hover:grow-[1.5]`}
          >
            <img src="socials/github.png" className="w-20" alt="Github" />
          </a>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=kshitij.msit@gmail.com&su=Hello%20Kshitij&body=I%20came%20here%20from%20your%20portfolio"
            ref={refs[7]}
            className={`${cardClass} bg-slate-100 text-white w-16 grow hover:grow-[1.5]`}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"
              className="w-20"
              alt="Gmail"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Socials;
