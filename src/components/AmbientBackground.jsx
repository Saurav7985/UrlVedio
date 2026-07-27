function AmbientBackground() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 crt-overlay opacity-40" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[42rem] rounded-full bg-amber-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-teal-400/10 blur-[90px]" />
    </>
  )
}

export default AmbientBackground