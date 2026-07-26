const API_BASE = import.meta.env.VITE_API_URL || '';
// All API calls use relative paths so Vite's proxy forwards them to the backend.
const getStoredAuth = () => {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem('talentrank-auth');
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

export const getCurrentUser = () => getStoredAuth()?.user || null;
export const getAuthToken = () => getStoredAuth()?.token || null;
export const setAuthSession = (session) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('talentrank-auth', JSON.stringify(session));
  }
};
export const clearAuthSession = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('talentrank-auth');
  }
};

export const apiRequest = async (path, options = {}) => {
  const { body, headers, ...rest } = options;
  const token = getAuthToken();
  const isFormData = body instanceof FormData;
  const requestHeaders = new Headers(headers || {});

  if (!isFormData) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  if (token) {
    requestHeaders.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...rest,
    headers: requestHeaders,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  const responseText = await response.text();
  let payload = null;

  try {
    payload = responseText ? JSON.parse(responseText) : null;
  } catch {
    payload = responseText;
  }

  if (!response.ok) {
    const message = payload?.error || payload?.message || 'Request failed';
    throw new Error(message);
  }

  return payload?.data ?? payload;
};
