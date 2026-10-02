function QualityOption({ label, isSelected, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className={`font-display text-xs px-4 py-2 rounded-md border transition-all duration-200 flex items-center justify-center gap-1 ${
        isSelected
          ? "bg-amber-400 text-black border-amber-400 font-bold scale-105"
          : "border-white/10 text-white/70 hover:bg-white/5 hover:border-white/30"
      }`}
    >
      {label} {isSelected && <span className="text-[10px]">✓</span>}
    </button>
  )
}

export default QualityOption