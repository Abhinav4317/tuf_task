import Card from "../components/Card";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="bg-black min-h-screen w-full font-serif">
      <Header />
      <div className="min-h-[32rem] w-[32rem] p-16 mx-auto flex items-center justify-center">
        <Card />
      </div>
    </div>
  );
};

export default Home;
