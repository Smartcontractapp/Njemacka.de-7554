// Admin users - u produkciji bi ovo bilo u bazi podataka
export const adminUsers = [
  {
    id: 1,
    username: "Administrator",
    email: "admin@njemacka.com",
    password: "Herzogenaurach7",
    role: "super_admin",
    name: "Administrator",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    username: "editor",
    email: "editor@njemacka.com",
    password: "editor123",
    role: "editor",
    name: "Urednik",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face"
  }
];

// Admin state management
export const adminState = {
  currentUser: null,
  isAuthenticated: false,
  
  login: (username, password) => {
    const user = adminUsers.find(u => u.username === username && u.password === password);
    if (user) {
      adminState.currentUser = user;
      adminState.isAuthenticated = true;
      localStorage.setItem('adminToken', btoa(JSON.stringify(user)));
      return true;
    }
    return false;
  },
  
  logout: () => {
    adminState.currentUser = null;
    adminState.isAuthenticated = false;
    localStorage.removeItem('adminToken');
  },
  
  checkAuth: () => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      try {
        const user = JSON.parse(atob(token));
        adminState.currentUser = user;
        adminState.isAuthenticated = true;
        return true;
      } catch (e) {
        adminState.logout();
        return false;
      }
    }
    return false;
  }
};