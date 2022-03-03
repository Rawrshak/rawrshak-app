import DropdownFilter from "./DropdownFilter";
import SearchResults from "./SearchResults";

function SearchPage({
  searchTerm,
  setSearchTerm
}:{
  searchTerm:string,
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}) {

  return (
    <div className="flex flex-col py-2">
      <div className="flex text-offWhite text-xxxl">
        Search Results:
        <DropdownFilter menuName="Genre" itemList={['All','Horror','RPG','Open World','Story']}/>
        <DropdownFilter menuName="Type" itemList={['All','Text','Image','Audio','3D']}/>
      </div>
      <SearchResults filterWords={searchTerm}/>
    </div>
  );
}

export default SearchPage;