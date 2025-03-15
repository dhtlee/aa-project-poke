import MagnifyingGlass from "../image/magnifying-glass";

const SearchBox = () => {
  return (
    <div className="search-box">
      <MagnifyingGlass />
      <input type="text" placeholder="Search">
      </input>
    </div>
  );
}

export default SearchBox;