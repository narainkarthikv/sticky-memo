export class DateService {
  static calculateDaysRemaining(dueDate) {
    if (!dueDate) return null;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    
    const differenceInTime = due.getTime() - today.getTime();
    return Math.ceil(differenceInTime / (1000 * 3600 * 24));
  }

  static getDueDateStatus(daysRemaining) {
    if (daysRemaining === null) return 'default';
    if (daysRemaining < 0) return 'error';
    if (daysRemaining <= 2) return 'warning';
    return 'success';
  }

  static formatDateDisplay(date, daysRemaining) {
    if (!date) return 'Not set';
    
    if (daysRemaining === 0) return 'Today';
    if (daysRemaining === 1) return 'Tomorrow';
    if (daysRemaining === -1) return 'Yesterday';
    if (daysRemaining > 0) return `${daysRemaining}d remaining`;
    return `${Math.abs(daysRemaining)}d overdue`;
  }
}
