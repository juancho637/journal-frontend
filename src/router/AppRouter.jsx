import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../modules/auth/routes/AuthRoutes";
import { JournalRoutes } from "../modules/journal/routes/JournalRoutes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/*" element={<JournalRoutes />} />
    </Routes>
  );
};
