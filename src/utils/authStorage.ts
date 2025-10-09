// Authentication storage utilities

interface User {
  email: string;
  password: string;
  walletAddress?: string;
  registeredAt: string;
}

const USERS_KEY = 'landchain_users';
const CURRENT_USER_KEY = 'landchain_current_user';

export const authStorage = {
  // Get all registered users
  getAllUsers(): User[] {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  },

  // Register a new user
  registerUser(email: string, password: string): { success: boolean; message: string } {
    const users = this.getAllUsers();
    
    // Check if user already exists
    if (users.some(u => u.email === email)) {
      return { success: false, message: 'Email already registered' };
    }

    const newUser: User = {
      email,
      password, // In production, this should be hashed!
      registeredAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    return { success: true, message: 'Registration successful' };
  },

  // Login user
  loginUser(email: string, password: string): { success: boolean; message: string; user?: User } {
    const users = this.getAllUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return { success: true, message: 'Login successful', user };
  },

  // Get current logged in user
  getCurrentUser(): User | null {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  // Update current user (e.g., add wallet address)
  updateCurrentUser(updates: Partial<User>): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
      
      // Also update in users list
      const users = this.getAllUsers();
      const index = users.findIndex(u => u.email === currentUser.email);
      if (index !== -1) {
        users[index] = updatedUser;
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      }
    }
  },

  // Logout user
  logoutUser(): void {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};
