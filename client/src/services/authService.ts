import api from './api';
import { IUser } from '../types';

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  role: 'admin' | 'sales'
): Promise<IUser> => {
  const response = await api.post('/auth/register', { name, email, password, role });
  return response.data.data;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<IUser> => {
  const response = await api.post('/auth/login', { email, password });
  return response.data.data;
};

export const getMe = async (): Promise<IUser> => {
  const response = await api.get('/auth/me');
  return response.data.data;
};