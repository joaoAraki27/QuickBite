import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaComment } from 'react-icons/fa';
import QRCode from 'qrcode.react'; 
import FlexModal from './FlexModal';

interface MenuItem {
  image_url: string | undefined;
  id: number;
  category_id: number;
  name: string;
  description: string;
  price: number;
}

interface Category {
  id: number;
  name: string;
  category_id: any;
}

interface Restaurant {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  logo_url?: string; // Added optional logo_url
}

const ClientMenu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [itemsByCategory, setItemsByCategory] = useState<{ [key: number]: MenuItem[] }>({});
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showQRCode, setShowQRCode] = useState<boolean>(false);

  const { restaurantId, categories } = location.state as { restaurantId: number; categories: Category[] };

  const fetchItemsByCategory = async (categoryId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/items/category/${categoryId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      const data: MenuItem[] = await response.json();
      const processedData = data.map(item => ({
        ...item,
        price: Number(item.price)
      }));
      setItemsByCategory(prevState => ({
        ...prevState,
        [categoryId]: processedData
      }));
    } catch (error) {
      setError('Error fetching items');
    }
  };

  const fetchRestaurant = async () => {
    try {
      const response = await fetch(`http://localhost:3000/restaurants/${restaurantId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch restaurant details');
      }
      const data: Restaurant = await response.json();
      setRestaurant(data);
    } catch (error) {
      setError('Error fetching restaurant details');
    }
  };

  useEffect(() => {
    categories.forEach(category => fetchItemsByCategory(category.category_id));
    fetchRestaurant();
  }, [categories, restaurantId]);

  const handleGenerateMenu = () => {
    navigate('/client-menu', {
      state: {
        restaurantId: restaurantId,
        categories: categories,
      },
    });
  };

  const handleLogoClick = () => {
    setModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setModalOpen(false);
    setError('');
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center p-6">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl w-full border border-[#A4161A]">
        {/* Sakura Sushi Logo */}
        <div className="text-center mb-6">
          {restaurant?.logo_url && (
            <>
              <p className="text-lg mb-2 text-[#A4161A]">Click the logo to show the QR code</p>
              <img
                src={restaurant.logo_url}
                alt="Restaurant Logo"
                className="w-64 mx-auto cursor-pointer"
                onClick={handleLogoClick} // Add the click handler here
              />
            </>
          )}
        </div>
  
        {/* Restaurant Details */}
        {restaurant && (
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-4 text-[#A4161A]">{restaurant.name}</h2>
            <p className="text-[#A4161A] flex items-center mb-2">
              <FaMapMarkerAlt className="mr-2 text-[#A4161A]" />
              Address: {restaurant.address}
            </p>
            <p className="text-[#A4161A] flex items-center mb-4">
              <FaPhone className="mr-2 text-[#A4161A]" />
              Phone: {restaurant.phone}
            </p>
  
            {/* Contact Buttons */}
            <div className="flex justify-center space-x-4 mb-6">
              <a
                href={`tel:${restaurant.phone}`}
                className="bg-[#A4161A] text-white py-3 px-6 rounded-md shadow-md hover:bg-[#A4161A] flex items-center space-x-2 text-lg"
              >
                <FaPhone className="text-white text-xl" />
                <span>Call</span>
              </a>
              <a
                href={`https://line.me/en/?text=${encodeURIComponent("Hello, I'd like to inquire about your restaurant.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-green-700 flex items-center space-x-2 text-lg"
              >
                <FaComment className="text-white text-xl" />
                <span>Line</span>
              </a>
            </div>
        
          </div>
        )}
  
        {/* Categories and Items */}
        <div className="mb-6">
          {categories.map(category => (
            <div key={category.category_id} className="mb-6">
              <h3 className="text-2xl font-bold text-[#A4161A] mb-4">{category.name}</h3>
              <table className="w-full border-collapse mb-6">
                <thead>
                  <tr>
                    <th className="border-t border-[#A4161A] p-4 text-left text-[#A4161A]">Name</th>
                    <th className="border-t border-[#A4161A] p-4 text-left text-[#A4161A]">Description</th>
                    <th className="border-t border-[#A4161A] p-4 text-left text-[#A4161A]">Price</th>
                    <th className="border-t border-[#A4161A] p-4 text-left text-[#A4161A]"></th>
                  </tr>
                </thead>
                <tbody>
                  {(itemsByCategory[category.category_id] || []).map(item => (
                    <tr key={item.id}>
                      <td className="p-4 border-t border-[#A4161A] text-[#A4161A]">{item.name}</td>
                      <td className="p-4 border-t border-[#A4161A] text-[#A4161A]">{item.description}</td>
                      <td className="p-4 border-t border-[#A4161A] text-[#A4161A]">{item.price}¥</td>
                      <td className="p-4 border-t border-[#A4161A] text-center">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-32 h-32 object-cover mx-auto" // Adjust size and center image
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
  
        {/* QR Code Section */}
        {modalOpen && (
          <FlexModal closeModal={closeModal} title="QR Code">
            <QRCode value={"http://localhost:5173/client-menu"} size={256} />
          </FlexModal>
        )}
  
        <div className="flex justify-center mt-4">
        </div>
      </div>
    </div>
  );
}

export default ClientMenu;