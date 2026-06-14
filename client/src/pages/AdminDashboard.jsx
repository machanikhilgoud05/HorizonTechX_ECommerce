import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function AdminDashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState('products');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '', description: '', price: '', image: '', category: '', countInStock: '',
  });
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, ordRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/orders/all', {
          headers: { Authorization: `Bearer ${user.token}` },
        }),
      ]);
      const prodData = await prodRes.json();
      const ordData = await ordRes.json();
      if (Array.isArray(prodData)) setProducts(prodData);
      if (Array.isArray(ordData)) setOrders(ordData);
    } catch {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const url = editing ? `/api/products/${editing}` : '/api/products';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          countInStock: Number(form.countInStock),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Save failed');
      setForm({ name: '', description: '', price: '', image: '', category: '', countInStock: '' });
      setEditing(null);
      setShowForm(false);
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
      countInStock: product.countInStock.toString(),
    });
    setEditing(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (res.ok) fetchData();
    } catch {
      setError('Delete failed');
    }
  };

  const handleDeliver = async (orderId) => {
    try {
      await fetch(`/api/orders/${orderId}/deliver`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchData();
    } catch {
      setError('Failed to update order');
    }
  };

  const handleStatus = async (orderId, status) => {
    try {
      await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ status }),
      });
      fetchData();
    } catch {
      setError('Failed to update status');
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      {error && <div className="alert alert-error">{error}</div>}

      <div className="admin-stats">
        <div className="stat-card"><h3>{products.length}</h3><p>Products</p></div>
        <div className="stat-card"><h3>{orders.length}</h3><p>Orders</p></div>
        <div className="stat-card"><h3>{orders.filter(o => o.status === 'Processing').length}</h3><p>Pending</p></div>
        <div className="stat-card"><h3>${orders.reduce((a, o) => a + o.totalPrice, 0).toFixed(2)}</h3><p>Revenue</p></div>
      </div>

      <div className="admin-tabs">
        <button className={tab === 'products' ? 'active' : ''} onClick={() => setTab('products')}>Products</button>
        <button className={tab === 'orders' ? 'active' : ''} onClick={() => setTab('orders')}>Orders</button>
      </div>

      {tab === 'products' && (
        <div className="admin-products">
          <div className="admin-toolbar">
            <h2>Manage Products</h2>
            <button className="btn btn-primary" onClick={() => { setShowForm(!showForm); setEditing(null); setForm({ name: '', description: '', price: '', image: '', category: '', countInStock: '' }); }}>
              {showForm ? 'Cancel' : '+ Add Product'}
            </button>
          </div>

          {showForm && (
            <form className="product-form" onSubmit={handleSubmit}>
              <h3>{editing ? 'Edit Product' : 'New Product'}</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Name</label>
                  <input name="name" value={form.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input name="category" value={form.category} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={form.description} onChange={handleInputChange} required rows="3" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price ($)</label>
                  <input name="price" type="number" step="0.01" min="0" value={form.price} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Stock</label>
                  <input name="countInStock" type="number" min="0" value={form.countInStock} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input name="image" value={form.image} onChange={handleInputChange} required placeholder="https://..." />
              </div>
              <button type="submit" className="btn btn-primary">
                {editing ? 'Update Product' : 'Create Product'}
              </button>
            </form>
          )}

          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td><img src={p.image} alt={p.name} className="table-img" /></td>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>${p.price.toFixed(2)}</td>
                    <td>{p.countInStock}</td>
                    <td className="actions">
                      <button className="btn-sm btn-edit" onClick={() => handleEdit(p)}>Edit</button>
                      <button className="btn-sm btn-delete" onClick={() => handleDelete(p._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div className="admin-orders">
          <h2>Manage Orders</h2>
          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Delivered</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o._id}>
                    <td>#{o._id.slice(-8).toUpperCase()}</td>
                    <td>{o.user?.name || 'N/A'}</td>
                    <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td>${o.totalPrice.toFixed(2)}</td>
                    <td>
                      <select value={o.status} onChange={(e) => handleStatus(o._id, e.target.value)}>
                        {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td>{o.isDelivered ? 'Yes' : 'No'}</td>
                    <td>
                      {!o.isDelivered && (
                        <button className="btn-sm btn-edit" onClick={() => handleDeliver(o._id)}>Mark Delivered</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
