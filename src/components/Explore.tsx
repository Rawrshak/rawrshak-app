import ExploreFeatured from './ExploreFeatured';
import ExploreMoreAssets from './ExploreMoreAssets';

function Explore() {

  return (
    <div className="flex justify-items-center place-content-center flex-wrap mt-5 flex-col w-full">

      <div className='flex justify-items-center place-content-center w-full'>
        <div className="flex text-offWhite text-xxxxl">
          EXPLORE
        </div>
      </div>
      {/*show Featured Collections*/}
      <ExploreFeatured />
      {/*show Top Volume Assets*/}
      <ExploreMoreAssets AssetSectionTitle='Top Volume' />
    </div>
  );
}

export default Explore;