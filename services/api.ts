import { useAuthStore } from '@/stores/authStore';

const API_BASE_URL = 'https://your-api.com/api';

class ApiService {
  private getAuthHeaders() {
    const token = useAuthStore.getState().token;
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired, logout user
        useAuthStore.getState().logout();
      }
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }

  // Chat endpoints
  async getChats() {
    return this.request('/chats');
  }

  async getChatMessages(chatId: string) {
    return this.request(`/chats/${chatId}/messages`);
  }

  async sendMessage(chatId: string, message: string) {
    return this.request(`/chats/${chatId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  // Group endpoints
  async getGroups() {
    return this.request('/groups');
  }

  async createGroup(name: string, participants: string[]) {
    return this.request('/groups', {
      method: 'POST',
      body: JSON.stringify({ name, participants }),
    });
  }

  // Meeting endpoints
  async getMeetings() {
    return this.request('/meetings');
  }

  async createMeeting(title: string, scheduledTime: string) {
    return this.request('/meetings', {
      method: 'POST',
      body: JSON.stringify({ title, scheduledTime }),
    });
  }

  // Notification endpoints
  async getNotifications() {
    return this.request('/notifications');
  }

  async markNotificationRead(notificationId: string) {
    return this.request(`/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  }
}

export const apiService = new ApiService();