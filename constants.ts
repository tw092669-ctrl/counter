import { Quote } from './types';

// ---------------------------------------------------------
// GOOGLE SHEETS CONFIGURATION
// ---------------------------------------------------------
// The URL is now managed via LocalStorage through the UI.
// This constant acts as a fallback or initial hint if needed.
export const DEFAULT_SCRIPT_URL = ""; 

export const APP_STORAGE_KEY = 'zen_mala_data';
export const USER_ID_KEY = 'zen_mala_user_id';
export const USER_NAME_KEY = 'zen_mala_user_name';
export const USER_GROUP_KEY = 'zen_mala_user_group';
export const SHEET_URL_KEY = 'zen_mala_sheet_url';

export const USER_GROUPS = [
  "台南一組",
  "台南二組",
  "台南三組",
  "台南四組"
];

export const BUDDHA_IMAGES = [
  "https://lh3.googleusercontent.com/pw/AP1GczMeQlCQUMspA7it8glT3FjlAnJY9tWVJUE8xRc8J-_cjOOtG0xm3_ombNpWIMCCu3Z8D9q_knzo1fI5nJsZ9oqBS113R3ifhr6QE6oc7KpapeA63jw=w1920-h1080",
  "https://lh3.googleusercontent.com/pw/AP1GczPdS2EKMXmMv9WvO8RlVLKPdZlkGUVlGyVhzqDLEaaB_JaW2wSHm5D5X-bnuqYDW8_VOfq4fijcr-kkNpnpYocl3QFxvpUYrbsEDCAyZwAzhXQ1G4U=w1920-h1080",
  "https://lh3.googleusercontent.com/pw/AP1GczN5UGWwq4Iq8c8cFRI0fdmgyRdURdBilp3s0NkE28caxK63g_y784bmp0PJySQXiao-rLWRxzo2zgcW_0d02D2Z4wE3BsZiBWCeJqVvoG2tdX_lchw=w1920-h1080",
  "https://lh3.googleusercontent.com/pw/AP1GczN4OeBiKDiFzqivKrtkODXm-0a71Pb924H3cyii9-DP296Gc5-jIKvxKcPdT9nHtRkwbghrcWUwe6Q9SKGIsF1AjPg1xi8N0za5iStEfjA1ciCt1RQ=w1920-h1080"
];

export const QUOTES: Quote[] = [
  { text: "諸惡莫作，眾善奉行，自淨其意，是諸佛教。" },
  { text: "本來無一物，何處惹塵埃。" },
  { text: "一念放下，萬般自在。" },
  { text: "心生種種法生，心滅種種法滅。" },
  { text: "慈悲喜捨，度盡眾生。" },
  { text: "靜坐常思己過，閒談莫論人非。" },
  { text: "過去心不可得，現在心不可得，未來心不可得。" },
];