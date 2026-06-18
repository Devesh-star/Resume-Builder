import React, { useRef, useState, useEffect } from 'react';
import { Check, Edit, Eye, EyeOff, Camera, Trash2 } from 'lucide-react';

export const Inputs = ({ value, onChange, label, placeholder, type = 'text' }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-5">
      {label && <label className="block text-sm font-semibold text-text-main mb-1.5">{label}</label>}
      <div className="relative">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className="w-full text-sm text-text-main bg-white border border-app-border px-4 py-3 rounded-xl placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200"
          value={value}
          onChange={onChange}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export const ProfilePhotoSelector = ({ setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(preview || null);

  useEffect(() => {
    if (preview) setPreviewUrl(preview);
  }, [preview]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setPreview?.(url);
    }
  };

  const handleRemove = () => {
    setImage(null);
    setPreviewUrl(null);
    setPreview?.(null);
  };

  const chooseFile = () => inputRef.current.click();

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <input type="file" accept="image/*" ref={inputRef} onChange={handleImageChange} className="hidden" />
      
      {!previewUrl ? (
        <button
          type="button"
          onClick={chooseFile}
          className="w-24 h-24 rounded-full border-2 border-dashed border-app-border bg-app-bg hover:bg-secondary flex flex-col items-center justify-center text-text-muted hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <Camera size={24} className="mb-1" />
          <span className="text-[10px] font-medium uppercase tracking-wider">Upload</span>
        </button>
      ) : (
        <div className="relative group w-24 h-24 rounded-full">
          <img src={previewUrl} alt="profile" className="w-full h-full rounded-full object-cover border border-app-border shadow-sm" />
          <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={chooseFile}
              className="p-1.5 bg-white text-text-main rounded-full hover:bg-gray-100 transition-colors"
              title="Edit Photo"
            >
              <Edit size={14} />
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 bg-error text-white rounded-full hover:bg-red-600 transition-colors"
              title="Remove Photo"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const TitleInput = ({ title, setTitle }) => {
  const [editing, setEditing] = useState(false);

  return (
    <div className="flex items-center gap-2">
      {editing ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Resume title"
            className="text-2xl sm:text-3xl font-bold text-text-main bg-transparent border-b-2 border-primary outline-none px-1 py-1 w-full max-w-sm"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
          />
          <button className="p-1.5 text-success hover:bg-success/10 rounded-lg transition-colors" onClick={() => setEditing(false)}>
            <Check size={20} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3 group">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-main tracking-tight">{title}</h2>
          <button className="p-1.5 text-text-muted hover:text-primary hover:bg-secondary rounded-lg transition-colors opacity-0 group-hover:opacity-100" onClick={() => setEditing(true)}>
            <Edit size={16} />
          </button>
        </div>
      )}
    </div>
  );
};