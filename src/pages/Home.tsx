import GetFile from "../components/GetFile";
import Body from "../components/Body";

const Home = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Body />
      <GetFile />
    </div>
  );
};

export default Home;
