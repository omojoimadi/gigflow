import React from 'react';
import { Inbox } from 'lucide-react';

interface Props {
  message?: string;
}

const EmptyState: React.FC<Props> = ({ message = 'No leads found' }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
      <Inbox size={48} className="mb-4" />
      <p className="text-lg font-medium">{message}</p>
      <p className="text-sm mt-1">Try adjusting your filters or add a new lead</p>
    </div>
  );
};

export default EmptyState;