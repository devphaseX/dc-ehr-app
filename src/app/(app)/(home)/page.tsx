import DiscoverBooks from './_components/discover';
import { Footer } from '../_components/footer';
import { Heroes } from './_components/heroes';
import { Resources } from './_components/resources';
import { HowItWorks } from './_components/works';

export default function Home() {
  return (
    <div className="pt-[88px]">
      <Heroes />
      <Resources />
      {/* <HowItWorks /> */}
      <DiscoverBooks />
      <Footer copyRightYear={new Date().getFullYear()} />
    </div>
  );
}
