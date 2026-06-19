import { useContext, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { createPortal } from "react-dom"
import { Edit, Trash2, Clock, Check, LogOut, LayoutDashboard, FileText, ChevronDown, Settings } from "lucide-react";
import { UserContext } from "./UserContext";

export const ProfileInfoCard = ({ compact }) => {
  const navigate = useNavigate()
  const { user, clearUser } = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef(null)
  const [dropdownStyles, setDropdownStyles] = useState({})

  const handleLogout = () => {
    localStorage.clear()
    clearUser()
    navigate('/')
  }

  const handleDashboard = () => {
    navigate('/dashboard')
    setIsOpen(false)
  }

  const handleSettings = () => {
    navigate('/settings')
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const isTopHalf = rect.top < window.innerHeight / 2;
      
      let styles = {
        position: 'fixed',
        width: 224,
        zIndex: 9999
      };

      // If it's in the top half of the screen (e.g. Navbar), drop down
      if (isTopHalf) {
        styles.top = rect.bottom + 8;
      } else {
        // If it's in the bottom half (e.g. Sidebar bottom), drop up
        styles.bottom = window.innerHeight - rect.top + 8;
      }

      // If it's too close to the right edge, align it to the right
      if (rect.left + 224 > window.innerWidth) {
        styles.right = window.innerWidth - rect.right;
      } else {
        styles.left = rect.left;
      }

      setDropdownStyles(styles);
    }
  }, [isOpen]);

  if (!user) return null;

  return (
    <div className="relative">
      <button 
        ref={buttonRef}
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex items-center justify-between gap-3 w-full p-2 rounded-xl hover:bg-[#F5F3FF] transition-colors cursor-pointer group"
      >
        <div className="flex items-center gap-3 w-full overflow-hidden">
          <div className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20 shrink-0 group-hover:border-[#7C3AED]/40 transition-colors">
            {user.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm font-bold">
                {user.name ? user.name.charAt(0).toUpperCase() : ""}
              </span>
            )}
          </div>
          {!compact && (
            <div className="flex flex-col items-start overflow-hidden text-left flex-1">
              <span className="text-sm font-bold text-[#111827] truncate w-full">
                {user.name}
              </span>
              <span className="text-xs text-[#6B7280] truncate w-full">
                {user.email}
              </span>
            </div>
          )}
        </div>
        {!compact && (
          <ChevronDown size={16} className={`text-[#9CA3AF] shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        )}
      </button>

      {isOpen && typeof document !== 'undefined' && createPortal(
        <>
          <div className="fixed inset-0 z-[9998]" onClick={() => setIsOpen(false)} />
          <div style={dropdownStyles} className="bg-white border border-[#E5E7EB] rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] p-1.5 animate-fade-in origin-bottom-left">
            {compact && (
              <div className="px-3 py-3 border-b border-[#E5E7EB] mb-1">
                <div className="text-sm font-bold text-[#111827] truncate">{user.name}</div>
                <div className="text-xs text-[#6B7280] truncate">{user.email}</div>
              </div>
            )}
            <button 
              onClick={handleDashboard}
              className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-[#111827] hover:bg-[#F5F3FF] rounded-lg transition-colors font-medium"
            >
              <LayoutDashboard size={16} className="text-[#6B7280]" />
              Dashboard
            </button>
            <button 
              onClick={handleSettings}
              className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-[#111827] hover:bg-[#F5F3FF] rounded-lg transition-colors font-medium"
            >
              <Settings size={16} className="text-[#6B7280]" />
              Settings
            </button>
            <div className="h-px bg-[#E5E7EB] my-1"></div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-[#EF4444] hover:bg-[#EF4444]/10 rounded-lg transition-colors font-medium"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </>,
        document.body
      )}
    </div>
  )
}

//Resume Summary Cards
export const ResumeSummaryCard = ({
  imgUrl,
  title = "Untitled Resume",
  createdAt = null,
  updatedAt = null,
  onSelect,
  onDelete,
  completion = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formattedCreatedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    : "—";

  const formattedUpdatedDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    : "—";

  const getCompletionColor = () => {
    if (completion >= 90) return "bg-success";
    if (completion >= 70) return "bg-warning";
    return "bg-error";
  };
  
  const getCompletionTextColor = () => {
    if (completion >= 90) return "text-success";
    if (completion >= 70) return "text-warning";
    return "text-error";
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete();
  };

  return (
    <div
      className="group relative h-[360px] flex flex-col bg-white border border-app-border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30 hover:-translate-y-1"
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Completion indicator */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm shadow-sm border border-app-border rounded-full">
        <div className={`w-2 h-2 rounded-full ${getCompletionColor()}`}></div>
        <span className="text-[11px] font-bold text-text-main">{completion}%</span>
      </div>

      {/* Preview area */}
      <div className="p-5 flex-1 relative overflow-hidden bg-app-bg border-b border-app-border">
        {imgUrl && !imageError ? (
           <div className="absolute inset-0">
               <img 
                 src={imgUrl} 
                 alt="Resume Preview" 
                 className="w-full h-full object-cover object-top opacity-80" 
                 onError={() => setImageError(true)}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-app-bg to-transparent"></div>
           </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-3 shadow-sm border border-app-border">
              <FileText size={24} className="text-primary" />
            </div>
            <span className="text-text-main text-sm font-bold">{title}</span>
            <span className="text-text-muted text-xs mt-1">
              {completion === 0 ? "Start building" : `${completion}% completed`}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-gray-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex gap-3">
             <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSelect) onSelect();
                }}
                className="w-12 h-12 flex items-center justify-center bg-primary hover:bg-[#6D28D9] rounded-full transition-transform hover:scale-105 shadow-lg shadow-primary/25"
                title="Edit"
              >
                <Edit size={18} className="text-white" />
              </button>
              <button
                onClick={handleDeleteClick}
                className="w-12 h-12 flex items-center justify-center bg-white border border-error/20 text-error hover:bg-error hover:text-white rounded-full transition-all hover:scale-105 shadow-sm"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
          </div>
        </div>
      </div>

      {/* Info area */}
      <div className="bg-white p-5">
        <div className="mb-4">
          <h5 className="text-base font-bold text-text-main truncate mb-1.5">{title}</h5>
          <div className="flex flex-col gap-1 text-[11px] text-text-muted font-medium">
             <div className="flex items-center gap-1.5"><Clock size={12} /> Created {formattedCreatedDate}</div>
             <div className="flex items-center gap-1.5 ml-[18px]">Updated {formattedUpdatedDate}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className={`h-full ${getCompletionColor()} rounded-full transition-all duration-500`}
            style={{ width: `${completion}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="text-xs font-semibold text-text-muted">
            {completion < 50 ? "Getting Started" : completion < 80 ? "Almost There" : "Ready to Apply"}
          </span>
          <span className={`text-xs font-bold ${getCompletionTextColor()}`}>{completion}%</span>
        </div>
      </div>
    </div>
  );
};

//Template cards
export const TemplateCard = ({ thumbnailImg, isSelected, onSelect }) => {
  return (
    <div className={`group h-auto md:h-[340px] flex flex-col bg-white border-2 overflow-hidden cursor-pointer transition-all duration-300 rounded-2xl shadow-sm ${isSelected ? 'border-primary ring-4 ring-primary/10' : 'border-app-border hover:border-primary/50 hover:shadow-md hover:-translate-y-1'
      } `} onClick={onSelect}>
      {thumbnailImg ? (
        <div className="relative w-full h-full overflow-hidden bg-app-bg">
          <img className="w-full h-full object-cover object-top border-b border-app-border" src={thumbnailImg || '/placeholder.svg'} alt="Template preview" />
          {isSelected && (
            <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-primary shadow-lg shadow-primary/20">
                <Check size={20} className="text-primary" />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full flex h-[240px] items-center flex-col justify-center bg-app-bg border-b border-app-border">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-3 shadow-sm border border-app-border">
            <LayoutDashboard className="text-text-muted" size={20} />
          </div>
          <span className="text-text-muted font-semibold text-sm">
            No Preview
          </span>
        </div>
      )}
      <div className="p-4 flex items-center justify-between">
          <span className="font-bold text-text-main text-sm">Professional Template</span>
          {isSelected && <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">Selected</span>}
      </div>
    </div>
  )
}