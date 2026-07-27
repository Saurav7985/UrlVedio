import { FiDownload } from 'react-icons/fi'
import { FaSpinner } from 'react-icons/fa'

function AnalyzeButton({ isValid, status, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={!isValid || status === 'scanning'}
      className={`mt-2 w-full flex items-center justify-center gap-2 rounded-xl py-4 font-display text-sm font-bold tracking-wide transition-all duration-300
        ${
          !isValid
            ? 'bg-white/5 text-[#4B5468] cursor-not-allowed'
            : 'bg-amber-400 text-[#0A0E17] hover:bg-amber-300 hover:shadow-[0_0_25px_rgba(255,176,32,0.35)] hover:-translate-y-0.5 active:translate-y-0'
        }`}
    >
      {status === 'scanning' ? (
        <>
          <FaSpinner className="h-4 w-4 animate-spin" />
          LOCKING SIGNAL...
        </>
      ) : (
        <>
          <FiDownload className="h-4 w-4" />
          ANALYZE LINK
        </>
      )}
    </button>
  )
}

export default AnalyzeButton