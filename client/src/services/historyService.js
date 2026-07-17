const HISTORY_STORAGE_KEY = "socsphere_lookup_history";
const MAX_HISTORY_ITEMS = 50;

const normalizeHistory = (value) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item) =>
      item &&
      typeof item.id === "string" &&
      typeof item.value === "string" &&
      typeof item.type === "string" &&
      typeof item.searchedAt === "string",
  );
};

const readStoredHistory = () => {
  try {
    const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
    return storedHistory ? normalizeHistory(JSON.parse(storedHistory)) : [];
  } catch {
    return [];
  }
};

const writeHistory = (history) => {
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
  window.dispatchEvent(new CustomEvent("socsphere:history-updated"));
};

export const getLookupHistory = () => readStoredHistory();

export const saveLookupToHistory = ({ value, type, risk }) => {
  if (!value || !type || !risk) {
    return [];
  }

  const currentHistory = readStoredHistory();
  const normalizedValue = value.trim();

  const historyItem = {
    id: crypto.randomUUID(),
    value: normalizedValue,
    type,
    score: Number.isFinite(risk.score) ? risk.score : 0,
    level: risk.level || "Unknown",
    searchedAt: new Date().toISOString(),
  };

  const filteredHistory = currentHistory.filter(
    (item) =>
      !(
        item.value.toLowerCase() === normalizedValue.toLowerCase() &&
        item.type === type
      ),
  );

  const updatedHistory = [historyItem, ...filteredHistory].slice(
    0,
    MAX_HISTORY_ITEMS,
  );

  writeHistory(updatedHistory);
  return updatedHistory;
};

export const deleteLookupHistoryItem = (id) => {
  const updatedHistory = readStoredHistory().filter((item) => item.id !== id);
  writeHistory(updatedHistory);
  return updatedHistory;
};

export const clearLookupHistory = () => {
  localStorage.removeItem(HISTORY_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("socsphere:history-updated"));
  return [];
};
