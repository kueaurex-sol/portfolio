import ScrollStory from "@/components/ScrollStory";
import About from "./About";
import WhyChooseUs from "./WhyChooseUs";
import Services from "./Services";
import Framework from "./Framework";
import TopStories from "./TopStories";
import Faq from "./Faq";


export default function Page() {
  return (
    <>
      <ScrollStory>
        <About />
        <WhyChooseUs />
        <Services />
        <Framework />
        <TopStories />
        <Faq />
      </ScrollStory>
    </>
  );
}