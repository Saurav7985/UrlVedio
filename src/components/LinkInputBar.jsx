import { FiLink2, FiClipboard, FiCheck } from 'react-icons/fi'

function LinkInputBar({ inputRef, url, setUrl, status, isValid, pasted, onPaste }) {
  return (
    <div
      className={`relative flex items-center gap-2 rounded-xl bg-[#0D121D] border transition-colors duration-300 overflow-hidden ${
        status === 'scanning'
          ? 'border-amber-400/60 scan-sweep'
          : isValid && url
          ? 'border-teal-400/50'
          : 'border-white/10 focus-within:border-amber-400/50'
      }`}
    >
      <FiLink2 className="ml-4 h-4 w-4 text-[#5B6478] shrink-0" />
      <input
        ref={inputRef}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://youtube.com/watch?v=..."
        className="font-body w-full bg-transparent py-4 pr-2 text-sm text-[#ECEDF1] placeholder:text-[#4B5468] outline-none"
      />
      <button
        onClick={onPaste}
        title="Paste from clipboard"
        className="mr-2 flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-body text-[#8A93A6] hover:text-amber-300 hover:bg-white/5 transition-all duration-200 shrink-0"
      >
        {pasted ? <FiCheck className="h-3.5 w-3.5 text-teal-400" /> : <FiClipboard className="h-3.5 w-3.5" />}
        {pasted ? 'Copied' : 'Paste'}
      </button>
    </div>
  )
}

export default LinkInputBar