import { useEffect, useRef } from "react";
import useIntersectionObserver from "~/hooks/UseIntersectionObserver";

interface AnimatedTextProps {
  text: string;
  delay?: number; 
  refresh?: boolean;
}

export default function AnimatedText({
  text,
  delay = 0,
  refresh = false,
}: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useIntersectionObserver(textRef);

  useEffect(() => {
    mount();
  }, [text, delay, refresh]);

  useEffect(() => {
    if (isVisible && refresh) {
      mount();
    }
  }, [isVisible, refresh]);

  async function mount() {
    if (!textRef.current) return;

    Array.from(textRef.current.children).forEach((child) => {
      child.className = "anim-char-out";
    });

    await new Promise((resolve) => {
      setTimeout(resolve, 200 + textRef.current!.children.length * 25);
    });

    const html = text
      .split("")
      .map(
        (char, index) =>
          `<span class='anim-char-in' style='animation-delay: ${
            index * 25 + delay
          }ms;'>${char}</span>`
      )
      .join("");

    if (textRef.current) {
      textRef.current.innerHTML = html;
    }
  }

  return <div ref={textRef}></div>;
}
