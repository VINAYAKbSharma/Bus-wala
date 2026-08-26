const LISTENERS_STORAGE_KEY = "bus_wala_total_listeners";
const SESSION_KEY = "bus_wala_session_counted";
const BASE_LISTENERS = 1428; // Baseline starting count for realistic stats

export const getAndIncrementListeners = () => {
  try {
    const stored = localStorage.getItem(LISTENERS_STORAGE_KEY);
    let count = stored ? parseInt(stored, 10) : BASE_LISTENERS;
    if (isNaN(count)) count = BASE_LISTENERS;

    const alreadyCountedInSession = sessionStorage.getItem(SESSION_KEY);
    if (!alreadyCountedInSession) {
      count += 1;
      localStorage.setItem(LISTENERS_STORAGE_KEY, count.toString());
      sessionStorage.setItem(SESSION_KEY, "true");
    }

    return count;
  } catch (err) {
    console.warn("Unable to access localStorage/sessionStorage for listeners count", err);
    return BASE_LISTENERS + 1;
  }
};
