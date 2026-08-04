// import Navbar from "@/components/Navbar";
// import ServiceSection from "@/components/ServiceSection";

// const SERVICES = [
//   {
//     eyebrow: "SERVICE 01",
//     title: "Core Product Engineering",
//     whatIsHeading: "What is Core Product Engineering?",
//     whatIsBody:
//       "Core Product Engineering is the process of building high-performance, scalable, and secure digital architectures tailored to complex business logic. From cloud-native SaaS platforms to intelligent AI systems, it transforms complex operational demands into seamless digital products.",
//     offeringsHeading: "Our Core Product Engineering Services",
//     offerings: [
//       {
//         title: "Web & Cloud Platforms",
//         desc: "We design and deploy high-availability Business Logic Web Applications, scalable SaaS products, and secure portal-based systems built for enterprise growth.",
//       },
//       {
//         title: "Mobile Ecosystems",
//         desc: "We build powerful multi-platform apps and Business Logic Native Applications that deliver flawless user experiences across iOS and Android, alongside Progressive Web Apps (PWAs) for instant web-based accessibility.",
//       },
//       {
//         title: "Custom Software",
//         desc: "Tailor-made software architectures, including comprehensive Custom Enterprise Resource Planning (ERP) systems, built to streamline your unique operational workflows.",
//       },
//       {
//         title: "AI & Cognitive Systems",
//         desc: "We engineer tomorrow's technology today by developing Custom AI Models and building AI-integrated web and mobile applications that automate decision-making.",
//       },
//     ],
//     closingHeading: "Why Choose Our Product Engineering?",
//     closingBody:
//       "We don't just write code; we engineer long-term business assets. Our products are architected to scale seamlessly as your user base grows, ensuring high security, low latency, and robust integration capabilities.",
//   },
//   {
//     eyebrow: "SERVICE 02",
//     title: "Digital Transformation",
//     whatIsHeading: "What is Digital Transformation?",
//     whatIsBody:
//       "Digital Transformation is the strategic integration of modern technology into all areas of a business to fundamentally change how you operate and deliver value to customers. It bridges the gap between traditional operations and agile, data-driven digital growth.",
//     offeringsHeading: "Our Digital Transformation Packages",
//     offerings: [
//       {
//         title: "Digital Startup (Base)",
//         desc: "Establish your digital footprint with a high-converting web presence, agile custom web/app development, essential internal operations and management tools, and targeted growth marketing.",
//       },
//       {
//         title: "Transformation Plus",
//         desc: "Scale your reach and efficiency. This tier includes advanced custom web and app development, optimized internal management tools, and data-backed growth marketing strategies to accelerate market acquisition.",
//       },
//       {
//         title: "Transformation Pro (AI)",
//         desc: "Future-proof your enterprise. We inject intelligence into your ecosystem through custom web and app development featuring deep AI integration, AI-enabled internal operations, and advanced growth marketing automation.",
//       },
//     ],
//     closingHeading: "How We Drive Business Transformation",
//     closingBody:
//       "True transformation is about shifting mindsets and workflows. We analyze your existing bottlenecks to deploy agile digital tools that eliminate friction, boost team productivity, and maximize your ROI.",
//   },
//   {
//     eyebrow: "SERVICE 03",
//     title: "Integrated Suites",
//     whatIsHeading: "What are Integrated Suites?",
//     whatIsBody:
//       "Integrated Suites are all-in-one digital toolkits designed to completely manage, optimize, and market your business operations. Instead of piecing together fragmented software, these suites offer cohesive, pre-configured ecosystems for commerce and internal management.",
//     offeringsHeading: "Explore Our Integrated Suites",
//     offerings: [
//       {
//         title: "Business Suite",
//         desc: "Lay a solid operational foundation with professional web development and centralized internal operations and management tools.",
//       },
//       {
//         title: "Business Plus Suite",
//         desc: "Upgrade your decision-making with advanced web and app development tied to powerful, real-time analytics systems.",
//       },
//       {
//         title: "Ecom Suite",
//         desc: "Launch your digital retail storefront seamlessly with full ecommerce website development, custom Shopify setups, and marketplace store configurations for platforms like Amazon and Flipkart.",
//       },
//       {
//         title: "Ecom Plus Suite",
//         desc: "The ultimate digital retail engine. Combining full ecommerce development, Shopify setups, and marketplace management with an end-to-end digital marketing setup, business awareness campaigns, and advanced SEO optimization to guarantee visibility.",
//       },
//     ],
//   },
// ];

// export default function ServicesPage() {
//   return (
//     <>
//       <Navbar />
//       <main className="pt-32">
//         <div className="mx-auto mb-4 max-w-3xl px-[8vw] text-center">
//           <span className="mb-5 inline-block rounded-full border border-violet-dim px-4 py-1.5 font-mono text-[11px] tracking-[3px] text-violet">
//             WHAT WE DO
//           </span>
//           <h1 className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
//             Three ways we build your edge.
//           </h1>
//         </div>

