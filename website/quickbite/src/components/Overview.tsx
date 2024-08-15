import React from "react";

  interface OverviewProps {
    state: {
      userId: string;
      token: string;
      name: string;
      email: string;
      phone_number: number;
      quantityOfOrders: number;
      ordersCompletedToday: number;
      recentOrders: any[];
    };
  }


const Overview: React.FC<OverviewProps> = ({ state }) => {
    const { userId, name, email, phone_number, quantityOfOrders, ordersCompletedToday, recentOrders } = state;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Overview</h1>
      
      <section className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Welcome to your Dashboard</h2>
        <div className="text-gray-600">
          <p><span className="font-semibold">User ID:</span> {userId}</p>
          <p><span className="font-semibold">Name:</span> {name}</p>
          <p><span className="font-semibold">Email:</span> {email}</p>
          <p><span className="font-semibold">Phone Number:</span> {phone_number}</p>
        </div>
      </section>

      <section className="flex space-x-4 mb-6">
        <div className="bg-white shadow-md rounded-lg flex-1 p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-700">0 Yen</h3>
        </div>
        <div className="bg-white shadow-md rounded-lg flex-1 p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-700">Quantity of Orders</h3>
          <p className="text-2xl font-bold text-gray-800">{quantityOfOrders}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg flex-1 p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-700">Orders Completed Today</h3>
          <p className="text-2xl font-bold text-gray-800">{ordersCompletedToday}</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent Orders</h2>
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 text-left text-gray-600">Order Number</th>
              <th className="p-4 text-left text-gray-600">Date</th>
              <th className="p-4 text-left text-gray-600">Time</th>
              <th className="p-4 text-left text-gray-600">Description</th>
              <th className="p-4 text-left text-gray-600">Amount</th>
              <th className="p-4 text-left text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order, index) => (
              <tr key={index} className="border-b">
                <td className="p-4 text-gray-700">{order.orderNumber}</td>
                <td className="p-4 text-gray-700">{order.date}</td>
                <td className="p-4 text-gray-700">{order.time}</td>
                <td className="p-4 text-gray-700">{order.description}</td>
                <td className="p-4 text-gray-700">{order.amount} Yen</td>
                <td className="p-4 text-gray-700">{order.status === 'accepted' ? 'Accepted' : 'Declined'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Overview;
