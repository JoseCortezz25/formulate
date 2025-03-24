import { Github } from "../icons";

const Footer = () => {
  return (
    <footer className="py-5 px-6">
      <div className="max-w-[980px] mx-auto flex flex-col md:flex-row justify-center">
        <div className="flex items-center space-x-4 mx-auto">
          <a
            href="https://github.com/JoseCortezz25"
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-3 items-center"
          >
            <span className="text-sm leading-2 font-semibold text-fm-black flex items-center">
              Created with
              <div className="w-3.5 mx-1.5"><svg version="1.1" id="fi_833472" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 391.837 391.837" xmlSpace="preserve"> <g> <path style={{ fill: '#D7443E' }} d="M285.257,35.528c58.743,0.286,106.294,47.836,106.58,106.58
      c0,107.624-195.918,214.204-195.918,214.204S0,248.165,0,142.108c0-58.862,47.717-106.58,106.58-106.58l0,0
      c36.032-0.281,69.718,17.842,89.339,48.065C215.674,53.517,249.273,35.441,285.257,35.528z"></path> </g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> <g></g> </svg></div>
              by josecortezz25
            </span>
            <Github className="size-6 text-black -mt-1" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;