//         <div className="px-[8vw]">
//           {SERVICES.map((service) => (
//             <ServiceSection key={service.title} {...service} />
//           ))}
//         </div>
//       </main>
//       {/* <Footer /> */}
//     </>
//   );
// }
import Navbar from "@/components/Navbar";
import ServiceSection from "@/components/ServiceSection";

const SERVICES = [
  {
    eyebrow: "SERVICE 01",
    title: "Core Product Engineering",
    whatIsHeading: "What is Core Product Engineering?",
    whatIsBody:
      "Core Product Engineering is the process of building high-performance, scalable, and secure digital architectures tailored to complex business logic. From cloud-native SaaS platforms to intelligent AI systems, it transforms complex operational demands into seamless digital products.",
    offeringsHeading: "Our Core Product Engineering Services",
    offerings: [
      {
        title: "Web & Cloud Platforms",
        desc: "We design and deploy high-availability Business Logic Web Applications, scalable SaaS products, and secure portal-based systems built for enterprise growth.",
      },
      {
        title: "Mobile Ecosystems",
        desc: "We build powerful multi-platform apps and Business Logic Native Applications that deliver flawless user experiences across iOS and Android, alongside Progressive Web Apps (PWAs) for instant web-based accessibility.",
      },
      {
        title: "Custom Software",
        desc: "Tailor-made software architectures, including comprehensive Custom Enterprise Resource Planning (ERP) systems, built to streamline your unique operational workflows.",
      },
      {
        title: "AI & Cognitive Systems",
        desc: "We engineer tomorrow's technology today by developing Custom AI Models and building AI-integrated web and mobile applications that automate decision-making.",
      },
    ],
    closingHeading: "Why Choose Our Product Engineering?",
    closingBody:
      "We don't just write code; we engineer long-term business assets. Our products are architected to scale seamlessly as your user base grows, ensuring high security, low latency, and robust integration capabilities.",
  },
  {
    eyebrow: "SERVICE 02",
    title: "Digital Transformation",
    whatIsHeading: "What is Digital Transformation?",
    whatIsBody:
      "Digital Transformation is the strategic integration of modern technology into all areas of a business to fundamentally change how you operate and deliver value to customers. It bridges the gap between traditional operations and agile, data-driven digital growth.",
    offeringsHeading: "Our Digital Transformation Packages",
    offerings: [
      {
        title: "Digital Startup (Base)",
        desc: "Establish your digital footprint with a high-converting web presence, agile custom web/app development, essential internal operations and management tools, and targeted growth marketing.",
      },
      {
        title: "Transformation Plus",
        desc: "Scale your reach and efficiency. This tier includes advanced custom web and app development, optimized internal management tools, and data-backed growth marketing strategies to accelerate market acquisition.",
      },
      {
        title: "Transformation Pro (AI)",
        desc: "Future-proof your enterprise. We inject intelligence into your ecosystem through custom web and app development featuring deep AI integration, AI-enabled internal operations, and advanced growth marketing automation.",
      },
    ],
    closingHeading: "How We Drive Business Transformation",
    closingBody:
      "True transformation is about shifting mindsets and workflows. We analyze your existing bottlenecks to deploy agile digital tools that eliminate friction, boost team productivity, and maximize your ROI.",
  },
  {
    eyebrow: "SERVICE 03",
    title: "Integrated Suites",
    whatIsHeading: "What are Integrated Suites?",
    whatIsBody:
      "Integrated Suites are all-in-one digital toolkits designed to completely manage, optimize, and market your business operations. Instead of piecing together fragmented software, these suites offer cohesive, pre-configured ecosystems for commerce and internal management.",
    offeringsHeading: "Explore Our Integrated Suites",
    offerings: [
      {
        title: "Business Suite",
        desc: "Lay a solid operational foundation with professional web development and centralized internal operations and management tools.",
      },
      {
        title: "Business Plus Suite",
        desc: "Upgrade your decision-making with advanced web and app development tied to powerful, real-time analytics systems.",
      },
      {
        title: "Ecom Suite",
        desc: "Launch your digital retail storefront seamlessly with full ecommerce website development, custom Shopify setups, and marketplace store configurations for platforms like Amazon and Flipkart.",
      },
      {
        title: "Ecom Plus Suite",
        desc: "The ultimate digital retail engine. Combining full ecommerce development, Shopify setups, and marketplace management with an end-to-end digital marketing setup, business awareness campaigns, and advanced SEO optimization to guarantee visibility.",
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 sm:pt-28 md:pt-32">
        <div className="mx-auto mb-4 max-w-3xl px-6 text-center sm:px-[6vw] lg:px-[8vw]">
          <span className="mb-4 inline-block rounded-full border border-violet-dim px-3 py-1 font-mono text-[10px] tracking-[2px] text-violet sm:mb-5 sm:px-4 sm:py-1.5 sm:text-[11px] sm:tracking-[3px]">
            WHAT WE DO
          </span>
          <h1 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
            Three ways we build your edge.
          </h1>
        </div>

        <div className="px-6 sm:px-[6vw] lg:px-[8vw]">
          {SERVICES.map((service) => (
            <ServiceSection key={service.title} {...service} />
          ))}
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}