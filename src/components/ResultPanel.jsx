import { FiPlay, FiCheck } from "react-icons/fi";
import QualityOption from "./QualityOption";

const OPTIONS = [
  { label: "1080p", type: "video", quality: 1080 },
  { label: "720p", type: "video", quality: 720 },
  { label: "MP3", type: "audio", quality: 128 },
];

function ResultPanel({ status, videoInfo, onDownload }) {
  if (status === "idle" || status === "scanning") return null;

  return (
    <div className="fade-up mt-5 rounded-2xl border border-white/10 bg-[#121826] p-4 flex gap-4">
      <div className="relative shrink-0 h-20 w-32 rounded-lg bg-[#0D121D] border border-white/10 flex items-center justify-center overflow-hidden group">
        {videoInfo?.thumbnail ? (
          <img src={videoInfo.thumbnail} alt="thumbnail" className="h-full w-full object-cover" />
        ) : (
          <FiPlay className="h-6 w-6 text-amber-400/70" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-body text-sm text-[#ECEDF1] truncate mb-1">
          {videoInfo?.title || "Untitled_Signal_Feed"}
        </p>
        <p className="font-body text-xs text-[#5B6478] mb-3">
          {videoInfo?.author ? `${videoInfo.author} · ` : ""}Locked
        </p>

        {status === "ready" && (
          <div className="flex gap-2">
            {OPTIONS.map((opt) => (
              <QualityOption
                key={opt.label}
                label={opt.label}
                onSelect={() => onDownload(opt.type, opt.quality)}
              />
            ))}
          </div>
        )}

        {status === "downloading" && (
          <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
            <div className="h-full w-full rounded-full progress-stripes" />
          </div>
        )}

        {status === "done" && (
          <div className="flex items-center gap-1.5 font-display text-[11px] text-teal-300">
            <FiCheck className="h-3.5 w-3.5" />
            SAVED TO DOWNLOADS FOLDER
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultPanel;