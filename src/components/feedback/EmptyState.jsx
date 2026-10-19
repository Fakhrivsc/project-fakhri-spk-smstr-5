import React from 'react';
import { Inbox } from 'lucide-react';
import Button from '../ui/Button';

export default function EmptyState({
  icon: Icon = Inbox,
  title = 'Belum Ada Data',
  description = 'Data saat ini masih kosong atau belum tersedia dalam sistem.',
  actionLabel,
  onAction,
  className = ''
}) {
  return (
    <div className={`empty-state ${className}`}>
      <div className="empty-state-icon">
        <Icon size={28} />
      </div>
      <h4 className="empty-state-title">{title}</h4>
      <p className="empty-state-desc">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
