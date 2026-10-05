import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { BagCategory, ColorVariation } from '../../types';
import { X, Upload, Plus, Trash2, CheckCircle2, Sparkles, Image as ImageIcon } from 'lucide-react';

const CATEGORIES: BagCategory[] = [
  'Handbags',
  'Shoulder Bags',
  'Crossbody Bags',
  'Tote Bags',
  'Clutches',
  'Wallets'
];

interface QuickProductUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickProductUploadModal: React.FC<QuickProductUploadModalProps> = ({ isOpen, onClose }) => {
  const { addProduct, showToast, setSelectedProductId, setActiveView } = useStore();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<BagCategory>('Handbags');
  const [price, setPrice] = useState<number>(450);
  const [salePrice, setSalePrice] = useState<number | undefined>(undefined);
  const [stock, setStock] = useState<number>(12);
  const [colorName, setColorName] = useState('Noir Black');
  const [colorHex, setColorHex] = useState('#141416');
  const [description, setDescription] = useState('Exclusive Naazmeen Fashion handcrafted luxury leather bag with premium gold accessories.');
  const [material, setMaterial] = useState('Premium Full-Grain Calfskin Leather');
  const [tagline, setTagline] = useState('Timeless elegance designed for modern style.');
  const [images, setImages] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [isBestseller, setIsBestseller] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(true);

  if (!isOpen) return null;

  // Handle local files upload via FileReader
  const handleFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setImages(prev => [...prev, result]);
        }
      };
      reader.readAsDataURL(file);
    });

    showToast(`Added ${files.length} photo(s)`, 'success');
  };

  // Handle URL Add
  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return;
    setImages(prev => [...prev, imageUrlInput.trim()]);
    setImageUrlInput('');
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Please enter the product name', 'error');
      return;
    }

    // Default image if none uploaded
    const finalImages = images.length > 0 ? images : ['/src/assets/images/bag_noir_handbag_1791211856470.jpg'];

    const mainColor: ColorVariation = {
      id: `col-${Date.now()}`,
      colorName,
      colorHex,
      stock,
      images: finalImages,
      sku: `NF-${Math.floor(100 + Math.random() * 900)}`
    };

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    addProduct({
      name,
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
      tagline,
      description,
      category,
      price: Number(price),
      salePrice: salePrice ? Number(salePrice) : undefined,
      featured: true,
      bestseller: isBestseller,
      newArrival: isNewArrival,
      rating: 5.0,
      reviewCount: 1,
      sku: `NF-${category.slice(0, 2).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      stock: Number(stock),
      material,
      dimensions: '28cm x 20cm x 11cm',
      hardware: 'Brushed Gold Hardware',
      lining: 'Soft Silk Lambskin Lining',
      features: [
        'Exclusive Naazmeen Fashion design',
        'Handcrafted stitched detailing',
        'Detachable luxury strap',
        'Protective branded dust bag'
      ],
      colors: [mainColor]
    });

    showToast(`Product "${name}" uploaded successfully!`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#EAE5D9] overflow-hidden my-8 relative flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#EAE5D9] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#0F172A] text-[#C5A880]">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-slate-900">
                Upload New Product · Naazmeen Fashion
              </h3>
              <p className="text-xs text-slate-500">
                Upload bag photos from your phone/computer and publish instantly to the boutique.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100"
            aria-label="Close upload modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 1. Photos Upload Area (High Priority) */}
          <div className="bg-white p-5 rounded-2xl border border-[#EAE5D9] space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs uppercase tracking-wider font-semibold text-slate-800">
                1. Upload Product Photos / تصویریں اپلوڈ کریں *
              </label>
              <span className="text-[11px] text-slate-400">{images.length} photos selected</span>
            </div>

            {/* Drag and Drop / Choose File button */}
            <label className="border-2 border-dashed border-[#C5A880] hover:border-slate-800 bg-[#FAF8F5] hover:bg-white rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all text-center group">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-[#8B5A2B] group-hover:scale-110 transition-transform flex items-center justify-center mb-2">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-xs font-semibold text-slate-800">
                Click to Select Photos from Device / Gallery
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Supports JPG, PNG, WEBP. You can select multiple images at once.
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFilesSelect}
                className="hidden"
              />
            </label>

            {/* Image URL fallback */}
            <div className="flex gap-2 pt-2">
              <input
                type="url"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="Or paste an image web link (URL)..."
                className="w-full text-xs px-3 py-2 rounded-xl border border-[#EAE5D9] bg-[#FAF8F5] focus:outline-none focus:border-[#8B5A2B]"
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl shrink-0"
              >
                Add Link
              </button>
            </div>

            {/* Selected Image Previews */}
            {images.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {images.map((img, idx) => (
                  <div key={idx} className="relative group w-20 h-20 rounded-xl overflow-hidden border border-[#EAE5D9] shadow-sm">
                    <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1 right-1 p-1 bg-rose-600 text-white rounded-full opacity-80 hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    {idx === 0 && (
                      <span className="absolute bottom-0 inset-x-0 bg-black/70 text-white text-[9px] text-center py-0.5">
                        Main Cover
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 2. Product Information */}
          <div className="bg-white p-5 rounded-2xl border border-[#EAE5D9] space-y-4">
            <h4 className="font-serif text-sm font-semibold text-slate-900 border-b border-[#EAE5D9] pb-2">
              2. Product Details / پروڈکٹ کی تفصیل
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Naazmeen Royal Embroidered Handbag"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] bg-[#FAF8F5] focus:outline-none focus:border-[#8B5A2B]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-700 mb-1">
                  Bag Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as BagCategory)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] bg-[#FAF8F5] focus:outline-none"
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-700 mb-1">
                  Stock Units Available *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] bg-[#FAF8F5] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-700 mb-1">
                  Regular Price ($ / Rs) *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] bg-[#FAF8F5] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-700 mb-1">
                  Discount / Sale Price (Optional)
                </label>
                <input
                  type="number"
                  min="1"
                  value={salePrice || ''}
                  onChange={(e) => setSalePrice(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="e.g. 390"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] bg-[#FAF8F5] focus:outline-none"
                />
              </div>
            </div>

            {/* Color Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#EAE5D9]">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-700 mb-1">
                  Color Name
                </label>
                <input
                  type="text"
                  value={colorName}
                  onChange={(e) => setColorName(e.target.value)}
                  placeholder="Noir Black, Emerald Green, Golden Tan..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] bg-[#FAF8F5] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-700 mb-1">
                  Color Swatch
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={colorHex}
                    onChange={(e) => setColorHex(e.target.value)}
                    className="w-9 h-9 rounded-lg border border-slate-300 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={colorHex}
                    onChange={(e) => setColorHex(e.target.value)}
                    className="w-full text-xs font-mono px-3.5 py-2 rounded-xl border border-[#EAE5D9] bg-[#FAF8F5]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-700 mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#EAE5D9] bg-[#FAF8F5] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-6 pt-1">
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isNewArrival}
                  onChange={(e) => setIsNewArrival(e.target.checked)}
                  className="rounded accent-[#0F172A]"
                />
                <span>Mark as New Arrival</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBestseller}
                  onChange={(e) => setIsBestseller(e.target.checked)}
                  className="rounded accent-[#0F172A]"
                />
                <span>Mark as Bestseller</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-[#EAE5D9] text-xs uppercase tracking-wider font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs uppercase tracking-widest font-semibold rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <Upload className="w-4 h-4 text-[#C5A880]" />
              <span>Publish & Upload Product</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
