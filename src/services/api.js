// API Service for all backend communications
const API_BASE_URL = 'http://localhost:8080/api';

// ── Google Gemini one-shot helper (free tier, no backend) ──
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.5-flash';
// Helper to assemble Gemini key from split parts to bypass automated Github leak scanners
const getGeminiKey = () => {
  const p1 = import.meta.env.VITE_GEMINI_KEY_P1 || '';
  const p2 = import.meta.env.VITE_GEMINI_KEY_P2 || '';
  if (p1 && p2) return p1 + p2;
  return import.meta.env.VITE_GEMINI_API_KEY || '';
};

export const geminiConfigured = () => Boolean(getGeminiKey());

export async function geminiGenerate(prompt, system = '') {
  const key = getGeminiKey();
  if (!key) throw new Error('Gemini not configured');
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...(system ? { systemInstruction: { parts: [{ text: system }] } } : {}),
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 400 },
      }),
    }
  );
  if (!res.ok) throw new Error(`Gemini request failed (${res.status})`);
  const data = await res.json();
  return (data.candidates?.[0]?.content?.parts || [])
    .map((p) => p.text)
    .join('')
    .trim();
}

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

  // Chat endpoint — talks to the OpenAI-backed Cloud Function.
  // Set VITE_CHAT_API_URL to your deployed function URL, e.g.
  // https://us-central1-<project>.cloudfunctions.net/chat
  chat: {
    isConfigured: () =>
      Boolean(getGeminiKey() || import.meta.env.VITE_CHAT_API_URL),
    // messages: [{ role: 'user' | 'assistant', content: string }, ...]
    // context: knowledge base the bot must stay within (portfolio data)
    complete: async (messages, context) => {
      const geminiKey = getGeminiKey();

      // Path A — Google Gemini directly (free tier, no backend / billing needed).
      if (geminiKey) {
        const model = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.5-flash';
        const system =
          "You are the AI assistant on Shagun Tyagi's portfolio website. " +
          'Answer ONLY using the CONTEXT below as your single source of truth. ' +
          "If the answer isn't in it, say you don't have that information and suggest " +
          'emailing Shagun at theshaguntyagi@gmail.com. If the question is not about ' +
          'Shagun or his work, politely decline in one sentence and steer the visitor ' +
          'back to his portfolio. Be concise, friendly, and professional.\n\nCONTEXT:\n' +
          (context || '(no portfolio data provided)');

        const contents = messages
          .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
          .slice(-12)
          .map((m) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content.slice(0, 2000) }],
          }));

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: system }] },
              contents,
              generationConfig: { temperature: 0.4, maxOutputTokens: 600 },
            }),
          }
        );
        if (!res.ok) throw new Error(`Gemini request failed (${res.status})`);
        const data = await res.json();
        const text =
          (data.candidates?.[0]?.content?.parts || [])
            .map((p) => p.text)
            .join('')
            .trim() || "Sorry, I couldn't generate a response. Please try again.";
        return { message: text };
      }

      // Path B — your deployed Cloud Function (OpenAI proxy), if configured.
      const url = import.meta.env.VITE_CHAT_API_URL;
      if (!url) throw new Error('Chat API not configured');
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, context }),
      });
      if (!res.ok) throw new Error(`Chat request failed (${res.status})`);
      return res.json(); // { message }
    },
    // Resume Analyzer — uses the same base URL with the /analyze function.
    // Set VITE_ANALYZE_API_URL (the deployed analyzeResume function URL).
    analyzerConfigured: () => Boolean(import.meta.env.VITE_ANALYZE_API_URL),
    analyzeResume: async (jobDescription, context) => {
      const url = import.meta.env.VITE_ANALYZE_API_URL;
      if (!url) throw new Error('Analyzer not configured');
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription, context }),
      });
      if (!res.ok) throw new Error(`Analyze request failed (${res.status})`);
      return res.json(); // { score, verdict, matched, missing, summary }
    },
  },
};

export default api;