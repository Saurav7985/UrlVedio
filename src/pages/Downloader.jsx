import AmbientBackground from '../components/AmbientBackground'
import LinkInputBar from '../components/LinkInputBar'
import AnalyzeButton from '../components/AnalyzeButton'
import ResultPanel from '../components/ResultPanel'
import { useDownloader } from '../hooks/useDownloader'

function Downloader() {
  const {
    url, setUrl, status, pasted, inputRef, videoInfo,
    isValid, handlePaste, handleFetch, handleDownload,
  } = useDownloader()

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0E17] px-4 py-16">
      <AmbientBackground />

      <div className="relative w-full max-w-xl">
        <div className="flex items-center gap-2 mb-4 font-display text-[11px] tracking-[0.25em] text-amber-400/80">
          <span className="relative flex h-2 w-2">
            <span className="blink-dot absolute inline-flex h-full w-full rounded-full bg-red-500" />
          </span>
          SIGNAL CAPTURE UNIT
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#ECEDF1] leading-tight mb-2">
          Grab the <span className="text-amber-400">Feed</span>.
        </h1>
        <p className="font-body text-[#8A93A6] text-sm mb-8">
          Drop a YouTube link into the deck. We'll lock onto the signal and prep it for pickup.
        </p>

        <div className="relative rounded-2xl border border-white/10 bg-[#121826] p-2">
          <LinkInputBar
            inputRef={inputRef}
            url={url}
            setUrl={setUrl}
            status={status}
            isValid={isValid}
            pasted={pasted}
            onPaste={handlePaste}
          />
          <AnalyzeButton isValid={isValid} status={status} onClick={handleFetch} />
        </div>

        <ResultPanel status={status} videoInfo={videoInfo} onDownload={handleDownload} />

        <p className="font-body text-[11px] text-[#4B5468] mt-6 text-center">
          UI shell only — wire the analyze/download actions to your own backend.
        </p>
      </div>
    </div>
  )
}

export default Downloader