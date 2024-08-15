import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import Overview from "./Overview";
import CreateMenu from "./CreateMenu";


interface DashboardLocationState {
  userId: string;
  token: string;
  name: string;
  email: string;
  phone_number: number;
  status: 'accepted' | 'declined';
}

const exampleRecentOrder = {
  recentOrders: [
    {
      orderNumber: '001',
      date: '2024-08-15',
      time: '14:00',
      description: 'Pizza Margherita',
      amount: 2000,
      status: 'accepted'
    },
  ]
};

const Dashboard: React.FC = () => {
  const location = useLocation();
  const state = location.state as DashboardLocationState;

  if (!state) {
    return <div>Error: No state available</div>;
  }

  const { userId, token, name, email, phone_number } = state;

  // UseState
  const [viewName, setViewName] = useState<"overview" | "createMenu">("overview");

  const handleViewChange = (viewName: "overview" | "createMenu") => {
    setViewName(viewName);
  };

 
  const overviewState = {
    userId,
    token,
    name,
    email,
    phone_number,
    quantityOfOrders: 0, 
    ordersCompletedToday: 0, 
    recentOrders: exampleRecentOrder.recentOrders,
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5">
        <h2 className="text-2xl font-bold mb-5">Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <button 
                onClick={() => handleViewChange("overview")} 
                className="text-lg hover:text-gray-300"
              >
                Overview
              </button>
            </li>
            <li className="mb-4">
              <button 
                onClick={() => handleViewChange("createMenu")} 
                className="text-lg hover:text-gray-300"
              >
                Create Menu
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Content Area */}
      <div className="flex-1 p-5">
        {viewName === "overview" && <Overview state={overviewState} />}
        {viewName === "createMenu" && <CreateMenu state={state} />}
      </div>
    </div>
  );
};

export default Dashboard;
