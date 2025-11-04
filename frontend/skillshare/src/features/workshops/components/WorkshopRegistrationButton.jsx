// import { Button, CircularProgress } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { toast } from "react-toastify";
// import {
//   registerWorkshop,
//   fetchMyRegistrations,
// } from "../actions/workshopActions";

// export default function WorkshopRegistrationButton({ workshopId }) {
//   const dispatch = useDispatch();

//   const { user: currentUser } = useSelector((state) => state.auth);
//   console.log(currentUser);
//   const { myRegistrations, registerStatus } = useSelector(
//     (state) => state.workshops
//   );

//   // Check if already registered
//   const isRegistered = myRegistrations?.some(
//     (reg) =>
//       Number(reg.workshop) === Number(workshopId) &&
//       Number(reg.user) === Number(currentUser?.id)
//   );

//   useEffect(() => {
//     if (currentUser) dispatch(fetchMyRegistrations());
//   }, [dispatch, currentUser, registerStatus]);

//   const handleRegister = () => {
//     dispatch(registerWorkshop({ workshop: workshopId }))
//       .unwrap()
//       .then(() => {
//         toast.success(" Successfully registered!");
//         dispatch(fetchMyRegistrations()); // Refresh registrations
//       })
//       .catch((err) => {
//         const errorMessage =
//           err?.detail || "Registration failed. Please try again.";
//         toast.error(errorMessage);
//       });
//   };

//   if (!currentUser) return null;
//   {
//     console.log("Current User:", currentUser);
//   }

//   return (
//     <Button
//       variant={isRegistered ? "contained" : "outlined"}
//       color={isRegistered ? "success" : "primary"}
//       disabled={isRegistered || registerStatus === "loading"}
//       onClick={handleRegister}
//       startIcon={
//         registerStatus === "loading" ? (
//           <CircularProgress size={20} color="inherit" />
//         ) : null
//       }
//       aria-label={
//         isRegistered
//           ? "Already registered for this workshop"
//           : "Register for this workshop"
//       }
//       sx={{ mt: 2 }}
//     >
//       {registerStatus === "loading"
//         ? "Registering..."
//         : isRegistered
//         ? "Registered"
//         : "Register"}
//     </Button>
//   );
// }
