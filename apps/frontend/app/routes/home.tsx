import { Cta10 } from '~/components/marketing/cta10';
import { Feature43 } from '~/components/marketing/feature43';
import { Footer2 } from '~/components/marketing/footer2';
import { Hero115 } from '~/components/marketing/hero115';
import { Logos18 } from '~/components/marketing/logos18';
import { Navbar1 } from '~/components/marketing/navbar1';
import { Pricing2 } from '~/components/marketing/pricing2';
import { Testimonial9 } from '~/components/marketing/testimonial9';

export default function Home() {
  return (
    <div className="flex w-full flex-col">
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
