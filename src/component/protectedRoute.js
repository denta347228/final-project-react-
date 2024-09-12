import { useNavigate, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const canSeeDetail = true;

  if (!canSeeDetail) {
    console.log("cekkk");
  } else {
    console.log("ada yang salah");
  }
}
