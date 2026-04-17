import { useState } from 'react';
import { Search, Plus, List, Grid, Edit, Trash2, Image as ImageIcon, X } from 'lucide-react';
import Drawer from '../components/Drawer';

const mockProducts = Array.from({ length: 24 }).map((_, i) => ({
  id: `PRD-${i + 100}`,
  name: ['Aashirvaad Atta 5kg', 'Amul Taaza Milk 1L', 'Tata Salt 1kg', 'Maggi Noodles 140g', 'Lays Classic 50g'][i % 5],
  category: ['Staples', 'Dairy', 'Staples', 'Snacks', 'Snacks'][i % 5],
  price: ((i % 5) + 1) * 45,
  stock: i % 7 === 0 ? Math.floor(Math.random() * 8) : 50 + Math.floor(Math.random() * 100),
  image: `https://api.dicebear.com/7.x/shapes/svg?seed=P${i}&backgroundColor=f4f6f9`
}));

export default function Products() {
  const [viewMode, setViewMode] = useState('grid');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [imagePreview, setImagePreview] = useState(null);

  const categories = ['All', 'Staples', 'Dairy', 'Snacks', 'Beverages'];
  const filtered = activeTab === 'All' ? mockProducts : mockProducts.filter(p => p.category === activeTab);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Products & Inventory</h1>
        <button 
          onClick={() => { setIsDrawerOpen(true); setImagePreview(null); }}
          className="flex items-center px-4 py-2 bg-[#FC8019] border border-transparent text-white rounded-xl hover:bg-[#E37316] shadow-lg shadow-[#FC8019]/25 transition-all font-semibold text-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </button>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex overflow-x-auto hide-scrollbar space-x-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === cat 
                  ? 'bg-gray-900 text-white shadow-md shadow-gray-900/20' 
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search products..."
              className="w-full sm:w-64 bg-gray-50 border border-gray-200 rounded-xl py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019]"
            />
          </div>
          <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-200">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow relative text-[#FC8019]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow relative text-[#FC8019]' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(product => (
            <div key={product.id} className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden group hover:shadow-lg hover:border-[#FC8019]/30 transition-all">
              <div className="relative aspect-square bg-gray-50">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover p-4 group-hover:scale-105 transition-transform duration-300" />
                {product.stock < 10 && (
                  <span className="absolute top-3 left-3 px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-lg border border-red-200 shadow-sm">
                    Low Stock: {product.stock}
                  </span>
                )}
                <div className="absolute top-3 right-3 space-x-1 opacity-0 group-hover:opacity-100 transition-opacity flex">
                  <button className="p-1.5 bg-white rounded-lg shadow text-gray-600 hover:text-[#FC8019]"><Edit className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 bg-white rounded-lg shadow text-gray-600 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-400 mb-1">{product.category}</p>
                <h3 className="text-sm font-bold text-gray-900 truncate mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#FC8019]">₹{product.price}</span>
                  <span className="text-xs text-gray-500 font-medium">Stock: {product.stock}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Stock</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                        <img src={product.image} className="w-8 h-8" alt="" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                        <p className="text-xs text-gray-400">{product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-600">{product.category}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">₹{product.price}</td>
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${product.stock < 10 ? 'bg-red-100 text-red-700 border border-red-200' : 'text-gray-600'}`}>
                      {product.stock} {product.stock < 10 && ' (Low)'}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-right">
                    <div className="flex space-x-2 justify-end">
                      <button className="p-2 text-gray-400 hover:text-[#FC8019] hover:bg-[#FC8019]/10 rounded-lg transition-colors"><Edit className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Add New Product"
      >
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Image Upload</label>
            <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center overflow-hidden hover:border-[#FC8019]/50 hover:bg-[#FC8019]/5 transition-all text-center">
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                  <button 
                    type="button" 
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full shadow hover:bg-red-200 transition-colors z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <ImageIcon className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500 font-medium">Click or drag image to upload</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, up to 3MB</p>
                </>
              )}
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Product Name</label>
            <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019]" placeholder="e.g. Aashirvaad Atta 5kg" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Category</label>
            <select className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019] appearance-none">
              {categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Price (₹)</label>
              <input type="number" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019]" placeholder="0.00" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Stock Quantity</label>
              <input type="number" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#FC8019]/20 focus:border-[#FC8019]" placeholder="100" />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex gap-3">
            <button type="button" onClick={() => setIsDrawerOpen(false)} className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 px-4 py-2.5 bg-[#FC8019] text-white font-semibold rounded-xl hover:bg-[#E37316] shadow-lg shadow-[#FC8019]/25 transition-all">
              Save Product
            </button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}
