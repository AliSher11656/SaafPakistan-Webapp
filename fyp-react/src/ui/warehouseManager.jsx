import { useState } from "react";
import WarehouseManagers from "../components/warehouseManagers";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function WarehouseManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate("register")}>
        Add Warehouse Manager
      </Button>

      <h1>Warehouse Managers List</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      <WarehouseManagers
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
}

export default WarehouseManager;
