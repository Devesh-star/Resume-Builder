export const BASE_URL = 'https://resume-backend-gsv8.onrender.com';

export const API_PATHS = {
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    GOOGLE_LOGIN: '/api/auth/google-login',
    GET_PROFILE: '/api/auth/profile',
  },

  RESUME: {
    CREATE: '/api/resume',
    GET_ALL: '/api/resume',
    GET_BY_ID: (id) => `/api/resume/${id}`,
    UPDATE: (id) => `/api/resume/${id}`,
    DELETE: (id) => `/api/resume/${id}`,
    UPLOAD_IMAGES: (id) => `/api/resume/${id}/upload-images`,
    PARSE_PDF: '/api/resume/parse-pdf',
  },

  IMAGE: {
    UPLOAD_IMAGE: '/api/auth/upload-image',
  },
};
