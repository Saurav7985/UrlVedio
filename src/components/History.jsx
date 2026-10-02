import { useEffect, useState } from 'react';
import { getDownloadHistory, removeFromDownloadHistory, clearDownloadHistory } from '../utils/history';

function History({ onDownload }) {
  const [history, setHistory] = useState([]);

  const loadHistory = () => {
    setHistory(getDownloadHistory());
  };

  useEffect(() => {
    loadHistory();
    window.addEventListener("history-updated", loadHistory);
    return () => window.removeEventListener("history-updated", loadHistory);
  }, []);

  const handleDelete = (id) => {
    const newHistory = removeFromDownloadHistory(id);
    setHistory(newHistory);
  };

  const handleClear = () => {
    if (window.confirm("Clear all download history?")) {
      const newHistory = clearDownloadHistory();
      setHistory(newHistory);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).replace(',', ',');
  };

  return (
    <div id="history" className="w-full max-w-xl mx-auto mt-16 mb-8 scroll-mt-24 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-xl font-bold text-[#ECEDF1] tracking-wider uppercase">
          History
        </h2>
        {history.length > 0 && (
          <button
            onClick={handleClear}
            className="text-xs font-display tracking-wider text-[#8A93A6] hover:text-red-400 transition-colors uppercase border border-[#8A93A6]/30 hover:border-red-400/50 px-3 py-1.5 rounded-md"
          >
            Clear History
          </button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {history.length === 0 ? (
          <div className="text-center py-12 bg-[#121826] rounded-xl border border-white/5">
            <h3 className="font-display text-[#ECEDF1] mb-2 uppercase tracking-wide">No downloads yet</h3>
            <p className="font-body text-[#5B6478] text-sm">
              Your downloaded videos and audio files<br />will appear here.
            </p>
          </div>
        ) : (
          history.map((item) => (
            <div key={item.id} className="relative rounded-2xl border border-white/10 bg-[#121826] overflow-hidden flex flex-col sm:flex-row p-3 gap-4 group">
              {/* Thumbnail */}
              <div className="w-full sm:w-32 aspect-video sm:aspect-square md:aspect-video rounded-xl overflow-hidden flex-shrink-0 bg-black relative">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col flex-grow justify-between py-1">
                <div>
                  <h3 className="font-display text-sm font-bold text-[#ECEDF1] line-clamp-2 mb-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 font-display text-[10px] tracking-wider text-[#8A93A6] uppercase mb-1">
                    <span className={item.type === 'video' ? 'text-blue-400' : 'text-purple-400'}>
                      {item.type}
                    </span>
                    <span>•</span>
                    <span className="text-amber-400">{item.quality}</span>
                  </div>
                  <p className="font-body text-xs text-[#5B6478]">
                    {formatDate(item.downloadedAt)}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-4 sm:mt-0 pt-2 border-t border-white/5 sm:border-t-0 sm:pt-0">
                  <button
                    onClick={() => onDownload(item.type, item.quality, item.url)}
                    className="text-xs font-display tracking-wider text-[#8A93A6] hover:text-amber-400 transition-colors uppercase"
                  >
                    [ Download Again ]
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-xs font-display tracking-wider text-[#8A93A6] hover:text-red-400 transition-colors uppercase"
                  >
                    [ Delete ]
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default History;
