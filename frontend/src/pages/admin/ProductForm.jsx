import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { FiPlus, FiX, FiTrash2, FiUpload, FiImage } from 'react-icons/fi';

const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];

const inputClass =
  'w-full mt-1 px-3.5 py-2.5 rounded-lg border border-bisque/70 bg-white text-sm text-ebony placeholder-ebony/30 focus:outline-none focus:ring-2 focus:ring-rose-antique/40 focus:border-rose-antique transition-all';
const labelClass = 'block text-xs font-sans font-semibold uppercase tracking-wider text-ebony/70 mb-1';
const sectionTitleClass = 'text-xs font-sans font-bold uppercase tracking-[0.2em] text-rose-antique pb-2 mb-4 border-b border-bisque/50';

const ProductForm = ({ product, categories, onSaved, onCancel }) => {
  const [form, setForm] = useState({
    est_id: '',
    name: '',
    category: '',
    main_category: '',
    sub_category: '',
    fabric: '',
    occasion: '',
    price: '',
    old_price: '',
    discount: '',
    rating: '',
    review_count: '',
    sku: '',
    description: '',
    care: '',
    is_new_arrival: false,
    is_best_seller: false,
    is_trending: false,
    is_featured: false,
    in_stock: true,
  });
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [details, setDetails] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    if (!product) return;
    setForm({
      est_id: product.est_id || '',
      name: product.name || '',
      category: product.category || '',
      main_category: product.main_category || product.mainCategory || '',
      sub_category: product.sub_category || product.subCategory || '',
      fabric: product.fabric || '',
      occasion: product.occasion || '',
      price: product.price ?? '',
      old_price: product.old_price ?? product.oldPrice ?? '',
      discount: product.discount ?? '',
      rating: product.rating ?? '',
      review_count: product.review_count ?? product.reviewCount ?? '',
      sku: product.sku || '',
      description: product.description || '',
      care: product.care || '',
      is_new_arrival: product.is_new_arrival ?? product.isNewArrival ?? false,
      is_best_seller: product.is_best_seller ?? product.isBestSeller ?? false,
      is_trending: product.is_trending ?? product.isTrending ?? false,
      is_featured: product.is_featured ?? product.isFeatured ?? false,
      in_stock: product.in_stock ?? product.inStock ?? true,
    });
    setColors(product.colors || []);
    setSizes(product.sizes || []);
    setDetails(product.details || []);
    setExistingImages(product.images || []);
  }, [product]);

  const setField = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const toggleFlag = (key) => () => {
    setForm((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleSize = (size) => {
    setSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
  };

  const updateColor = (index, key, value) => {
    setColors((prev) => prev.map((c, i) => (i === index ? { ...c, [key]: value } : c)));
  };

  const removeColor = (index) => {
    setColors((prev) => prev.filter((_, i) => i !== index));
  };

  const updateDetail = (index, value) => {
    setDetails((prev) => prev.map((d, i) => (i === index ? value : d)));
  };

  const removeDetail = (index) => {
    setDetails((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);
    setNewFiles((prev) => [...prev, ...files]);
    e.target.value = '';
  };

  const removeExistingImage = (path) => {
    setExistingImages((prev) => prev.filter((p) => p !== path));
  };

  const removeNewFile = (index) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setServerError(null);
    setErrors({});

    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      fd.append(key, value === true ? '1' : value === false ? '0' : value ?? '');
    });
    fd.append('colors', JSON.stringify(colors));
    fd.append('sizes', JSON.stringify(sizes));
    fd.append('details', JSON.stringify(details));
    fd.append('keep_images', JSON.stringify(existingImages));
    newFiles.forEach((file) => fd.append('images[]', file));

    try {
      const url = product ? `/admin/products/${product.id}` : '/admin/products';
      const response = await api.post(url, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onSaved(response.data);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setServerError(error.response?.data?.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setSaving(false);
    }
  };

  const allCategories = categories.map((c) => c.name);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {serverError && (
        <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
          {serverError}
        </div>
      )}

      {/* Basic Info */}
      <section className="bg-white rounded-2xl border border-bisque/50 p-6 shadow-sm">
        <h3 className={sectionTitleClass}>Basic Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Product ID (est_id)</label>
            <input
              className={inputClass}
              value={form.est_id}
              onChange={setField('est_id')}
              placeholder="est-013 (auto if empty)"
            />
            {errors.est_id && <p className="text-xs text-red-600 mt-1">{errors.est_id[0]}</p>}
          </div>
          <div className="sm:col-span-2 lg:col-span-2">
            <label className={labelClass}>Product Name *</label>
            <input className={inputClass} value={form.name} onChange={setField('name')} placeholder="e.g. Gulzar Handcrafted Anarkali Set" />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name[0]}</p>}
          </div>
          <div>
            <label className={labelClass}>Category *</label>
            <input className={inputClass} list="admin-categories" value={form.category} onChange={setField('category')} placeholder="e.g. Chikankari Kurtis" />
            <datalist id="admin-categories">
              {allCategories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category[0]}</p>}
          </div>
          <div>
            <label className={labelClass}>Main Category *</label>
            <input className={inputClass} list="admin-main-categories" value={form.main_category} onChange={setField('main_category')} placeholder="e.g. Kurtis" />
            <datalist id="admin-main-categories">
              {['Kurtis', 'Sarees', 'Co-Ord Sets', 'Ethnic Dresses'].map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            {errors.main_category && <p className="text-xs text-red-600 mt-1">{errors.main_category[0]}</p>}
          </div>
          <div>
            <label className={labelClass}>Sub Category *</label>
            <input className={inputClass} value={form.sub_category} onChange={setField('sub_category')} placeholder="e.g. Anarkali Suits" />
            {errors.sub_category && <p className="text-xs text-red-600 mt-1">{errors.sub_category[0]}</p>}
          </div>
          <div>
            <label className={labelClass}>Fabric *</label>
            <input className={inputClass} list="admin-fabrics" value={form.fabric} onChange={setField('fabric')} placeholder="e.g. Pure Silk" />
            <datalist id="admin-fabrics">
              {['Pure Silk', 'Chikankari Cotton', 'Organza', 'Mulmul Cotton', 'Banarasi Brocade', 'Organic Linen'].map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            {errors.fabric && <p className="text-xs text-red-600 mt-1">{errors.fabric[0]}</p>}
          </div>
          <div>
            <label className={labelClass}>Occasion *</label>
            <input className={inputClass} list="admin-occasions" value={form.occasion} onChange={setField('occasion')} placeholder="e.g. Wedding Collection" />
            <datalist id="admin-occasions">
              {['Wedding Collection', 'Festive Wear', 'Office Wear', 'Casual Wear', 'Party Wear'].map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            {errors.occasion && <p className="text-xs text-red-600 mt-1">{errors.occasion[0]}</p>}
          </div>
          <div>
            <label className={labelClass}>SKU</label>
            <input className={inputClass} value={form.sku} onChange={setField('sku')} placeholder="e.g. EST-GUL-001" />
            {errors.sku && <p className="text-xs text-red-600 mt-1">{errors.sku[0]}</p>}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white rounded-2xl border border-bisque/50 p-6 shadow-sm">
        <h3 className={sectionTitleClass}>Pricing & Rating</h3>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className={labelClass}>Price (₹) *</label>
            <input type="number" min="0" className={inputClass} value={form.price} onChange={setField('price')} placeholder="1899" />
            {errors.price && <p className="text-xs text-red-600 mt-1">{errors.price[0]}</p>}
          </div>
          <div>
            <label className={labelClass}>Old Price (₹)</label>
            <input type="number" min="0" className={inputClass} value={form.old_price} onChange={setField('old_price')} placeholder="2599" />
          </div>
          <div>
            <label className={labelClass}>Discount (%)</label>
            <input type="number" min="0" max="100" className={inputClass} value={form.discount} onChange={setField('discount')} placeholder="27" />
          </div>
          <div>
            <label className={labelClass}>Rating</label>
            <input type="number" min="0" max="5" step="0.1" className={inputClass} value={form.rating} onChange={setField('rating')} placeholder="4.9" />
          </div>
          <div>
            <label className={labelClass}>Review Count</label>
            <input type="number" min="0" className={inputClass} value={form.review_count} onChange={setField('review_count')} placeholder="42" />
          </div>
        </div>
      </section>

      {/* Images */}
      <section className="bg-white rounded-2xl border border-bisque/50 p-6 shadow-sm">
        <h3 className={sectionTitleClass}>Product Images</h3>

        {existingImages.length > 0 && (
          <div className="mb-5">
            <p className="text-xs font-sans text-ebony/60 mb-3">Existing images — click ✕ to remove</p>
            <div className="flex flex-wrap gap-4">
              {existingImages.map((img) => (
                <div key={img} className="relative group">
                  <img src={img} alt="product" className="w-24 h-32 object-cover rounded-lg border border-bisque/60 shadow-sm" />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(img)}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                    aria-label="Remove image"
                  >
                    <FiX className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {newFiles.length > 0 && (
          <div className="mb-5">
            <p className="text-xs font-sans text-ebony/60 mb-3">New uploads</p>
            <div className="flex flex-wrap gap-4">
              {newFiles.map((file, index) => (
                <div key={`${file.name}-${index}`} className="relative group">
                  <img src={URL.createObjectURL(file)} alt={file.name} className="w-24 h-32 object-cover rounded-lg border border-dashed border-rose-antique/60 shadow-sm" />
                  <button
                    type="button"
                    onClick={() => removeNewFile(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                    aria-label="Remove upload"
                  >
                    <FiX className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-bisque rounded-xl bg-champagne-light/40 cursor-pointer hover:border-rose-antique hover:bg-champagne-light/70 transition-all group">
          <FiUpload className="w-8 h-8 text-rose-antique mb-2 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-sans font-semibold text-ebony">Upload product photos</span>
          <span className="text-xs font-sans text-ebony/50 mt-1">JPG, PNG or WebP · up to 5MB each</span>
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
        </label>
        {errors.images && <p className="text-xs text-red-600 mt-2">{errors.images[0]}</p>}
      </section>

      {/* Colors */}
      <section className="bg-white rounded-2xl border border-bisque/50 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 border-b border-bisque/50 pb-2">
          <h3 className={sectionTitleClass + ' mb-0 border-b-0 pb-0'}>Colors Available</h3>
          <button
            type="button"
            onClick={() => setColors((prev) => [...prev, { name: '', hex: '#C87D87' }])}
            className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-rose-antique hover:text-rose-deep transition-colors"
          >
            <FiPlus /> Add Color
          </button>
        </div>
        {colors.length === 0 && (
          <p className="text-xs font-sans text-ebony/50">No colors added yet.</p>
        )}
        <div className="space-y-3">
          {colors.map((color, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="color"
                value={color.hex || '#C87D87'}
                onChange={(e) => updateColor(index, 'hex', e.target.value)}
                className="w-10 h-10 rounded-lg border border-bisque cursor-pointer bg-white p-1"
              />
              <input
                className={inputClass}
                value={color.name}
                onChange={(e) => updateColor(index, 'name', e.target.value)}
                placeholder="Color name, e.g. Antique Rose"
              />
              <button
                type="button"
                onClick={() => removeColor(index)}
                className="p-2 text-red-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                aria-label="Remove color"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Sizes */}
      <section className="bg-white rounded-2xl border border-bisque/50 p-6 shadow-sm">
        <h3 className={sectionTitleClass}>Available Sizes</h3>
        <div className="flex flex-wrap gap-3">
          {SIZE_OPTIONS.map((size) => {
            const active = sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-4 py-2 rounded-full border text-sm font-sans font-semibold transition-all ${
                  active
                    ? 'bg-ebony text-white border-ebony shadow-md'
                    : 'bg-white text-ebony/70 border-bisque hover:border-rose-antique'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </section>

      {/* Details */}
      <section className="bg-white rounded-2xl border border-bisque/50 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 border-b border-bisque/50 pb-2">
          <h3 className={sectionTitleClass + ' mb-0 border-b-0 pb-0'}>Product Details</h3>
          <button
            type="button"
            onClick={() => setDetails((prev) => [...prev, ''])}
            className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-rose-antique hover:text-rose-deep transition-colors"
          >
            <FiPlus /> Add Detail
          </button>
        </div>
        {details.length === 0 && (
          <p className="text-xs font-sans text-ebony/50">No details added yet.</p>
        )}
        <div className="space-y-3">
          {details.map((detail, index) => (
            <div key={index} className="flex items-center gap-3">
              <FiImage className="w-4 h-4 text-rose-antique flex-none" />
              <input
                className={inputClass}
                value={detail}
                onChange={(e) => updateDetail(index, e.target.value)}
                placeholder="e.g. Fabric: 100% Breathable Cotton Mulmul"
              />
              <button
                type="button"
                onClick={() => removeDetail(index)}
                className="p-2 text-red-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                aria-label="Remove detail"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Description & Care */}
      <section className="bg-white rounded-2xl border border-bisque/50 p-6 shadow-sm">
        <h3 className={sectionTitleClass}>Description & Care</h3>
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Description *</label>
            <textarea rows="4" className={inputClass} value={form.description} onChange={setField('description')} placeholder="Write a compelling product description..." />
            {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description[0]}</p>}
          </div>
          <div>
            <label className={labelClass}>Care Instructions</label>
            <textarea rows="2" className={inputClass} value={form.care} onChange={setField('care')} placeholder="e.g. Dry Clean Only. Cool Iron on reverse side." />
          </div>
        </div>
      </section>

      {/* Flags */}
      <section className="bg-white rounded-2xl border border-bisque/50 p-6 shadow-sm">
        <h3 className={sectionTitleClass}>Storefront Flags</h3>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            { key: 'is_new_arrival', label: 'New Arrival' },
            { key: 'is_best_seller', label: 'Best Seller' },
            { key: 'is_trending', label: 'Trending' },
            { key: 'is_featured', label: 'Featured' },
            { key: 'in_stock', label: 'In Stock' },
          ].map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={toggleFlag(key)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-sans font-semibold transition-all ${
                form[key]
                  ? 'bg-ebony text-white border-ebony shadow-md'
                  : 'bg-white text-ebony/60 border-bisque hover:border-rose-antique'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${form[key] ? 'bg-blush' : 'bg-bisque'}`} />
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* Actions */}
      <div className="flex items-center justify-end gap-4 sticky bottom-0 bg-offwhite/95 backdrop-blur py-4 -mx-4 px-4 border-t border-bisque/40">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 rounded-full text-sm font-sans font-semibold text-ebony border border-bisque hover:bg-white transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-ebony text-white text-sm font-sans font-bold uppercase tracking-widest hover:bg-rose-deep disabled:opacity-60 transition-all"
        >
          {saving ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;