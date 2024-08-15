import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  image_url: string | undefined;
  id: number;
  category_id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category_name: string;
}

interface Category {
  id: number;
  name: string;
  category_id:any;
}

interface MenuItemsInputsProps {
  categories: Category[];
  restaurantId: number;
}

const MenuItemsInputs: React.FC<MenuItemsInputsProps> = ({ categories, restaurantId }) => {

  const navigate = useNavigate();

  const [items, setItems] = useState<MenuItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>("Select Category");
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [numericIdFromCategories, setNumericIdFromCategories] = useState<number>(0);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`http://localhost:3000/items/restaurant/${restaurantId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      const data: MenuItem[] = await response.json();
      // convert decimal number
      const processedData = data.map(item => ({
        ...item,
        price: Number(item.price)
      }));
      setItems(processedData);
    } catch (error) {
      setError('Error fetching items');
    } 
  };

  useEffect(() => {
    fetchCategories();
  }, [restaurantId]);


  const handleAddItem = async () => {
    if (!name || !description || !price || !imageUrl || selectedCategory === 0) {
      setError('Please fill in all fields');
      return;
    }
  
    // Log the values to be sent
    console.log({
      name: name,
      description: description,
      restaurant_id: restaurantId,
      category_name: selectedCategory,
      price: price,
      image_url: imageUrl,
      category_id: 1
    });
  
    try {
      const response = await fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          description: description,
          restaurant_id: restaurantId,
          category_name: selectedCategory,
          price: price,
          image_url: imageUrl,
          category_id: numericIdFromCategories
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create item');
      }
  
      // Clear the form and update categories list
      setName('');
      setDescription('');
      setPrice('');
      setImageUrl('');
      fetchCategories();
    } catch (error) {
      setError('Error adding category');
      console.error('Error adding category:', error);
    }
  };
  

  // Function to handle logs and categories values
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    const lettersOnly = selectedValue.replace(/[0-9-]/g, '').trim();
    const numericValue = parseInt(selectedValue, 10);
    console.log('Selected Value:', selectedValue); 
    console.log('Converted Category ID:', numericValue); 
    console.log('Converted letter only:', lettersOnly);
    setNumericIdFromCategories(numericValue)
    setSelectedCategory(lettersOnly); 
  };

  //handle delete function not working

  // const handleDeleteItem = async (itemId: number) => {
  //   const confirmed = window.confirm('Are you sure you want to delete this item?');
  //   if (!confirmed) return; // Exit if not confirmed
  
  //   try {
  //     const response = await fetch(`http://localhost:3000/items/${itemId}`, {
  //       method: 'DELETE',
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to delete item');
  //     }
  //     // Filter out the deleted item from the state
  //     setItems((prevItems) => prevItems.filter(item => item.id !== itemId));
  //   } catch (error) {
  //     setError('Error deleting item');
  //     console.error('Error deleting item:', error);
  //   }
  // };

  const handleGenerateMenu = () => {
    navigate('/client-menu', {
      state: {
        restaurantId: restaurantId,
        categories: categories,
      },
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Menu Items</h2>

      <div className="mb-6">
        <select
          name="category"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          onChange={handleCategoryChange} 
          value={selectedCategory} 
        >
          <option value={"Select Category"}>{selectedCategory}</option>
          {categories.map((category, index) => (
            <option key={index} value={category.id}>
              {category.category_id} - {category.name}
            </option>
          ))}
        </select>
        <input
          name="name"
          type="text"
          placeholder="Enter item name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mt-2"
          value={name} // Bind value to state
          onChange={(e) => setName(e.target.value)} 
        />
        <textarea
          name="description"
          placeholder="Enter item description"
          rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mt-2"
          value={description} // Bind value to state
          onChange={(e) => setDescription(e.target.value)} 
        />
        <input
          name="price"
          type="number"
          placeholder="Enter item price"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mt-2"
          value={price} // Bind value to state
          onChange={(e) => setPrice(e.target.value)} 
        />
        <input
          name="imageUrl"
          type="text"
          placeholder="Enter image URL"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm mt-2"
          value={imageUrl} // Bind value to state
          onChange={(e) => setImageUrl(e.target.value)} 
        />
      </div>

      <button
        type="button"
        className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700"
        onClick={() => handleAddItem()}
      >
        Create Items
      </button>

      {/* Menu Items Table */}
      <table className="w-full mb-6 border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border-b border-gray-300 p-4 text-left">Category</th>
            <th className="border-b border-gray-300 p-4 text-left">Name</th>
            <th className="border-b border-gray-300 p-4 text-left">Description</th>
            <th className="border-b border-gray-300 p-4 text-left">Price</th>
            <th className="border-b border-gray-300 p-4 text-left">Image</th>
            <th className="border-b border-gray-300 p-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className="p-4">{item.category_name}</td>
              <td className="p-4">{item.name}</td>
              <td className="p-4">{item.description}</td>
              <td className="p-4">{item.price + "¥"}</td>
              <td className="p-4">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-24 h-24 object-cover"
                />
              </td>
              <td className="p-4">
                <button
                  type="button"
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-red-700"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
      <button
          className="bg-green-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-700"
          onClick={handleGenerateMenu}
        >
          Generate Menu
        </button>
      </div>
    </div>
  );
};

export default MenuItemsInputs;
