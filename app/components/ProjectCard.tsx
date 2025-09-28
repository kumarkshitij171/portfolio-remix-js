import MagicButton from "~/utils/MagicButton";
import { Link } from "react-router-dom";
import { FaLocationArrow } from "react-icons/fa6";

interface ProjectCardProps {
  title: string;
  image: string;
  desc: string;
  link: string;

}

const ProjectCard = ({ title, image, desc, link }: ProjectCardProps) => {
  return (
    <div className="my-3 w-80 md:w-96 mx-auto">
      <div className="flex flex-col gap-2 p-3 h-[600px] bg-gradient-to-br from-[#010320] to-[#111325] rounded-xl border border-gray-600">
        <img
          src={image}
          alt={title}
          className="rounded-lg w-full h-64 object-cover object-top"
        />
        <p className="text-3xl font-bold">{title}</p>
        <div dangerouslySetInnerHTML={{__html:desc}} className="text-sm md:text-base"/>
        <div className="flex justify-between gap-5">
          <Link to={link} target="b">
            <MagicButton
              title="Checkout"
              w={"40"}
              icon={<FaLocationArrow />}
              position="right"
              otherClasses={"text-sm md:text-base"}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
