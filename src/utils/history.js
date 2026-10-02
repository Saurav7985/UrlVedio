const HISTORY_KEY = 'youtube_download_history';
const MAX_HISTORY = 20;

export const getDownloadHistory = () => {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to parse download history', error);
    return [];
  }
};

export const addToDownloadHistory = (item) => {
  try {
    const history = getDownloadHistory();
    const newItem = {
      ...item,
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      downloadedAt: new Date().toISOString()
    };
    const updatedHistory = [newItem, ...history].slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    return updatedHistory;
  } catch (error) {
    console.error('Failed to add to download history', error);
    return getDownloadHistory();
  }
};

export const removeFromDownloadHistory = (id) => {
  try {
    const history = getDownloadHistory();
    const updatedHistory = history.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    return updatedHistory;
  } catch (error) {
    console.error('Failed to remove from download history', error);
    return getDownloadHistory();
  }
};

export const clearDownloadHistory = () => {
  try {
    localStorage.removeItem(HISTORY_KEY);
    return [];
  } catch (error) {
    console.error('Failed to clear download history', error);
    return [];
  }
};
