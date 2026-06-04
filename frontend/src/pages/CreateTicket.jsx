import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function CreateTicket() {
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/tickets", formData);

      alert("Ticket Created Successfully!");

      setFormData({
        customer_name: "",
        customer_email: "",
        subject: "",
        description: "",
      });

    } catch (error) {
      console.error(error);
      alert("Error creating ticket");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-3xl mx-auto">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-4xl font-bold">
            Create Ticket
          </h1>

          <Link to="/">
            <button className="bg-gray-700 text-white px-4 py-2 rounded-lg">
              Dashboard
            </button>
          </Link>

        </div>

        <div className="bg-white rounded-xl shadow p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <input
              name="customer_name"
              placeholder="Customer Name"
              value={formData.customer_name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />

            <input
              name="customer_email"
              type="email"
              placeholder="Customer Email"
              value={formData.customer_email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />

            <input
              name="subject"
              placeholder="Issue Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />

            <textarea
              name="description"
              placeholder="Issue Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 h-40"
              required
            />

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Create Ticket
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default CreateTicket;