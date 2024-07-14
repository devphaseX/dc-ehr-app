import { ChooseCategory } from './__components/category-section';
import { Heroes } from './heroes';
import { Contents } from './contents';
import { QuickSignUp } from './quick-sign-up';

const Home = () => {
  return (
    <>
      <Heroes />
      <ChooseCategory />
      <Contents />
      <QuickSignUp />
    </>
  );
};

export default Home;
