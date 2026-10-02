import AmbientBackground from '../components/AmbientBackground'
import LinkInputBar from '../components/LinkInputBar'
import AnalyzeButton from '../components/AnalyzeButton'
import ResultPanel from '../components/ResultPanel'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Animation from '../components/Animation'
import History from '../components/History'
import { useDownloader } from '../hooks/useDownloader'

function Downloader() {
  const {
    url, setUrl, status, pasted, inputRef, videoInfo,
    isValid, handlePaste, handleFetch, handleDownload,
  } = useDownloader()

  return (
    <div id="home" className="relative min-h-screen w-full flex flex-col overflow-x-hidden" style={{
      background: `radial-gradient(circle at 50% 20%, rgba(120, 70, 20, 0.15), transparent 40%), linear-gradient(180deg, #0b0f17 0%, #090d14 50%, #070a10 100%)`
    }}>
      <Navbar />
      
      {/* Animation Section */}
      <div className="w-full mt-[8rem] h-[160px] sm:h-[200px] md:h-[260px] flex items-center justify-center overflow-hidden z-10 relative pointer-events-auto">
        <div className="scale-[0.65] sm:scale-[0.8] md:scale-100 origin-center flex items-center justify-center w-full h-full">
          <Animation imageWidth={180} imageHeight={180} background="transparent" />
        </div>
      </div>

      <AmbientBackground />

      <div className="flex-grow flex items-center justify-center px-4 py-8 md:py-12 z-10">
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
          <p className="font-body text-[#8A93A6] text-sm mb-4">
            Drop a YouTube link into the deck. We'll lock onto the signal and prep it for pickup.
          </p>

          <p id="how-it-works" className="font-body text-[#5B6478] text-xs leading-relaxed mb-8 border-l-2 border-amber-400/30 pl-3 scroll-mt-24">
            <strong className="text-[#8A93A6]">How it works:</strong> <span className="text-[#ECEDF1]">Paste</span> a YouTube link, <span className="text-[#ECEDF1]">analyze</span> the video, choose <span className="text-[#ECEDF1]">Video or Audio</span>, select your <span className="text-[#ECEDF1]">preferred quality</span>, and <span className="text-[#ECEDF1]">download</span>.
          </p>

          <div id="analyzer" className="relative rounded-2xl border border-white/10 bg-[#121826] p-2 scroll-mt-24">
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
      <History onDownload={handleDownload} />
      <Footer />
    </div>
  )
}

export default Downloader