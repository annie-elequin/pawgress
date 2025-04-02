const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface User {
  id: string;
  email: string;
  name: string;
}

interface Dog {
  id: string;
  name: string;
  breed: string;
  birthdate: string;
  userId: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface ApiError {
  error: string;
}

class ApiClient {
  private token: string | null = null;

  constructor() {
    // Initialize token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');

    if (this.token) {
      headers.set('Authorization', `Bearer ${this.token}`);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.error || 'An error occurred');
    }

    return response.json();
  }

  // Auth methods
  async signup(email: string, password: string, name: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    this.setToken(response.token);
    return response;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(response.token);
    return response;
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  private setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  // User methods
  async getUser(id: string): Promise<User> {
    return this.request<User>(`/api/users/${id}`);
  }

  // Pet methods
  async createPet(name: string, type: string, breed?: string, birthdate?: string): Promise<any> {
    return this.request('/api/pets', {
      method: 'POST',
      body: JSON.stringify({ name, type, breed, birthdate }),
    });
  }

  async getPet(id: string): Promise<any> {
    return this.request(`/api/pets/${id}`);
  }

  // Activity methods
  async createActivity(type: string, petId: string, scheduledFor: string, notes?: string): Promise<any> {
    return this.request('/api/activities', {
      method: 'POST',
      body: JSON.stringify({ type, petId, scheduledFor, notes }),
    });
  }

  async completeActivity(id: string): Promise<any> {
    return this.request(`/api/activities/${id}/complete`, {
      method: 'PATCH',
    });
  }

  // Dog methods
  async createDog(data: { name: string; breed: string; birthdate: string }): Promise<Dog> {
    return this.request<Dog>('/api/dogs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getDog(id: string): Promise<Dog> {
    return this.request<Dog>(`/api/dogs/${id}`);
  }

  async getDogs(): Promise<Dog[]> {
    return this.request<Dog[]>('/api/dogs');
  }
}

export const api = new ApiClient(); 