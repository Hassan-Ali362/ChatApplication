import { useState } from "react";
import { Search, X } from "lucide-react";

export const SearchBar = ({ onSearch, placeholder = "Search..." }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm("");
    onSearch("");
    setIsExpanded(false);
  };

  return (
    <div className="relative">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="p-2 text-slate-400 hover:text-cyan-400 transition"
          title="Search messages"
        >
          <Search size={20} />
        </button>
      ) : (
        <div className="flex items-center gap-2 bg-slate-700 rounded-lg px-3 py-2">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={placeholder}
            className="bg-transparent text-white text-sm focus:outline-none w-40"
            autoFocus
          />
          {searchTerm && (
            <button
              onClick={handleClear}
              className="text-slate-400 hover:text-white transition"
            >
              <X size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
