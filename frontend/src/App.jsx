import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CreateTicket from "./pages/CreateTicket";
import TicketDetail from "./pages/TicketDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/create" element={<CreateTicket />} />

        <Route
          path="/ticket/:ticketId"
          element={<TicketDetail />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;