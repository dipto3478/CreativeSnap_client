import Banner from "../Banner/Banner";
import FaqSection from "../FAQ/FaqSection";
import PopularClasses from "../PopularClasses/Popularclasses";
import PopularInstructor from "../PopularInstructor/PopularInstructor";

const Home = () => {
  return (
    <>
      <Banner />
      <PopularClasses />
      <PopularInstructor />
      <FaqSection />
    </>
  );
};

export default Home;
