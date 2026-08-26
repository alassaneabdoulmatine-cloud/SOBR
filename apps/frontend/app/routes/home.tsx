import { Cta10 } from "~/components/cta10";
import { Feature43 } from "~/components/feature43";
import { Footer2 } from "~/components/footer2";
import { Hero115 } from "~/components/hero115";
import { Logos18 } from "~/components/logos18";
import { Navbar1 } from "~/components/navbar1";
import { Pricing2 } from "~/components/pricing2";
import { Testimonial9 } from "~/components/testimonial9";

export default function Home() {
  return (
    <div className="flex w-full flex-col" >
      <Navbar1 />
      <Hero115 />
      <Logos18 />
      <Feature43 />
      <Testimonial9 />
      <Pricing2 />
      <Cta10 />
      <Footer2 />
    </div>
  );
}
