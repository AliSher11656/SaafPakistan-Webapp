import React, { useContext, useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import MDButton from "components/MDButton";
import "../../../examples/Tables/DataTable/table-style.css";
import * as apiService from "../../api-service";
import { AuthContext } from "../../../context/AuthContext";

function WarehouseManagers({ searchTerm, setSearchTerm }) {
  const [warehouseManagers, setWarehouseManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.getIdToken) {
      (async () => {
        const userIdToken = await user.getIdToken();
        try {
          const fetchedData = await apiService.getWarehouseManagerData({
            userIdToken,
          });
          // console.log("Fetched data:", fetchedData);
          setWarehouseManagers(fetchedData);
          setLoading(false);
        } catch (error) {
          setError("Error fetching warehouse managers: " + error.message);
          setLoading(false);
        }
      })();
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (!user || !user.getIdToken) {
      return;
    }
    const userIdToken = await user.getIdToken();
    try {
      await apiService.deleteWarehouseManager({ userIdToken, id });
      const updatedWarehouseManagers = warehouseManagers.filter(
        (warehouseManager) => warehouseManager.id !== id
      );
      setWarehouseManagers(updatedWarehouseManagers);
    } catch (error) {
      console.error("Error deleting warehouse manager: ", error);
    }
  };

  const filteredWarehouseManagers = warehouseManagers.filter(
    (warehouseManager) =>
      Object.values(warehouseManager)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <Spinner
            animation="border"
            role="status"
            style={{ width: "100px", height: "100px" }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              <th className="table-header">Name</th>
              <th className="table-header">Phone</th>
              <th className="table-header">Email</th>
              <th className="table-header">Address</th>
              <th className="table-header">Id Card Number</th>
              <th className="table-header"></th>
            </tr>
          </thead>
          <tbody>
            {filteredWarehouseManagers.map((warehouseManager) => (
              <tr key={warehouseManager.id} className="table-row">
                <td className="table-cell">{warehouseManager.name}</td>
                <td className="table-cell">{warehouseManager.phone}</td>
                <td className="table-cell">{warehouseManager.email}</td>
                <td className="table-cell">{warehouseManager.address}</td>
                <td className="table-cell">{warehouseManager.idCard}</td>
                <td className="table-cell">
                  <MDButton
                    variant="gradient"
                    color="dark"
                    fullWidth
                    type="delete"
                    onClick={() => handleDelete(warehouseManager.id)}
                  >
                    Delete
                  </MDButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default WarehouseManagers;
