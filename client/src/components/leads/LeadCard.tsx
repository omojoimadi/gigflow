import React from 'react';
import { ILead } from '../../types';
import { Pencil, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Props {
  lead: ILead;
  onEdit: (lead: ILead) => void;
  onDelete: (id: string) => void;
}

const statusColors: Record<ILead['status'], string> = {
  New: 'bg-blue-100 text-blue-700',
  Contacted: 'bg-yellow-100 text-yellow-700',
  Qualified: 'bg-green-100 text-green-700',
  Lost: 'bg-red-100 text-red-700',
};

const sourceColors: Record<ILead['source'], string> = {
  Website: 'bg-purple-100 text-purple-700',
  Instagram: 'bg-pink-100 text-pink-700',
  Referral: 'bg-orange-100 text-orange-700',
};

const LeadCard: React.FC<Props> = ({ lead, onEdit, onDelete }) => {
  const { user } = useAuth();

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white">{lead.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{lead.email}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(lead)}
            className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <Pencil size={15} />
          </button>
          {user?.role === 'admin' && (
            <button
              onClick={() => onDelete(lead._id)}
              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2 mt-3">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[lead.status]}`}>
          {lead.status}
        </span>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${sourceColors[lead.source]}`}>
          {lead.source}
        </span>
      </div>
      <p className="text-xs text-gray-400 mt-3">
        Added by {lead.createdBy?.name} · {new Date(lead.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default LeadCard;