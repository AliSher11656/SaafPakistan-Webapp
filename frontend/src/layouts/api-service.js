import axios from "axios";

const CLOUD_FUNCTIONS_ORIGIN = "http://localhost:3000";
const apiUrl = `${CLOUD_FUNCTIONS_ORIGIN}`;

export async function getWarehouseManagerData({ userIdToken }) {
  const url = `${apiUrl}/warehouseManager`;
  // console.log(`userIdToken: ${userIdToken}`);
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}

export async function deleteWarehouseManager({ userIdToken, id }) {
  const url = `${apiUrl}/warehouseManager/${id}`;
  const res = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}

// export async function getUserData({ userIdToken, userId }) {
//   const url = `${apiUrl}/areas/${userId}`;
//   console.log(`userIdToken: ${userIdToken}`);
//   const res = await axios.get(url, {
//     headers: {
//       Authorization: `Bearer ${userIdToken}`,
//     },
//   });
//   console.log("res == ", res.data);
//   return res.data;
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getMobileUsersData({ userIdToken }) {
  const url = `${apiUrl}/users`;
  // console.log(`userIdToken: ${userIdToken}`);
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}

export async function deleteMobileUser({ userIdToken, id }) {
  const url = `${apiUrl}/user/${id}`;
  const res = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function getRidersData({ userIdToken }) {
  const url = `${apiUrl}/rider`;
  // console.log(`userIdToken: ${userIdToken}`);
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}

export async function deleteRider({ userIdToken, id }) {
  const url = `${apiUrl}/rider/${id}`;
  const res = await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${userIdToken}`,
    },
  });
  // console.log("res == ", res.data);
  return res.data;
}