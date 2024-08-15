import React, { useState, useEffect } from 'react';
import FlexModal from './FlexModal';
import InputsForMenu from './InputsForMenu';

interface Restaurant {
  restaurant_id: number;
  name: string;
  logo_url?: string;
  phone_number?: string;
  line_id?: string;
  address?: string;
  owner_id?: number;
}

interface CreateMenuProps {
  state: any;
}

const CreateMenu: React.FC<CreateMenuProps> = ({ state }) => {
  const [restaurantName, setRestaurantName] = useState<string>('');
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [lineId, setLineId] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [error, setError] = useState<string>('');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<number | null>(null);

  const { userId } = state;

  // Function to fetch restaurants
  const fetchRestaurants = async () => {
    try {
      const response = await fetch(`http://localhost:3000/restaurants/owner/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch restaurants');
      }
      const data: Restaurant[] = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };
  
  useEffect(() => {
    fetchRestaurants();
  }, [userId]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setRestaurantName('');
    setLogoUrl('');
    setPhoneNumber('');
    setLineId('');
    setAddress('');
    setError('');
  };

  const handleRegisterRestaurant = async () => {
    if (!restaurantName || !logoUrl || !phoneNumber || !lineId || !address) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: restaurantName, 
          logo_url: logoUrl,
          phone_number: phoneNumber, 
          line_id: lineId, 
          address: address, 
          owner_id: userId 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to register restaurant: ${errorData.message || 'Unknown error'}`);
      }

      await fetchRestaurants();
      closeModal();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const handleRestaurantClick = (restaurantId: number) => {
    console.log('Selected Restaurant ID:', restaurantId); 
    setSelectedRestaurantId(restaurantId);
  };

  return (
    <div className='relative p-6'>
      <h2 className='text-2xl font-bold mb-4'>Create a Menu for Your Restaurant</h2>
      <p className='mb-6'>
        Select an existing restaurant from the list below to create a menu for it, or click "Register Restaurant"
        to add a new one.
      </p>
      <div className='my-4'>
        <h3 className='text-lg font-semibold'>Your Restaurants:</h3>
        <ul className='list-disc pl-5'>
          {restaurants.map((restaurant, index) => (
            <li
              key={index}
              className={`py-2 cursor-pointer hover:text-blue-600 ${selectedRestaurantId === restaurant.restaurant_id ? 'bg-blue-100' : ''}`}
              onClick={() => handleRestaurantClick(restaurant.restaurant_id)}
            >
              {restaurant.name}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={openModal}
        className='w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded'
      >
        Register Restaurant
      </button>

      {modalOpen && (
        <FlexModal closeModal={closeModal} title="Register Restaurant">
          <div className='space-y-4'>
            <input
              type='text'
              placeholder='Restaurant Name'
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              className='w-full px-4 py-2 border rounded'
            />
            <input
              type='text'
              placeholder='Logo URL'
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              className='w-full px-4 py-2 border rounded'
            />
            <input
              type='text'
              placeholder='Phone Number'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className='w-full px-4 py-2 border rounded'
            />
            <input
              type='text'
              placeholder='Line ID'
              value={lineId}
              onChange={(e) => setLineId(e.target.value)}
              className='w-full px-4 py-2 border rounded'
            />
            <input
              type='text'
              placeholder='Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className='w-full px-4 py-2 border rounded'
            />
            {error && <p className='text-red-600'>{error}</p>}
            <button
              onClick={handleRegisterRestaurant}
              className='w-full px-4 py-2 bg-green-600 text-white rounded'
            >
              Register
            </button>
          </div>
        </FlexModal>
      )}

      {selectedRestaurantId && (
        <InputsForMenu restaurantId={selectedRestaurantId} />
      )}
    </div>
  );
};

export default CreateMenu;
