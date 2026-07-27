function QualityOption({ label, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className="font-display text-[11px] px-3 py-1.5 rounded-md border border-teal-400/30 text-teal-300 hover:bg-teal-400/10 hover:border-teal-400/60 transition-all duration-200 hover:-translate-y-0.5"
    >
      {label}
    </button>
  )
}

export default QualityOption