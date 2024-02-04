// import { useContext, useEffect, useState } from "react";
// import * as apiService from "../api-service";
// import { AuthContext } from "../../context/AuthContext";

// function Area() {
//   const [dataState, setDataState] = useState(undefined);
//   const [data, setData] = useState(null);
//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     if (user && user.getIdToken) {
//       (async () => {
//         const userIdToken = await user.getIdToken();
//         try {
//           const fetchedData = await apiService.getUserData({
//             userIdToken,
//             userId: user.uid,
//           });
//           console.log("secureNote == ", fetchedData);
//           setData(fetchedData);
//           setDataState("success");
//         } catch {
//           setDataState("error");
//         }
//       })();
//     }
//   }, [user]);

//   return (
//     <div style={{ fontSize: 20, textAlign: "center" }}>
//       {dataState === "success" && <div>{data}</div>}
//       {dataState === "error" && <div>Error fetching secure note</div>}
//       {dataState === undefined && <div>Loading...</div>}
//     </div>
//   );
// }

// export default Area;
