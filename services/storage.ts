import { Mantra, LogEntry, SyncPayload } from '../types';
import { APP_STORAGE_KEY, USER_ID_KEY, USER_NAME_KEY, USER_GROUP_KEY, SHEET_URL_KEY } from '../constants';

// --- Helper: Generate or Get User ID ---
export const getUserId = (): string => {
  let id = localStorage.getItem(USER_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(USER_ID_KEY, id);
  }
  return id;
};

// --- Local Storage Implementation ---

interface LocalData {
  mantras: Mantra[];
  logs: LogEntry[];
  globalDateRange?: { name?: string; start?: string; end?: string }; // Updated to support name
}

const getLocalData = (): LocalData => {
  const data = localStorage.getItem(APP_STORAGE_KEY);
  if (data) {
    const parsed = JSON.parse(data);
    // Migration: If old globalTargetDate exists, move it to end date
    if ((parsed as any).globalTargetDate && !parsed.globalDateRange) {
        parsed.globalDateRange = { end: (parsed as any).globalTargetDate };
        delete (parsed as any).globalTargetDate;
    }
    return parsed;
  }
  
  // Initialize with default mantras requested by the user
  const defaultMantras: Mantra[] = [
    {
      id: crypto.randomUUID(),
      name: "懷業祈禱文",
      totalCount: 0,
      isPinned: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: "馬頭明王心咒",
      totalCount: 0,
      isPinned: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: "二十一聖救度母禮讚文",
      totalCount: 0,
      isPinned: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: "作明佛母心咒",
      totalCount: 0,
      isPinned: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: "三本尊除障法",
      totalCount: 0,
      isPinned: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: "都傑派 紅馬頭明王實修法",
      totalCount: 0,
      isPinned: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: "大白傘蓋佛母忿怒金剛遣魔擁護咒",
      totalCount: 0,
      isPinned: false,
      createdAt: new Date().toISOString(),
    }
  ];

  const initialData: LocalData = { mantras: defaultMantras, logs: [] };
  
  // Save defaults immediately so they persist
  localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(initialData));
  
  return initialData;
};

const saveLocalData = (data: LocalData) => {
  localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(data));
};

// Helper function to format date as YYYY/MM/DD HH:mm (Taiwan timezone UTC+8)
const formatTimestamp = (date: Date): string => {
  // Convert to Taiwan timezone (UTC+8)
  const taiwanTime = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Taipei' }));
  const year = taiwanTime.getFullYear();
  const month = String(taiwanTime.getMonth() + 1).padStart(2, '0');
  const day = String(taiwanTime.getDate()).padStart(2, '0');
  const hours = String(taiwanTime.getHours()).padStart(2, '0');
  const minutes = String(taiwanTime.getMinutes()).padStart(2, '0');
  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

// --- Google Sheets Integration Logic ---

const sendToGoogleSheets = async (payload: SyncPayload) => {
  const scriptUrl = localStorage.getItem(SHEET_URL_KEY);
  
  if (!scriptUrl) {
    console.log('Google Sheets URL not set. running in local mode.', payload);
    return;
  }

  try {
    // We use 'no-cors' for simplicity with simple GET/POST forms, 
    // but typically fetch with POST JSON is better handled by a proxy or correct CORS headers in GAS.
    // For GAS, often using text/plain ensures no CORS preflight issues.
    await fetch(scriptUrl, {
      method: 'POST',
      mode: 'no-cors', 
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Failed to sync with Google Sheets", error);
  }
};

// --- Service Methods ---

export const StorageService = {
  getMantras: (): Mantra[] => {
    return getLocalData().mantras;
  },

  getLogs: (): LogEntry[] => {
    return getLocalData().logs;
  },
  
  getUserName: (): string => {
    return localStorage.getItem(USER_NAME_KEY) || '善信';
  },

  setUserName: (name: string) => {
    localStorage.setItem(USER_NAME_KEY, name);
  },

  getUserGroup: (): string => {
    return localStorage.getItem(USER_GROUP_KEY) || '';
  },

  setUserGroup: (group: string) => {
    localStorage.setItem(USER_GROUP_KEY, group);
  },

  getGoogleSheetUrl: (): string => {
    return localStorage.getItem(SHEET_URL_KEY) || '';
  },

  setGoogleSheetUrl: (url: string) => {
    localStorage.setItem(SHEET_URL_KEY, url);
  },

  getGlobalDateRange: (): { name?: string, start?: string, end?: string } => {
    return getLocalData().globalDateRange || {};
  },

  setGlobalDateRange: (name: string | undefined, start: string | undefined, end: string | undefined) => {
    const data = getLocalData();
    if (!start && !end && !name) {
        delete data.globalDateRange;
    } else {
        data.globalDateRange = { name, start, end };
    }
    saveLocalData(data);
  },

  addMantra: (name: string): Mantra => {
    const data = getLocalData();
    const newMantra: Mantra = {
      id: crypto.randomUUID(),
      name,
      totalCount: 0,
      isPinned: false,
      createdAt: new Date().toISOString(),
    };
    data.mantras.push(newMantra);
    saveLocalData(data);
    return newMantra;
  },

  updateMantra: (id: string, updates: Partial<Mantra>): Mantra[] => {
    const data = getLocalData();
    const index = data.mantras.findIndex(m => m.id === id);
    if (index !== -1) {
      data.mantras[index] = { ...data.mantras[index], ...updates };
      saveLocalData(data);
    }
    return data.mantras;
  },

  togglePin: (id: string): Mantra[] => {
    const data = getLocalData();
    const index = data.mantras.findIndex(m => m.id === id);
    if (index !== -1) {
      data.mantras[index].isPinned = !data.mantras[index].isPinned;
      saveLocalData(data);
    }
    return data.mantras;
  },

  incrementMantra: (id: string, amount: number) => {
    const data = getLocalData();
    const mantraIndex = data.mantras.findIndex(m => m.id === id);
    
    if (mantraIndex !== -1) {
      const mantra = data.mantras[mantraIndex];
      mantra.totalCount += amount;

      const log: LogEntry = {
        id: crypto.randomUUID(),
        mantraId: mantra.id,
        mantraName: mantra.name,
        amount: amount,
        timestamp: new Date().toISOString(),
      };

      data.logs.push(log);
      saveLocalData(data);

      // Sync to Cloud
      sendToGoogleSheets({
        action: 'ADD_LOG',
        userName: StorageService.getUserName(),
        userGroup: StorageService.getUserGroup(),
        data: {
            mantraName: mantra.name,
            amount,
            totalCount: mantra.totalCount,
            timestamp: formatTimestamp(new Date())
        }
      });

      return { updatedMantras: data.mantras, updatedLogs: data.logs };
    }
    return { updatedMantras: data.mantras, updatedLogs: data.logs };
  }
};