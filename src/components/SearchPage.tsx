import { useEffect, useState } from "react";
import DropdownFilter from "./DropdownFilter";
import SearchResults from "./SearchResults";

function SearchPage({
  searchTerm,
}:{
  searchTerm:string
}) {

  const [genre,setGenre] = useState<string>('')
  const [type,setType] = useState<string>('')
  const [allFilters,setAllFilters] = useState<string[]>([])

  useEffect(() => {
    setAllFilters([genre,type])
  }, [genre,type]);

  return (
    <div className="flex flex-col py-2">
      <div className="flex text-offWhite text-xxxl">
        Search Results:
        <DropdownFilter menuName="Genre" itemList={['All','Horror','RPG','Open World','Story']} filter={genre} setFilter={setGenre}/>
        <DropdownFilter menuName="Type" itemList={['All','Text','Image','Audio','static3dobject']} filter={type} setFilter={setType}/>
      </div>
      <SearchResults filterWords={searchTerm} filters={allFilters}/>
    </div>
  );
}

export default SearchPage;