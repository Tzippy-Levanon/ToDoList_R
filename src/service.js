import axios from 'axios';

//default- כ api- הגדרת כתובת ה
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5218';

// לטיפול בשגיאות interceptor הוספת
axios.interceptors.response.use(
  response => response, // אם אין שגיאה, מחזירים את ה-response כמות שהוא
 error => {
    console.error("API Error:", {
      status: error.response?.status || "Network Error",
      data: error.response?.data || "No response received",
      url: error.config?.url,
    });

    alert(error)
    // מחזירים ערך ברירת מחדל כדי למנוע קריסה
    return Promise.resolve({ data: null, error: true });
  }
);

export default {
  getTasks: async () => {
    const result = await axios.get(`/Tasks`)
    return result.data;
  },

  addTask: async (name) => {
    console.log('addTask', name)
    const newTask = { name, isComplete: false }
    const result = await axios.post(`/Tasks`, newTask)
    return result.data;
  },

  updateTask: async (id,name, isComplete) => {
    console.log('updateTask', { id, isComplete })
    const result = await axios.patch(`/Tasks/${id}`, { name,isComplete })
    return result.data;
  },

  deleteTask: async (id) => {
    const result = await axios.delete(`/Tasks/${id}`, id)
    return result.data;
  }
};
