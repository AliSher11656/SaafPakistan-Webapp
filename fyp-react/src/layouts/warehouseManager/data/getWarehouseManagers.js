import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Table, Spinner, Button } from "react-bootstrap";
import { db } from "../../../firebase";

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

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
      <Spinner animation="border" role="status">
        Loading...
      </Spinner>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Id Card Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredWarehouseManagers.map((warehouseManager) => (
            <tr key={warehouseManager.id}>
              <td>{warehouseManager.name}</td>
              <td>{warehouseManager.phone}</td>
              <td>{warehouseManager.email}</td>
              <td>{warehouseManager.address}</td>
              <td>{warehouseManager.idCard}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(warehouseManager.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default WarehouseManagers;
