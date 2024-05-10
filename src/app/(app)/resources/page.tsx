import { Footer } from '../_components/footer';
import DiscoverBooks from './_components/discover';
import { Heroes } from './_components/heroes';

export default function ResourcePage() {
  return (
    <>
      <Heroes />
      <DiscoverBooks />
      <Footer copyRightYear={2024} />
    </>
  );
}
