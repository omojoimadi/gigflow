import React, { useState, useEffect, useCallback } from 'react';
import { ILead, LeadFilters, PaginationData } from '../types';
import {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
  exportLeadsCSV,
} from '../services/leadService';
import LeadCard from '../components/leads/LeadCard';
import LeadFiltersComponent from '../components/leads/LeadFilters';
import LeadForm from '../components/leads/LeadForm';
import Pagination from '../components/leads/Pagination';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';
import Navbar from '../components/layout/Navbar';
import useDebounce from '../hooks/useDebounce';
import toast from 'react-hot-toast';
import { Plus, Download } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [leads, setLeads] = useState<ILead[]>([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState<ILead | null>(null);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [filters, setFilters] = useState<LeadFilters>({
    status: '',
    source: '',
    search: '',
    sort: 'latest',
    page: 1,
  });
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark');
 };
  const debouncedSearch = useDebounce(filters.search, 500);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getLeads({ ...filters, search: debouncedSearch });
      setLeads(response.data || []);
      if (response.pagination) setPagination(response.pagination);
    } catch (error) {
      toast.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
}, [filters, debouncedSearch]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleFilterChange = (newFilters: Partial<LeadFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleCreateLead = async (
    data: Omit<ILead, '_id' | 'createdAt' | 'createdBy'>
  ) => {
    try {
      setFormLoading(true);
      await createLead(data);
      toast.success('Lead created successfully');
      setShowForm(false);
      fetchLeads();
    } catch (error) {
      toast.error('Failed to create lead');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdateLead = async (
    data: Omit<ILead, '_id' | 'createdAt' | 'createdBy'>
  ) => {
    if (!editingLead) return;
    try {
      setFormLoading(true);
      await updateLead(editingLead._id, data);
      toast.success('Lead updated successfully');
      setEditingLead(null);
      fetchLeads();
    } catch (error) {
      toast.error('Failed to update lead');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await deleteLead(id);
      toast.success('Lead deleted successfully');
      fetchLeads();
    } catch (error) {
      toast.error('Failed to delete lead');
    }
  };

  const handleExportCSV = async () => {
    try {
      await exportLeadsCSV();
      toast.success('CSV exported successfully');
    } catch (error) {
      toast.error('Failed to export CSV');
    }
  };

  return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Leads</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Manage and track your sales leads
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
              <Download size={16} />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              <Plus size={16} />
              <span>Add Lead</span>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <LeadFiltersComponent
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {(showForm || editingLead) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                {editingLead ? 'Edit Lead' : 'Add New Lead'}
              </h3>
              <LeadForm
                initial={editingLead || undefined}
                onSubmit={editingLead ? handleUpdateLead : handleCreateLead}
                onCancel={() => {
                  setShowForm(false);
                  setEditingLead(null);
                }}
                loading={formLoading}
              />
            </div>
          </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : leads.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {leads.map((lead) => (
              <LeadCard
                key={lead._id}
                lead={lead}
                onEdit={setEditingLead}
                onDelete={handleDeleteLead}
              />
            ))}
          </div>
        )}

        {pagination && (
          <Pagination
            pagination={pagination}
            onPageChange={(page) => handleFilterChange({ page })}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;