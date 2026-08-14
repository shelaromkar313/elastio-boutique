import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import ProductForm from './admin/ProductForm';
import EstiloLogo from '../components/EstiloLogo';
import {
  FiLogOut, FiGrid, FiShoppingBag, FiPlus, FiEdit2, FiTrash2, FiSearch,
  FiPackage, FiLayers, FiCheckCircle, FiXCircle, FiStar, FiImage, FiArrowLeft
} from 'react-icons/fi';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: FiGrid },
  { key: 'products', label: 'Products', icon: FiPackage },
];

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [view, setView] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [toast, setToast] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        api.get('/admin/products'),
        api.get('/categories'),
      ]);
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      setLoadError(error.response?.data?.message || 'Failed to load catalog. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const openAdd = () => {
    setEditing(null);
    setView('form');
  };

  const openEdit = (product) => {
    setEditing(product);
    setView('form');
  };

  const handleSaved = (saved) => {
    showToast(editing ? `"${saved.name}" updated successfully.` : `"${saved.name}" created successfully.`);
    setView('products');
    setEditing(null);
    loadData();
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/admin/products/${deleteTarget.id}`);
      showToast(`"${deleteTarget.name}" deleted.`);
      setDeleteTarget(null);
      loadData();
    } catch (error) {
      showToast('Failed to delete product.');
      setDeleteTarget(null);
    }
  };

  const stats = {
    total: products.length,
    inStock: products.filter((p) => p.in_stock ?? p.inStock).length,
    outOfStock: products.filter((p) => !(p.in_stock ?? p.inStock)).length,
    featured: products.filter((p) => p.is_featured ?? p.isFeatured).length,
    avgRating: products.length
      ? (products.reduce((sum, p) => sum + Number(p.rating ?? 0), 0) / products.length).toFixed(1)
      : '0.0',
  };

  return (
    <div className="min-h-screen bg-offwhite">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-ebony text-white px-5 py-3 rounded-full shadow-floating border border-rose-antique/30 text-sm font-sans">
          {toast}
        </div>
      )}

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-ebony text-white flex-none">
          <div className="p-6 border-b border-white/10">
            <EstiloLogo size="md" variant="light" />
            <p className="text-[10px] font-sans tracking-[0.25em] text-blush uppercase mt-2">Admin Portal</p>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setView(key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans font-semibold transition-all ${
                  view === key ? 'bg-white/10 text-blush' : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
            {view === 'form' && (
              <button
                onClick={openAdd}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans font-semibold text-white/70 hover:text-white hover:bg-white/5 transition-all"
              >
                <FiPlus className="w-4 h-4" />
                Add Product
              </button>
            )}
          </nav>
          <div className="p-4 border-t border-white/10 space-y-3">
            <div className="flex items-center gap-3 px-2">
              <div className="w-9 h-9 rounded-full bg-blush text-ebony flex items-center justify-center font-serif font-bold">
                {user?.name?.[0] || 'A'}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-sans font-semibold truncate">{user?.name}</p>
                <p className="text-[10px] font-sans uppercase tracking-widest text-blush">Administrator</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-sans font-semibold text-white/80 hover:text-white bg-white/5 hover:bg-rose-deep transition-all"
            >
              <FiLogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 lg:p-10">
          {/* Mobile top bar */}
          <div className="md:hidden flex items-center justify-between mb-6">
            <EstiloLogo size="sm" variant="dark" />
            <button onClick={handleLogout} className="p-2 text-rose-deep">
              <FiLogOut className="w-5 h-5" />
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-ebony/50 font-sans text-sm">Loading catalog...</div>
            </div>
          ) : loadError ? (
            <div className="text-center py-20">
              <p className="text-red-600 text-sm mb-4">{loadError}</p>
              <button onClick={loadData} className="px-6 py-3 rounded-full bg-ebony text-white text-xs font-bold uppercase tracking-widest hover:bg-rose-deep transition-colors">
                Retry
              </button>
            </div>
          ) : view === 'dashboard' ? (
            <DashboardView user={user} stats={stats} products={products} categories={categories} onAdd={openAdd} onEdit={openEdit} />
          ) : view === 'products' ? (
            <ProductsView
              products={products}
              onAdd={openAdd}
              onEdit={openEdit}
              onDelete={setDeleteTarget}
            />
          ) : (
            <FormView editing={editing} categories={categories} onSaved={handleSaved} onCancel={() => { setView('products'); setEditing(null); }} />
          )}
        </main>
      </div>

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ebony/60 backdrop-blur-sm" onClick={() => setDeleteTarget(null)} />
          <div className="relative bg-white rounded-2xl shadow-floating p-8 max-w-sm w-full text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center text-red-500">
              <FiTrash2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-ebony mb-2">Delete Product?</h3>
            <p className="text-sm font-sans text-ebony/60 mb-6">
              "{deleteTarget.name}" and its uploaded images will be permanently removed.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-2.5 rounded-full border border-bisque text-sm font-sans font-semibold text-ebony hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2.5 rounded-full bg-red-500 text-white text-sm font-sans font-semibold hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DashboardView = ({ user, stats, products, categories, onAdd, onEdit }) => {
  const cards = [
    { label: 'Total Products', value: stats.total, icon: FiPackage, tint: 'bg-blush/20 text-rose-deep' },
    { label: 'In Stock', value: stats.inStock, icon: FiCheckCircle, tint: 'bg-thyme-light/30 text-thyme' },
    { label: 'Out of Stock', value: stats.outOfStock, icon: FiXCircle, tint: 'bg-red-50 text-red-500' },
    { label: 'Featured', value: stats.featured, icon: FiStar, tint: 'bg-champagne text-rose-antique' },
    { label: 'Categories', value: categories.length, icon: FiLayers, tint: 'bg-bisque/30 text-ebony' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ebony">Welcome back, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-sm font-sans text-ebony/60 mt-1">Manage your boutique catalog, upload photos, and keep your storefront fresh.</p>
        </div>
        <button onClick={onAdd} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ebony text-white text-xs font-bold uppercase tracking-widest hover:bg-rose-deep transition-colors">
          <FiPlus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map(({ label, value, icon: Icon, tint }) => (
          <div key={label} className="bg-white rounded-2xl border border-bisque/50 p-5 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${tint} flex items-center justify-center mb-3`}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-serif font-bold text-ebony">{value}</p>
            <p className="text-[11px] font-sans font-semibold uppercase tracking-wider text-ebony/50">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-bisque/50 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-bisque/50">
          <h2 className="font-serif text-lg font-bold text-ebony">Recent Products</h2>
          <button onClick={onAdd} className="text-xs font-sans font-bold uppercase tracking-widest text-rose-antique hover:text-rose-deep transition-colors">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-sans font-bold uppercase tracking-widest text-ebony/40 border-b border-bisque/30">
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(-5).reverse().map((p) => (
                <tr key={p.id} className="border-b border-bisque/20 last:border-0 hover:bg-champagne-light/40 transition-colors">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.images?.[0] || '/placeholder.png'} alt="" className="w-10 h-12 rounded-lg object-cover border border-bisque/50" />
                      <span className="text-sm font-sans font-semibold text-ebony max-w-[220px] truncate">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm font-sans font-bold text-ebony">₹{p.price}</td>
                  <td className="px-6 py-3 text-xs font-sans text-ebony/60">{p.category}</td>
                  <td className="px-6 py-3">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-sans font-semibold ${(p.in_stock ?? p.inStock) ? 'text-thyme' : 'text-red-500'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${(p.in_stock ?? p.inStock) ? 'bg-thyme' : 'bg-red-500'}`} />
                      {(p.in_stock ?? p.inStock) ? 'In Stock' : 'Out'}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button onClick={() => onEdit(p)} className="p-2 text-ebony/50 hover:text-rose-deep transition-colors" aria-label="Edit">
                      <FiEdit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ProductsView = ({ products, onAdd, onEdit, onDelete }) => {
  const [search, setSearch] = useState('');
  const filtered = products.filter((p) =>
    `${p.name} ${p.category} ${p.est_id} ${p.sku}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ebony">Products</h1>
          <p className="text-sm font-sans text-ebony/60 mt-1">{products.length} items in your catalog</p>
        </div>
        <button onClick={onAdd} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ebony text-white text-xs font-bold uppercase tracking-widest hover:bg-rose-deep transition-colors">
          <FiPlus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="relative max-w-md">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ebony/40" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-11 pr-4 py-3 rounded-full border border-bisque/70 bg-white text-sm text-ebony placeholder-ebony/30 focus:outline-none focus:ring-2 focus:ring-rose-antique/40 transition-all"
        />
      </div>

      <div className="bg-white rounded-2xl border border-bisque/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-sans font-bold uppercase tracking-widest text-ebony/40 border-b border-bisque/30">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-sm font-sans text-ebony/50">
                    No products found.
                  </td>
                </tr>
              )}
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-bisque/20 last:border-0 hover:bg-champagne-light/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 min-w-[260px]">
                      <img src={p.images?.[0] || '/placeholder.png'} alt="" className="w-12 h-14 rounded-lg object-cover border border-bisque/50 bg-champagne-light/40" />
                      <span className="text-sm font-sans font-semibold text-ebony max-w-[220px] truncate">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-sans font-mono text-ebony/60">{p.est_id}</td>
                  <td className="px-6 py-4 text-sm font-sans font-bold text-ebony">₹{p.price}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-xs font-sans font-semibold text-ebony/70">
                      <FiStar className="w-3.5 h-3.5 text-rose-antique" /> {p.rating}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-sans text-ebony/60">{p.category}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-sans font-semibold ${(p.in_stock ?? p.inStock) ? 'text-thyme' : 'text-red-500'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${(p.in_stock ?? p.inStock) ? 'bg-thyme' : 'bg-red-500'}`} />
                      {(p.in_stock ?? p.inStock) ? 'In Stock' : 'Out'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => onEdit(p)} className="p-2 text-ebony/50 hover:text-rose-deep hover:bg-rose-deep/5 rounded-lg transition-all" aria-label="Edit" title="Edit">
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDelete(p)} className="p-2 text-ebony/50 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" aria-label="Delete" title="Delete">
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const FormView = ({ editing, categories, onSaved, onCancel }) => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onCancel} className="p-2.5 rounded-full border border-bisque bg-white text-ebony hover:bg-white transition-colors" aria-label="Back">
            <FiArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-serif text-3xl font-bold text-ebony">{editing ? 'Edit Product' : 'Add New Product'}</h1>
            <p className="text-sm font-sans text-ebony/60 mt-1">
              {editing ? `Updating "${editing.name}"` : 'Fill in the details below to publish a new item.'}
            </p>
          </div>
        </div>
      </div>
      <ProductForm product={editing} categories={categories} onSaved={onSaved} onCancel={onCancel} />
    </div>
  );
};

export default AdminDashboard;