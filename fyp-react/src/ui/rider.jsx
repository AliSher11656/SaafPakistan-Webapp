import { useState } from "react";
import Riders from "../components/riders";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Rider() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate("register")}>Add Rider</Button>
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
