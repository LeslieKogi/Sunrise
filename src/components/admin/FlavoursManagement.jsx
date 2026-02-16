import { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  Loader
} from 'lucide-react';
import { api } from '../../services/api';

function FlavoursManagement() {
  const [flavours, setFlavours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Form state for editing/adding
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    is_available: true
  });

  useEffect(() => {
    fetchFlavours();
  }, []);

  const fetchFlavours = async () => {
    try {
      setLoading(true);
      const data = await api.getAllFlavours();
      setFlavours(data);
    } catch (error) {
      console.error('Error fetching flavours:', error);
      alert('Failed to load flavours');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const startEdit = (flavour) => {
    setEditingId(flavour.id);
    setFormData({
      name: flavour.name,
      description: flavour.description || '',
      price: flavour.price,
      is_available: flavour.is_available
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      is_available: true
    });
  };

  const saveEdit = async (flavourId) => {
    try {
      await api.updateFlavour(flavourId, {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        is_available: formData.is_available
      });
      alert('Flavour updated successfully!');
      setEditingId(null);
      fetchFlavours();
    } catch (error) {
      console.error('Error updating flavour:', error);
      alert('Failed to update flavour');
    }
  };

  const addNewFlavour = async () => {
    try {
      if (!formData.name || !formData.price) {
        alert('Please fill in name and price');
        return;
      }

      await api.createFlavour({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        is_available: formData.is_available
      });

      alert('Flavour added successfully!');
      setShowAddForm(false);
      setFormData({
        name: '',
        description: '',
        price: '',
        is_available: true
      });
      fetchFlavours();
    } catch (error) {
      console.error('Error adding flavour:', error);
      alert(error.message || 'Failed to add flavour');
    }
  };

  const deleteFlavour = async (flavourId, flavourName) => {
    if (!window.confirm(`Are you sure you want to delete "${flavourName}"?`)) {
      return;
    }

    try {
      await api.deleteFlavour(flavourId);
      alert('Flavour deleted successfully!');
      fetchFlavours();
    } catch (error) {
      console.error('Error deleting flavour:', error);
      alert('Failed to delete flavour');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader className="w-8 h-8 text-pink-500 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Add New Flavour Button */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Flavour
        </button>
      </div>

      {/* Add New Flavour Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Flavour</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Flavour Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                placeholder="e.g., Strawberry"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (KES) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                placeholder="150"
                step="0.01"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                placeholder="Delicious strawberry yogurt..."
                rows="3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_available"
                  checked={formData.is_available}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-pink-500 rounded focus:ring-pink-500"
                />
                <span className="text-sm font-semibold text-gray-700">Available for purchase</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={addNewFlavour}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Flavour
            </button>
            <button
              onClick={() => {
                setShowAddForm(false);
                setFormData({ name: '', description: '', price: '', is_available: true });
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Flavours Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Description</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Available</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {flavours.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No flavours found. Add your first one!
                  </td>
                </tr>
              ) : (
                flavours.map((flavour) => (
                  <tr key={flavour.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{flavour.id}</td>
                    
                    {/* Name - Editable */}
                    <td className="px-6 py-4">
                      {editingId === flavour.id ? (
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      ) : (
                        <span className="font-semibold">{flavour.name}</span>
                      )}
                    </td>

                    {/* Description - Editable */}
                    <td className="px-6 py-4">
                      {editingId === flavour.id ? (
                        <input
                          type="text"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      ) : (
                        <span className="text-sm text-gray-600">{flavour.description || '-'}</span>
                      )}
                    </td>

                    {/* Price - Editable */}
                    <td className="px-6 py-4">
                      {editingId === flavour.id ? (
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="w-24 px-2 py-1 border border-gray-300 rounded"
                          step="0.01"
                        />
                      ) : (
                        <span className="font-semibold">KES {flavour.price}</span>
                      )}
                    </td>

                    {/* Availability - Editable */}
                    <td className="px-6 py-4">
                      {editingId === flavour.id ? (
                        <input
                          type="checkbox"
                          name="is_available"
                          checked={formData.is_available}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-pink-500 rounded"
                        />
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          flavour.is_available 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {flavour.is_available ? 'Available' : 'Unavailable'}
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      {editingId === flavour.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveEdit(flavour.id)}
                            className="text-green-600 hover:text-green-800"
                            title="Save"
                          >
                            <Save className="w-5 h-5" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="text-gray-600 hover:text-gray-800"
                            title="Cancel"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(flavour)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => deleteFlavour(flavour.id, flavour.name)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FlavoursManagement;