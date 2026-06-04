import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchTickets();
  }, [search, status]);

  const fetchTickets = async () => {
    let url = "/api/tickets?";

    if (search) {
      url += `search=${search}&`;
    }

    if (status) {
      url += `status=${status}`;
    }

    const response = await API.get(url);

    setTickets(response.data);
  };

  const openCount = tickets.filter(
    (t) => t.status === "Open"
  ).length;

  const progressCount = tickets.filter(
    (t) => t.status === "In Progress"
  ).length;

  const closedCount = tickets.filter(
    (t) => t.status === "Closed"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            Support CRM
          </h1>

          <Link to="/create">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              + Create Ticket
            </button>
          </Link>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">
              Total Tickets
            </h3>
            <p className="text-3xl font-bold">
              {tickets.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">
              Open
            </h3>
            <p className="text-3xl font-bold text-red-500">
              {openCount}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">
              In Progress
            </h3>
            <p className="text-3xl font-bold text-yellow-500">
              {progressCount}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-gray-500">
              Closed
            </h3>
            <p className="text-3xl font-bold text-green-500">
              {closedCount}
            </p>
          </div>

        </div>

        <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-4">

          <input
            type="text"
            placeholder="Search tickets..."
            className="border p-2 rounded w-full"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            className="border p-2 rounded"
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <option value="">All</option>
            <option value="Open">Open</option>
            <option value="In Progress">
              In Progress
            </option>
            <option value="Closed">
              Closed
            </option>
          </select>

        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-200">

              <tr>
                <th className="text-left p-4">
                  Ticket ID
                </th>

                <th className="text-left p-4">
                  Customer
                </th>

                <th className="text-left p-4">
                  Subject
                </th>

                <th className="text-left p-4">
                  Status
                </th>
              </tr>

            </thead>

            <tbody>

              {tickets.map((ticket) => (

                <tr
                  key={ticket.id}
                  className="border-t"
                >

                  <td className="p-4">

                    <Link
                      className="text-blue-600"
                      to={`/ticket/${ticket.ticket_id}`}
                    >
                      {ticket.ticket_id}
                    </Link>

                  </td>

                  <td className="p-4">
                    {ticket.customer_name}
                  </td>

                  <td className="p-4">
                    {ticket.subject}
                  </td>

                  <td className="p-4">

                    <span
                      className={
                        ticket.status === "Closed"
                          ? "bg-green-100 text-green-700 px-3 py-1 rounded-full"
                          : ticket.status ===
                            "In Progress"
                          ? "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full"
                          : "bg-red-100 text-red-700 px-3 py-1 rounded-full"
                      }
                    >
                      {ticket.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;