import React, { useEffect, useState, FormEvent } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import MenuItemsInputs from './MenuItensInput';

interface InputsForMenuProps {
  restaurantId: number;
}

interface Category {
  id: number;
  name: string;
  description: string;
  category_id: number;
}

const InputsForMenu: React.FC<InputsForMenuProps> = ({ restaurantId }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState<string>('');
  const [newCategoryDescription, setNewCategoryDescription] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`http://localhost:3000/categories/restaurant/${restaurantId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data: Category[] = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [restaurantId]);

  const handleAddCategory = async (e: FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim() || !newCategoryDescription.trim()) {
      setFormError('Both name and description are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newCategoryName,
          description: newCategoryDescription,
          restaurant_id: restaurantId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add category');
      }

      // Clear the form and update categories list
      setNewCategoryName('');
      setNewCategoryDescription('');
      setFormError(null);
      setSuccess(true);
      fetchCategories();
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setFormError('Error adding category');
      console.error('Error adding category:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Restaurant ID: {restaurantId}</h2>
      {error && <p className="text-red-500">{error}</p>}
      {formError && <p className="text-red-500">{formError}</p>}
      {success && (
        <p className="text-green-500 flex items-center">
          <FaCheckCircle className="mr-2" /> Category added successfully!
        </p>
      )}
      <table className="w-full mb-6 border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border-b border-gray-300 p-4 text-left">Category Name</th>
            <th className="border-b border-gray-300 p-4 text-left">Description</th>
            <th className="border-b border-gray-300 p-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-4">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </td>
            <td className="p-4">
              <textarea
                value={newCategoryDescription}
                onChange={(e) => setNewCategoryDescription(e.target.value)}
                placeholder="Enter category description"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </td>
            <td className="p-4">
              <button
                type="submit"
                onClick={handleAddCategory}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700"
              >
                Add Category
              </button>
            </td>
          </tr>
        </tbody>
      </table>

    
      {!loading && categories.length > 0 ? (
         <MenuItemsInputs categories={categories} restaurantId={restaurantId} />
      ) : (
        <p className="text-gray-500">No categories available. Add one to start!</p>
      )}
      <ul>
        {categories.map((category,index) => (
          <li key={index} className="border-b py-2">
           {category.category_id} - {category.name} - {category.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InputsForMenu;
