export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'sales';
  token: string;
}

export interface ILead {
  _id: string;
  name: string;
  email: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
  source: 'Website' | 'Instagram' | 'Referral';
  createdAt: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: PaginationData;
}

export interface LeadFilters {
  status: string;
  source: string;
  search: string;
  sort: 'latest' | 'oldest';
  page: number;
}