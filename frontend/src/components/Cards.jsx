import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Edit, Trash2, Award, TrendingUp, Zap, Clock, Check } from "lucide-react";
import { UserContext } from "./UserContext";


export const ProfileInfoCard = () => {
  const navigate = useNavigate()
  const { user, clearUser } = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    localStorage.clear()
    clearUser()
    navigate('/')
  }

  const handleDashboard = () => {
    navigate('/dashboard')
    setIsOpen(false)
  }

  return (
    user && (
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 p-1 pr-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden bg-[#d8386b]">
            {user.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm font-bold text-white">
                {user.name ? user.name.charAt(0).toUpperCase() : ""}
              </span>
            )}
          </div>
          <span className="text-sm font-semibold text-white truncate max-w-[120px]">
            {user.name?.split(' ')[0] || user.name}
          </span>
        </button>

        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <div className="absolute right-0 mt-2 w-48 bg-[#0a0508] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 p-2">
              <div className="px-3 py-2 border-b border-white/5 mb-2">
                <div className="text-sm font-bold text-white truncate">{user.name}</div>
                <div className="text-xs text-stone-400 truncate">{user.email}</div>
              </div>
              <button 
                onClick={handleDashboard}
                className="w-full text-left px-3 py-2 text-sm text-stone-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                Dashboard
              </button>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm text-[#d8386b] hover:text-[#ff4d85] hover:bg-white/5 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    )
  )
}


//Resume Summary Cards
export const ResumeSummaryCard = ({
  title = "Untitled Resume",
  createdAt = null,
  updatedAt = null,
  onSelect,
  onDelete,
  completion = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);

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
    if (completion >= 90) return "bg-emerald-500";
    if (completion >= 70) return "bg-amber-500";
    return "bg-red-500";
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (onDelete) onDelete();
  };

  return (
    <div
      className="group relative h-[320px] flex flex-col bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-white/15"
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Completion indicator */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 bg-[#0a0508]/80 backdrop-blur-sm border border-white/10 rounded-full">
        <div className={`w-2 h-2 rounded-full ${getCompletionColor()}`}></div>
        <span className="text-[11px] font-semibold text-white">{completion}%</span>
      </div>

      {/* Preview area */}
      <div className="p-5 flex-1 relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-3 border border-white/10">
            <Edit size={24} className="text-[#d8386b]" />
          </div>
          <span className="text-white text-sm font-semibold">{title}</span>
          <span className="text-stone-500 text-xs mt-1">
            {completion === 0 ? "Start building" : `${completion}% completed`}
          </span>
        </div>

        {/* Hover overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-[#0a0508]/80 flex items-center justify-center gap-3 transition-all">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onSelect) onSelect();
              }}
              className="w-11 h-11 flex items-center justify-center bg-[#d8386b] hover:bg-[#c02e5c] rounded-xl transition-colors"
              title="Edit"
            >
              <Edit size={16} className="text-white" />
            </button>
            <button
              onClick={handleDeleteClick}
              className="w-11 h-11 flex items-center justify-center bg-red-500/80 hover:bg-red-600 rounded-xl transition-colors"
              title="Delete"
            >
              <Trash2 size={16} className="text-white" />
            </button>
          </div>
        )}
      </div>

      {/* Info area */}
      <div className="bg-white/[0.02] border-t border-white/[0.06] p-4">
        <div className="mb-3">
          <h5 className="text-sm font-semibold text-white truncate mb-1">{title}</h5>
          <div className="flex items-center gap-2 text-[11px] text-stone-500">
            <Clock size={11} />
            <span>Created: {formattedCreatedDate}</span>
            <span className="ml-1">Updated: {formattedUpdatedDate}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full ${getCompletionColor()} rounded-full transition-all duration-500`}
            style={{ width: `${completion}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center mt-1.5">
          <span className="text-[10px] text-stone-500">
            {completion < 50 ? "Getting Started" : completion < 80 ? "Almost There" : "Ready"}
          </span>
          <span className="text-[10px] font-semibold text-stone-400">{completion}%</span>
        </div>
      </div>
    </div>
  );
};


//Template cards
export const TemplateCard = ({ thumbnailImg, isSelected, onSelect }) => {
  return (
    <div className={`group h-auto md:h-[300px] flex flex-col bg-white/[0.03] border-2 overflow-hidden cursor-pointer transition-all duration-300 rounded-2xl ${isSelected ? 'border-[#d8386b] bg-[#d8386b]/5' : 'border-white/[0.06] hover:border-white/15'
      } `} onClick={onSelect}>
      {thumbnailImg ? (
        <div className="relative w-full h-full overflow-hidden">
          <img className="w-full h-full object-cover" src={thumbnailImg || '/placeholder.svg'} alt="Template preview" />
          {isSelected && (
            <div className="absolute inset-0 bg-[#d8386b]/10 flex items-center justify-center">
              <div className="w-12 h-12 bg-[#0a0508]/80 rounded-full flex items-center justify-center border border-[#d8386b]/30">
                <Check size={20} className="text-[#d8386b]" />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full flex h-[200px] items-center flex-col justify-center bg-white/[0.02]">
          <div className="w-10 h-10 bg-[#d8386b]/10 rounded-xl flex items-center justify-center mb-3">
            <Edit className="text-[#d8386b]" size={18} />
          </div>
          <span className="text-stone-400 font-semibold text-sm">
            No Preview
          </span>
        </div>
      )}
    </div>
  )
}