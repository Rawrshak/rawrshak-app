import Hero from './Hero';
import FeaturedAssets from './FeaturedAssets';
import ExploreAssets from './ExploreAssets';

function Home() {
  return (
    <div className="flex justify-start flex-wrap">
      <Hero />
      <FeaturedAssets />
      <ExploreAssets show={true} />
    </div>
  );
}

export default Home;