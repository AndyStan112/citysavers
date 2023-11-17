import "./SearchBox.css";
import Control from "react-leaflet-custom-control";
import SearchIcon from "@mui/icons-material/Search";

function SearchBox() {
  return (
    <Control position="topleft">
      <div className="map-search-box">
        <form className="map-search-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Search" />
          <button>
            <SearchIcon />
          </button>
        </form>
        {/* <div className="map-search-results">
          <button className="search-result">
            <span className="primary">Location</span>
            <span className="secondary">123 Street</span>
          </button>
          <button className="search-result">
            <span className="primary">Location</span>
            <span className="secondary">123 Street</span>
          </button>
          <button className="search-result">
            <span className="primary">Location</span>
            <span className="secondary">123 Street</span>
          </button>
        </div> */}
      </div>
    </Control>
  );
}

export default SearchBox;
