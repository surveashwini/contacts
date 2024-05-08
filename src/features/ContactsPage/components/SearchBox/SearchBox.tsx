import { ChangeEvent } from "react";
import "./SearchBox.css";

const SearchBox: React.FC<{
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  }> = ({ onInputChange }) => {
    return (
        <input className="search" placeholder="Search" onChange={onInputChange}/>
    )
}

export default SearchBox;