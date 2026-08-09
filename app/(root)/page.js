import ScrollStory from "@/components/ScrollStory";
import About from "@/components/home/About";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Services from "@/components/home/Services";
import Framework from "@/components/home/Framework";
import TopStories from "@/components/home/TopStories";
import Faq from "@/components/home/Faq";


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