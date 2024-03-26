export const API_URL = 'http://localhost:3000';
export const TIMEOUT_SEC = 10;
export const MODAL_CLOSE_SEC = 2.5;
export const FUSE_OPTIONS = {
  isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  threshold: 0.3,
  keys: ['email', 'prenom', 'nom', 'role', 'structure', 'date_naissance'],
};
