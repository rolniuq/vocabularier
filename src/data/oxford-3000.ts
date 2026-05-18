/**
 * Oxford 3000 Word List Sample
 * In a real implementation, this would contain 3000 words with definitions and translations
 * For now, we provide a small sample for demonstration
 */

export interface OxfordWord {
  word: string;
  definition: string; // English definition
  vietnamese?: string; // Vietnamese translation (optional)
  synonyms?: string[]; // List of synonyms
}

export const oxford3000: OxfordWord[] = [
  {
    word: "abandon",
    definition: "to leave someone or something, especially when they need you",
    vietnamese: "đ deixar lại, bỏ rơi",
    synonyms: ["forsake", "desert", "relinquish", "quit", "yield"]
  },
  {
    word: "ability",
    definition: "the power or skill to do something",
    vietnamese: "khả năng",
    synonyms: ["capacity", "capability", "skill", "talent", "aptitude"]
  },
  {
    word: "able",
    definition: "having the power, skill, or means to do something",
    vietnamese: "có thể",
    synonyms: ["capable", "competent", "qualified", "fit", "adequate"]
  },
  {
    word: "about",
    definition: "on the subject of; concerning",
    vietnamese: "về",
    synonyms: ["concerning", "regarding", "on", "over", "around"]
  },
  {
    word: "above",
    definition: "at a higher level or layer than something",
    vietnamese: "trên",
    synonyms: ["over", "upstairs", "upwind", "aloft", "upward"]
  },
  {
    word: "abroad",
    definition: "in or to a foreign country",
    vietnamese: "Ngoài nước",
    synonyms: ["overseas", "internationally", "foreign", "away", "out"]
  },
  {
    word: "absence",
    definition: "the state of being away from a place or person",
    vietnamese: "sự vắng mặt",
    synonyms: ["lack", "deficiency", "deprivation", "nonexistence", "missing"]
  },
  {
    word: "absolute",
    definition: "not limited in any way",
    vietnamese: "một cách tuyệt đối",
    synonyms: ["complete", "total", "utter", "pure", "sheer"]
  },
  {
    word: "absorb",
    definition: "to take in or soak up (energy, or a liquid or other substance) by chemical or physical action",
    vietnamese: "hấp thụ",
    synonyms: ["soak up", "imbibe", "engross", "consume", "assimilate"]
  },
  {
    word: "abstract",
    definition: "existing in thought or as an idea but not having a physical or concrete existence",
    vietnamese: "trừu tượng",
    synonyms: ["theoretical", "conceptual", "intangible", "unreal", "ideal"]
  }
];

// In a real app, you would import the full list from a separate file or API
// For example: import { oxford3000Full } from './oxford-3000-full';
// export const oxford3000 = oxford3000Full;
