import { useState } from "react";
import Riders from "../components/riders";

function Rider() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <h1>Riders List</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      <Riders searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  );
}

export default Rider;
