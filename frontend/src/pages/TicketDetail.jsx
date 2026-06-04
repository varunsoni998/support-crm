import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

function TicketDetail() {
  const { ticketId } = useParams();

  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchTicket();
  }, []);

  const fetchTicket = async () => {
    try {
      const response = await API.get(
        `/api/tickets/${ticketId}`
      );

      setTicket(response.data);
      setStatus(response.data.status);

    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async () => {
    try {
      await API.put(
        `/api/tickets/${ticketId}`,
        {
          status: status,
        }
      );

      alert("Status Updated");

      fetchTicket();

    } catch (error) {
      console.error(error);
    }
  };

  if (!ticket) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-4xl mx-auto">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-4xl font-bold">
            {ticket.ticket_id}
          </h1>

          <Link to="/">
            <button className="bg-gray-700 text-white px-4 py-2 rounded-lg">
              Dashboard
            </button>
          </Link>

        </div>

        <div className="bg-white rounded-xl shadow p-8">

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <h3 className="text-gray-500">
                Customer Name
              </h3>

              <p className="font-semibold">
                {ticket.customer_name}
              </p>
            </div>

            <div>
              <h3 className="text-gray-500">
                Email
              </h3>

              <p className="font-semibold">
                {ticket.customer_email}
              </p>
            </div>

            <div>
              <h3 className="text-gray-500">
                Subject
              </h3>

              <p className="font-semibold">
                {ticket.subject}
              </p>
            </div>

            <div>
              <h3 className="text-gray-500">
                Current Status
              </h3>

              <span
                className={
                  ticket.status === "Closed"
                    ? "bg-green-100 text-green-700 px-3 py-1 rounded-full"
                    : ticket.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full"
                    : "bg-red-100 text-red-700 px-3 py-1 rounded-full"
                }
              >
                {ticket.status}
              </span>
            </div>

          </div>

          <div className="mt-8">

            <h3 className="text-gray-500 mb-2">
              Description
            </h3>

            <div className="border rounded-lg p-4 bg-gray-50">
              {ticket.description}
            </div>

          </div>

          <div className="mt-8 border-t pt-6">

            <h3 className="text-xl font-semibold mb-4">
              Update Status
            </h3>

            <div className="flex gap-4">

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                className="border rounded-lg p-3"
              >
                <option value="Open">
                  Open
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Closed">
                  Closed
                </option>

              </select>

              <button
                onClick={updateStatus}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default TicketDetail;