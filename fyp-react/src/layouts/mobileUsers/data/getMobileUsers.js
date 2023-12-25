import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Table, Spinner } from "react-bootstrap";
import { db } from "../../../firebase";
import MDButton from "components/MDButton";
import "../../../examples/Tables/DataTable/table-style.css";

function MobileUsers({ searchTerm, setSearchTerm }) {
  const [mobileUsers, setMobileUsers] = useState([]); // State to store fetched mobileUsers
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMobileUsersData = async () => {
      try {
        const mobileUserCollectionRef = collection(db, "appUsers");
        const querySnapshot = await getDocs(mobileUserCollectionRef);

        const mobileUsersData = [];
        for (const docSnap of querySnapshot.docs) {
          const mobileUser = docSnap.data();
          const mobileUserId = docSnap.id;

          const mobileUserObject = {
            id: mobileUserId,
            name: mobileUser.name,
            email: mobileUser.email,
            phone: mobileUser.phone,
            address: mobileUser.address,
            area: mobileUser.area,
            accountType: mobileUser.accountType,
          };

          mobileUsersData.push(mobileUserObject);
        }

        setMobileUsers(mobileUsersData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching mobileUsers: ", error);
        setError("Error fetching data. Please try again later.");
        setLoading(false);
      }
    };

    fetchMobileUsersData();
  }, []);

  const filteredMobileUsers = mobileUsers.filter((mobileUser) => {
    const searchTermLower = searchTerm.toLowerCase();

    return (
      (mobileUser.name &&
        mobileUser.name.toLowerCase().includes(searchTermLower)) ||
      (mobileUser.email &&
        mobileUser.email.toLowerCase().includes(searchTermLower)) ||
      mobileUser.phone.toString().includes(searchTerm) ||
      mobileUser.accountType.toLowerCase().includes(searchTerm) ||
      (mobileUser.address &&
        mobileUser.address.toLowerCase().includes(searchTermLower)) ||
      (mobileUser.area &&
        mobileUser.area.toLowerCase().includes(searchTermLower))
    );
  });

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "appUsers", id));

      const updatedMobileUsers = mobileUsers.filter(
        (mobileUser) => mobileUser.id !== id
      );
      setMobileUsers(updatedMobileUsers);
    } catch (error) {
      console.error("Error deleting mobileUser: ", error);
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
            <th className="table-header">Area</th>
            <th className="table-header">Account Type</th>
            <th className="table-header"></th>
          </tr>
        </thead>
        <tbody>
          {filteredMobileUsers.map((mobileUser) => (
            <tr key={mobileUser.id} className="table-row">
              <td className="table-cell">{mobileUser.name}</td>
              <td className="table-cell">{mobileUser.phone}</td>
              <td className="table-cell">{mobileUser.email}</td>
              <td className="table-cell">{mobileUser.address}</td>
              <td className="table-cell">{mobileUser.area}</td>
              <td className="table-cell">{mobileUser.accountType}</td>
              <td className="table-cell">
                <MDButton
                  variant="gradient"
                  color="dark"
                  fullWidth
                  type="delete"
                  onClick={() => handleDelete(mobileUser.id)}
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

export default MobileUsers;
