import React from "react";
import { useDispatch, useSelector } from "react-redux";
 const Protected = ({ children, role }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user || (role && user.role !== role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default Protected;