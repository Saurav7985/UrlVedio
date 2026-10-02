import { useState, useEffect } from "react";
import { FiPlay, FiCheck, FiDownload, FiVideo, FiMusic } from "react-icons/fi";
import QualityOption from "./QualityOption";

function ResultPanel({ status, videoInfo, onDownload }) {
  const [downloadType, setDownloadType] = useState("video");
  const [selectedVideoQuality, setSelectedVideoQuality] = useState(null);
  const [selectedAudioQuality, setSelectedAudioQuality] = useState(null);

  // Automatically select the highest quality when info is loaded
  useEffect(() => {
    if (videoInfo?.availableVideoQuality?.length > 0) {
      const sortedVideo = [...videoInfo.availableVideoQuality].sort((a, b) => b - a);
      setSelectedVideoQuality(sortedVideo[0]);
    }
    if (videoInfo?.availableAudioQuality?.length > 0) {
      const sortedAudio = [...videoInfo.availableAudioQuality].sort((a, b) => b - a);
      setSelectedAudioQuality(sortedAudio[0]);
    }
    setDownloadType(videoInfo?.availableVideoQuality?.length > 0 ? "video" : "audio");
  }, [videoInfo]);

  if (status === "idle" || status === "scanning") return null;

  const handleDownloadClick = () => {
    if (downloadType === "video" && selectedVideoQuality) {
      onDownload("video", selectedVideoQuality);
    } else if (downloadType === "audio" && selectedAudioQuality) {
      onDownload("audio", selectedAudioQuality);
    }
  };

  const currentQuality = downloadType === "video" ? selectedVideoQuality : selectedAudioQuality;
  const isDownloadDisabled = !currentQuality || status === "downloading";

  return (
    <div className="fade-up mt-5 rounded-2xl border border-white/10 bg-[#121826] p-4 md:p-6 flex flex-col gap-6">
      
      {/* Video Info Header */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative shrink-0 w-full sm:w-48 aspect-video rounded-lg bg-[#0D121D] border border-white/10 flex items-center justify-center overflow-hidden group">
          {videoInfo?.thumbnail ? (
            <img src={videoInfo.thumbnail} alt="thumbnail" className="h-full w-full object-cover" />
          ) : (
            <FiPlay className="h-8 w-8 text-amber-400/70" />
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-center sm:justify-start">
          <p className="font-body text-lg font-bold text-[#ECEDF1] line-clamp-2 mb-1 text-center sm:text-left">
            {videoInfo?.title || "Untitled_Signal_Feed"}
          </p>
          <p className="font-body text-sm text-[#8A93A6] text-center sm:text-left">
            {videoInfo?.author ? `${videoInfo.author}` : "Unknown Creator"}
          </p>
          {videoInfo?.views && (
            <p className="font-body text-xs text-[#5B6478] mt-1 text-center sm:text-left">
              {Number(videoInfo.views).toLocaleString()} views
            </p>
          )}
        </div>
      </div>

      <hr className="border-white/5" />

      {/* Download Options */}
      {status !== "idle" && status !== "scanning" && (videoInfo?.availableVideoQuality || videoInfo?.availableAudioQuality) && (
        <div className="space-y-6">
          <p className="text-sm font-display font-bold tracking-widest text-[#ECEDF1] uppercase text-center sm:text-left">
            Download Options
          </p>

          <div>
            <p className="text-xs font-display tracking-widest text-[#5B6478] mb-2 uppercase text-center sm:text-left">Type</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => setDownloadType("video")}
                className={`flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-2 font-display text-xs px-4 py-3 sm:py-2 rounded-md border transition-all duration-200 ${
                  downloadType === "video"
                    ? "bg-amber-400 text-black border-amber-400 font-bold scale-[1.02] sm:scale-105"
                    : "border-white/10 text-white/70 hover:bg-white/5 hover:border-white/30"
                }`}
              >
                <FiVideo className="h-4 w-4" /> VIDEO
              </button>
              <button
                onClick={() => setDownloadType("audio")}
                className={`flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-2 font-display text-xs px-4 py-3 sm:py-2 rounded-md border transition-all duration-200 ${
                  downloadType === "audio"
                    ? "bg-amber-400 text-black border-amber-400 font-bold scale-[1.02] sm:scale-105"
                    : "border-white/10 text-white/70 hover:bg-white/5 hover:border-white/30"
                }`}
              >
                <FiMusic className="h-4 w-4" /> AUDIO
              </button>
            </div>
          </div>

          {/* Quality Selector */}
          <div>
            <p className="text-xs font-display tracking-widest text-[#5B6478] mb-2 uppercase text-center sm:text-left">
              {downloadType === "video" ? "Video Quality" : "Audio Quality"}
            </p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              {downloadType === "video" && videoInfo.availableVideoQuality && [...videoInfo.availableVideoQuality].sort((a,b)=>b-a).map((quality) => (
                <QualityOption
                  key={`video-${quality}`}
                  label={`${quality}p`}
                  isSelected={selectedVideoQuality === quality}
                  onSelect={() => setSelectedVideoQuality(quality)}
                />
              ))}

              {downloadType === "audio" && videoInfo.availableAudioQuality && [...videoInfo.availableAudioQuality].sort((a,b)=>b-a).map((quality) => (
                <QualityOption
                  key={`audio-${quality}`}
                  label={`${quality} kbps`}
                  isSelected={selectedAudioQuality === quality}
                  onSelect={() => setSelectedAudioQuality(quality)}
                />
              ))}
            </div>
          </div>

          {/* Download Button */}
          {status !== "downloading" && status !== "done" && (
             <button
               onClick={handleDownloadClick}
               disabled={isDownloadDisabled}
               className="w-full flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-black font-display font-bold text-sm sm:text-base px-6 py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation active:scale-[0.98]"
             >
               <FiDownload className="h-5 w-5" />
               DOWNLOAD {currentQuality}{downloadType === "video" ? "p" : " KBPS"}
             </button>
          )}

          {status === "downloading" && (
            <div className="w-full bg-[#1A2235] border border-amber-400/20 p-4 rounded-lg">
               <div className="flex items-center justify-between mb-2">
                 <p className="text-sm text-amber-400 font-display font-bold animate-pulse">DOWNLOADING...</p>
               </div>
               <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-full rounded-full progress-stripes bg-amber-400" />
               </div>
            </div>
          )}

          {status === "done" && (
            <div className="w-full flex items-center justify-center gap-2 font-display text-sm text-teal-300 bg-teal-400/10 border border-teal-400/20 p-4 rounded-lg">
              <FiCheck className="h-5 w-5" />
              Listen Your Favorite 💕!
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ResultPanel;