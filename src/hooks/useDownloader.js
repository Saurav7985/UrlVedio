import { useRef, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../api/axiosInstance";
import { addToDownloadHistory } from "../utils/history";

const YT_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/)|youtu\.be\/).+/i;

export function useDownloader() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("idle"); // idle | scanning | ready | downloading | done
  const [pasted, setPasted] = useState(false);
  const [videoInfo, setVideoInfo] = useState(null);
  const inputRef = useRef(null);

  const isValid = YT_REGEX.test(url.trim());

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      setPasted(true);
      setTimeout(() => setPasted(false), 1200);
    } catch {
      inputRef.current?.focus();
    }
  };

  // Step 1: video info fetch karo
  const handleFetch = async () => {
    if (!isValid || status === "scanning" || status === "downloading") return;
    setStatus("scanning");
    try {
      const { data } = await axiosInstance.post("/info", { url });
      setVideoInfo(data.data);
      setStatus("ready");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch video info");
      setStatus("idle");
    }
  };

  // Step 2: actual file download — browser ke default Downloads folder mein save hoga
  const handleDownload = async (type, quality, overrideUrl = null) => {
    setStatus("downloading");
    try {
      const targetUrl = overrideUrl || url;
      const endpoint = type === "audio" ? "/download/audio" : "/download/video";

      const response = await axiosInstance.post(
        endpoint,
        { url: targetUrl, quality },
        { responseType: "blob" } // binary file receive karne ke liye
      );

      // filename backend ke Content-Disposition header se nikalo
      const disposition = response.headers["content-disposition"];
      const match = disposition?.match(/filename="(.+)"/);
      const filename = match?.[1] || `download.${type === "audio" ? "mp3" : "mp4"}`;

      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename; // ye hi browser ko Downloads folder mein save karne ka trigger deta hai
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);

      setStatus("done");
      toast.success("Downloaded successfully!");

      addToDownloadHistory({
        url: targetUrl,
        title: videoInfo?.title || "Unknown Title",
        thumbnail: videoInfo?.thumbnail || "",
        type,
        quality,
        filename
      });
      window.dispatchEvent(new Event("history-updated"));
    } catch (err) {
      toast.error("Download failed");
      setStatus("ready");
    }
  };

  return {
    url, setUrl, status, pasted, inputRef, isValid, videoInfo,
    handlePaste, handleFetch, handleDownload,
  };
}