import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function ParallaxBG(props: React.ComponentProps<"div">) {

    const headingRef = useRef(null);
    const BGFront2Ref = useRef(null);
    const BGFrontRef = useRef(null);

    const centerDiv = useRef(null);

    const mainDiv = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(
                centerDiv.current, {
                scrollTrigger: {
                    trigger: mainDiv.current,
                    start: "-1% 0%",
                    end: "bottom -100%",
                    scrub: true,
                }
            })

            gsap.fromTo(
                headingRef.current, {
                y: 50,
            },
                {
                    y: -300,
                    scrollTrigger: {
                        trigger: mainDiv.current,
                        start: "30% 45%",
                        end: "60% 0%",
                        scrub: true,
                    }
                }
            )
            gsap.fromTo(
                BGFrontRef.current, {
                yPercent: 0
            },
                {
                    yPercent: -20,
                    scrollTrigger: {
                        trigger: mainDiv.current,
                        start: "10% 10%",
                        end: "75% 0%",
                        scrub: true,
                    }
                }
            )
            gsap.fromTo(
                BGFront2Ref.current, {
                yPercent: 0
            },
                {
                    yPercent: -30,
                    scrollTrigger: {
                        trigger: mainDiv.current,
                        start: "10% 10%",
                        end: "75% 0%",
                        scrub: true,
                    }
                }
            );

            gsap.from(mainDiv.current,
                {
                    opacity: 0,
                    ease: "power4.out",
                    duration: 4,
                },
            );
            [BGFrontRef, BGFront2Ref].forEach((ref, index) => {
                gsap.from(ref.current,
                    {
                        y: -200,
                        ease: "power4.out",
                        duration: 4,
                        delay: .2 * index
                    },
                )
            })
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            <div className="overflow-x-clip flex justify-center ">
                <div ref={mainDiv} className="flex w-max gap-4 items-end">
                </div>
                <div ref={centerDiv} className='relative flex h-screen w-screen flex-col justify-center items-center overflow-clip  border-white/20 rounded-b-2xl'>
                    <div className='' ref={headingRef}>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}