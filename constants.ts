
export const COLORS = {
  primary: '#1A73E8', // Google Blue
  secondary: '#5F6368',
  accent: '#1A73E8', // Using primary as accent for consistency
  success: '#1E8E3E', // Google Green
  warning: '#F9AB00', // Google Yellow
  danger: '#D93025', // Google Red
};

export const CHART_COLORS = ['#F97316', '#3B82F6', '#10B981', '#8B5CF6', '#FBBF24', '#EF4444'];

export const STATUS_COLORS: { [key: string]: string } = {
  'On Track': 'bg-green-50 text-green-800 border-green-200 dark:bg-green-500/10 dark:text-green-300 dark:border-green-500/20',
  'Delayed': 'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-300 dark:border-yellow-500/20',
  'At Risk': 'bg-red-50 text-red-800 border-red-200 dark:bg-red-500/10 dark:text-red-300 dark:border-red-500/20',
  'Completed': 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/20',
  'Planning': 'bg-purple-50 text-purple-800 border-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/20',
  'Bidding': 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-500/10 dark:text-gray-300 dark:border-gray-500/20'
};

export const ROLE_COLORS: { [key: string]: string } = {
    'Admin': 'bg-red-50 text-red-800 border-red-200 dark:bg-red-500/10 dark:text-red-300 dark:border-red-500/20',
    'Director': 'bg-red-50 text-red-800 border-red-200 dark:bg-red-500/10 dark:text-red-300 dark:border-red-500/20',
    'Project Manager': 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/20',
    'Site Engineer': 'bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-500/10 dark:text-teal-300 dark:border-teal-500/20',
    'Procurement Manager': 'bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-500/10 dark:text-orange-300 dark:border-orange-500/20',
    'Safety Officer': 'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-300 dark:border-yellow-500/20',
    'Viewer': 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-500/10 dark:text-gray-300 dark:border-gray-500/20',
    'Client': 'bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/20',
    'Custom Role': 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-500/10 dark:text-gray-300 dark:border-gray-500/20',
};

export const SEVERITY_COLORS: { [key: string]: string } = {
  'High': 'text-danger',
  'Medium': 'text-warning',
  'Low': 'text-text-secondary',
};
