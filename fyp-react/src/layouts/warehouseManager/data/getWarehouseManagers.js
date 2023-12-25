import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Table, Spinner } from "react-bootstrap";
import { db } from "../../../firebase";
import MDButton from "components/MDButton";
import "../../../examples/Tables/DataTable/table-style.css";

function WarehouseManagers({ searchTerm, setSearchTerm }) {
  const [warehouseManagers, setWarehouseManagers] = useState([]); // State to store fetched warehouseManagers
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWarehouseManagersData = async () => {
      try {
        const warehouseManagerCollectionRef = collection(
          db,
          "warehouseManager"
        );
        const querySnapshot = await getDocs(warehouseManagerCollectionRef);

        const warehouseManagersData = [];
        for (const docSnap of querySnapshot.docs) {
          const warehouseManager = docSnap.data();
          const warehouseManagerId = docSnap.id;

          const warehouseManagerObject = {
            id: warehouseManagerId,
            name: warehouseManager.name,
            email: warehouseManager.email,
            idCard: warehouseManager.idCard,
            phone: warehouseManager.phone,
            address: warehouseManager.address,
          };

          warehouseManagersData.push(warehouseManagerObject);
        }

        setWarehouseManagers(warehouseManagersData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching warehouseManagers: ", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchWarehouseManagersData();
  }, []);

  const filteredWarehouseManagers = warehouseManagers.filter(
    (warehouseManager) => {
      const searchTermLower = searchTerm.toLowerCase();

      return (
        (warehouseManager.name &&
          warehouseManager.name.toLowerCase().includes(searchTermLower)) ||
        (warehouseManager.email &&
          warehouseManager.email.toLowerCase().includes(searchTermLower)) ||
        warehouseManager.phone.toString().includes(searchTerm) ||
        warehouseManager.idCard.toString().includes(searchTerm) ||
        (warehouseManager.address &&
          warehouseManager.address.toLowerCase().includes(searchTermLower))
      );
    }
  );

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "warehouseManager", id));

      const updatedWarehouseManagers = warehouseManagers.filter(
        (warehouseManager) => warehouseManager.id !== id
      );
      setWarehouseManagers(updatedWarehouseManagers);
    } catch (error) {
      console.error("Error deleting warehouseManager: ", error);
    }
  };

  if (loading) {
    return (
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
          <span>Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
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
    </div>
  );
}

export default WarehouseManagers;
