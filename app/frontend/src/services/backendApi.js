import axios from 'axios';

const DEFAULT_BASE_URL = 'http://localhost:5000';

export function getBackendBaseUrl() {
  return (import.meta.env?.VITE_BACKEND_URL || DEFAULT_BASE_URL).replace(/\/$/, '');
}

export async function runLevel({ code, level }) {
  const baseUrl = getBackendBaseUrl();
  const response = await axios.post(`${baseUrl}/run`, { code, level });
  return response.data;
}
