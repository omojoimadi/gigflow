import api from './api';
import { ILead, ApiResponse, LeadFilters } from '../types';

export const getLeads = async (filters: Partial<LeadFilters>): Promise<ApiResponse<ILead[]>> => {
  const params = new URLSearchParams();
  if (filters.status) params.append('status', filters.status);
  if (filters.source) params.append('source', filters.source);
  if (filters.search) params.append('search', filters.search);
  if (filters.sort) params.append('sort', filters.sort);
  if (filters.page) params.append('page', filters.page.toString());
  params.append('limit', '10');

  const response = await api.get(`/leads?${params.toString()}`);
  return response.data;
};

export const getLead = async (id: string): Promise<ILead> => {
  const response = await api.get(`/leads/${id}`);
  return response.data.data;
};

export const createLead = async (
  data: Omit<ILead, '_id' | 'createdAt' | 'createdBy'>
): Promise<ILead> => {
  const response = await api.post('/leads', data);
  return response.data.data;
};

export const updateLead = async (
  id: string,
  data: Partial<ILead>
): Promise<ILead> => {
  const response = await api.put(`/leads/${id}`, data);
  return response.data.data;
};

export const deleteLead = async (id: string): Promise<void> => {
  await api.delete(`/leads/${id}`);
};

export const exportLeadsCSV = async (): Promise<void> => {
  const response = await api.get('/leads/export', { responseType: 'blob' });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'leads.csv');
  document.body.appendChild(link);
  link.click();
  link.remove();
};