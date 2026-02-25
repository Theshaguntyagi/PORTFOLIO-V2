// API Service for all backend communications
const API_BASE_URL = 'http://localhost:8080/api';

const api = {
  // Generic GET request
  async get(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('API GET Error:', error);
      throw error;
    }
  },

  // Generic POST request
  async post(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  },

  // Generic PUT request
  async put(endpoint, data) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('API PUT Error:', error);
      throw error;
    }
  },

  // Generic DELETE request
  async delete(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return true;
    } catch (error) {
      console.error('API DELETE Error:', error);
      throw error;
    }
  },

  // Skills endpoints
  skills: {
    getAll: () => api.get('/skills'),
    getById: (id) => api.get(`/skills/${id}`),
    create: (data) => api.post('/skills', data),
    update: (id, data) => api.put(`/skills/${id}`, data),
    delete: (id) => api.delete(`/skills/${id}`),
  },

  // Education endpoints
  education: {
    getAll: () => api.get('/education'),
    getById: (id) => api.get(`/education/${id}`),
    create: (data) => api.post('/education', data),
    update: (id, data) => api.put(`/education/${id}`, data),
    delete: (id) => api.delete(`/education/${id}`),
  },

  // Experience endpoints
  experience: {
    getAll: () => api.get('/experience'),
    getById: (id) => api.get(`/experience/${id}`),
    create: (data) => api.post('/experience', data),
    update: (id, data) => api.put(`/experience/${id}`, data),
    delete: (id) => api.delete(`/experience/${id}`),
  },

  // Projects endpoints
  projects: {
    getAll: () => api.get('/projects'),
    getByCategory: (category) => api.get(`/projects/category/${category}`),
    getById: (id) => api.get(`/projects/${id}`),
    create: (data) => api.post('/projects', data),
    update: (id, data) => api.put(`/projects/${id}`, data),
    delete: (id) => api.delete(`/projects/${id}`),
  },

  // Contact endpoints
  contacts: {
    getAll: () => api.get('/contacts'),
    getUnread: () => api.get('/contacts/unread'),
    getById: (id) => api.get(`/contacts/${id}`),
    create: (data) => api.post('/contacts', data),
    markAsRead: (id) => api.put(`/contacts/${id}/read`, {}),
    delete: (id) => api.delete(`/contacts/${id}`),
  },

  // Blog endpoints
  blogs: {
    getAll: () => api.get('/blogs'),
    getById: (id) => api.get(`/blogs/${id}`),
    create: (data) => api.post('/blogs', data),
    update: (id, data) => api.put(`/blogs/${id}`, data),
    delete: (id) => api.delete(`/blogs/${id}`),
  },

  // Chat endpoints
  chat: {
    sendMessage: (sessionId, message) => 
      api.post('/chat/message', { sessionId, message }),
    getHistory: (sessionId) => api.get(`/chat/history/${sessionId}`),
    getSession: (sessionId) => api.get(`/chat/session/${sessionId}`),
    clearHistory: (sessionId) => api.delete(`/chat/history/${sessionId}`),
    createSession: () => api.post('/chat/session/new', {}),
  },
};

export default api;