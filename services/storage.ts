import { Mantra, LogEntry, SyncPayload } from '../types';
import { APP_STORAGE_KEY, USER_ID_KEY, USER_NAME_KEY, SHEET_URL_KEY } from '../constants';

// --- Helper: Generate or Get User ID ---
export const getUserId = (): string => {
  let id = localStorage.getItem(USER_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(USER_ID_KEY, id);
  }
  return id;
};

// --- Deep Color Pool for Mantras ---
const DEEP_COLORS = [
  '#8B4513', // Saddle Brown
  '#2F4F4F', // Dark Slate Gray
  '#483D8B', // Dark Slate Blue
  '#8B008B', // Dark Magenta
  '#556B2F', // Dark Olive Green
  '#8B0000', // Dark Red
  '#191970', // Midnight Blue
  '#4B0082', // Indigo
  '#800000', // Maroon
  '#2E8B57', // Sea Green
  '#6B4226', // Dark Brown
  '#1C4587', // Dark Blue
];

const getAvailableColor = (existingMantras: Mantra[]): string => {
  const usedColors = new Set(existingMantras.map(m => m.color).filter(Boolean));
  const availableColor = DEEP_COLORS.find(color => !usedColors.has(color));
  // If all colors are used, cycle through them again
  return availableColor || DEEP_COLORS[existingMantras.length % DEEP_COLORS.length];
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
    
    // Migration: Assign colors to mantras that don't have one
    let needsSave = false;
    parsed.mantras.forEach((mantra: Mantra, index: number) => {
      if (!mantra.color) {
        mantra.color = getAvailableColor(parsed.mantras.slice(0, index));
        needsSave = true;
      }
    });
    
    if (needsSave) {
      localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(parsed));
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
      color: DEEP_COLORS[0],
    },
    {
      id: crypto.randomUUID(),
      name: "馬頭明王心咒",
      totalCount: 0,
      isPinned: false,
      createdAt: new Date().toISOString(),
      color: DEEP_COLORS[1],
    },
    {
      id: crypto.randomUUID(),
      name: "二十一聖救度母禮讚文",
      totalCount: 0,
      isPinned: false,
      createdAt: new Date().toISOString(),
      color: DEEP_COLORS[2],
    },
    {
      id: crypto.randomUUID(),
      name: "作明佛母心咒",
      totalCount: 0,
      isPinned: false,
      createdAt: new Date().toISOString(),
      color: DEEP_COLORS[3],
    },
    {
      id: crypto.randomUUID(),
      name: "三本尊除障法",
      totalCount: 0,
      isPinned: false,
      createdAt: new Date().toISOString(),
      color: DEEP_COLORS[4],
    },
    {
      id: crypto.randomUUID(),
      name: "都傑派 紅馬頭明王實修法",
      totalCount: 0,
      isPinned: false,
      createdAt: new Date().toISOString(),
      color: DEEP_COLORS[5],
    },
    {
      id: crypto.randomUUID(),
      name: "大白傘蓋佛母忿怒金剛遣魔擁護咒",
      totalCount: 0,
      isPinned: false,
      createdAt: new Date().toISOString(),
      color: DEEP_COLORS[6],
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
      color: getAvailableColor(data.mantras),
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
        data: {
            mantraName: mantra.name,
            amount: `+${amount}`,
            totalCount: mantra.totalCount,
            timestamp: formatTimestamp(new Date()),
            color: mantra.color
        }
      });

      return { updatedMantras: data.mantras, updatedLogs: data.logs };
    }
    return { updatedMantras: data.mantras, updatedLogs: data.logs };
  },

  resetMantra: (id: string): Mantra[] => {
    const data = getLocalData();
    const mantraIndex = data.mantras.findIndex(m => m.id === id);
    
    if (mantraIndex !== -1) {
      const mantra = data.mantras[mantraIndex];
      const previousCount = mantra.totalCount;
      mantra.totalCount = 0;
      saveLocalData(data);

      // Sync reset to Google Sheets with negative value
      sendToGoogleSheets({
        action: 'ADD_LOG',
        userName: StorageService.getUserName(),
        data: {
            mantraName: mantra.name,
            amount: previousCount > 0 ? `-${previousCount}` : '0',
            totalCount: 0,
            timestamp: formatTimestamp(new Date()),
            color: mantra.color
        }
      });
    }
    return data.mantras;
  }
};