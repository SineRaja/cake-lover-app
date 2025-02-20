export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  CAKES: `${API_BASE_URL}/cakes`, // Matches the backend endpoint
};

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};
