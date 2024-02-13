import Footer from "./components/Footer";
import FormCard from "./components/FormCard";
import SocialIcons from "./components/SocialIcons";
import Supporters from "./components/Supporters";

function App() {
  return (
    <div className="bg-background flex flex-col items-center justify-center gap-10 pt-16">
      <div className="text-3xl font-medium">
        Buy <span className="text-primary text-4xl">Mohsin</span> A Coffee!
      </div>
      <SocialIcons />
      <FormCard />
      <div className="text-xl font-semibold">Recent Supporters</div>
      <Supporters />
      <Footer />
    </div>
  );
}

export default App;
