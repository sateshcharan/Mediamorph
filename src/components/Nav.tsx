import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

const Nav = () => {
  const navigate: any = useNavigate();
  return (
    <div className="w-full flex flex-row justify-around items-center  p-8">
      <img
        src="vite.svg"
        alt="logo"
        width={80}
        onClick={() => navigate("/")}
        className="cursor-pointer"
      />

      <menu className="flex flex-row gap-4">
        <Button variant="ghost" className="font-semibold text-md">
          <Link to="/">Home</Link>
        </Button>
        <Button variant="ghost" className="font-semibold text-md">
          <Link to="about">About</Link>
        </Button>
        <Button variant="ghost" className="font-semibold text-md">
          <Link to="privacy-policy">Privacy Policy</Link>
        </Button>
      </menu>

      <div className="flex flex-row gap-4 justify-end">
        <ModeToggle />
        <Button className=" text-foreground" variant="outline">
          <a href="https://github.com/sateshcharan/Mediamorph" target="_blank">
            Star on Github
          </a>
        </Button>
      </div>
    </div>
  );
};

export default Nav;
