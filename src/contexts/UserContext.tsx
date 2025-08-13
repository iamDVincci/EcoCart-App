import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { User, AuthState } from '@/types/index.d.ts';

interface UserContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock user data - would come from API in real app
const mockUser: User = {
  id: '1',
  email: 'john.doe@example.com',
  name: 'John Doe',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
  sustainabilityPreferences: {
    preferredCategories: ['Personal Care', 'Home & Kitchen'],
    carbonNeutralOnly: true,
    localProductsOnly: false,
    maxPriceRange: 100,
    certificationPreferences: ['Fair Trade', 'Organic']
  },
  impactStats: {
    totalCarbonSaved: 45.7,
    totalTreesPlanted: 12,
    totalPlasticReduced: 8.3,
    totalWaterSaved: 234,
    totalOrdersPlaced: 28,
    memberSince: '2023-06-15'
  },
  addresses: [
    {
      id: '1',
      label: 'Home',
      name: 'John Doe',
      street: '123 Eco Street',
      city: 'Green Valley',
      state: 'CA',
      zipCode: '90210',
      country: 'United States',
      isDefault: true
    }
  ],
  paymentMethods: [
    {
      id: '1',
      type: 'credit',
      last4: '4242',
      brand: 'Visa',
      expiryDate: '12/25',
      isDefault: true
    }
  ],
  preferences: {
    newsletter: true,
    orderUpdates: true,
    sustainabilityTips: true,
    personalizedRecommendations: true
  }
};

type UserAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null
};

function userReducer(state: AuthState, action: UserAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        loading: false,
        error: null
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null
      };
    default:
      return state;
  }
}

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Simulate checking for existing session on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // In a real app, this would check for a valid token/session
        const storedUser = localStorage.getItem('ecocart_user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          dispatch({ type: 'SET_USER', payload: user });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - in real app, this would be handled by backend
      if (email === 'john.doe@example.com' && password === 'password') {
        localStorage.setItem('ecocart_user', JSON.stringify(mockUser));
        dispatch({ type: 'SET_USER', payload: mockUser });
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Login failed' });
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new user object
      const newUser: User = {
        ...mockUser,
        id: Date.now().toString(),
        email,
        name,
        impactStats: {
          ...mockUser.impactStats,
          totalCarbonSaved: 0,
          totalTreesPlanted: 0,
          totalPlasticReduced: 0,
          totalWaterSaved: 0,
          totalOrdersPlaced: 0,
          memberSince: new Date().toISOString().split('T')[0]
        }
      };

      localStorage.setItem('ecocart_user', JSON.stringify(newUser));
      dispatch({ type: 'SET_USER', payload: newUser });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Registration failed' });
      throw error;
    }
  };

  const logout = (): void => {
    localStorage.removeItem('ecocart_user');
    dispatch({ type: 'SET_USER', payload: null });
  };

  const updateProfile = async (data: Partial<User>): Promise<void> => {
    if (!state.user) throw new Error('User not authenticated');

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...state.user, ...data };
      localStorage.setItem('ecocart_user', JSON.stringify(updatedUser));
      dispatch({ type: 'UPDATE_USER', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Profile update failed' });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock validation
      if (currentPassword !== 'password') {
        throw new Error('Current password is incorrect');
      }
      
      // In real app, password would be updated on server
      console.log('Password updated successfully');
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Password update failed' });
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const value: UserContextType = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    updatePassword
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
