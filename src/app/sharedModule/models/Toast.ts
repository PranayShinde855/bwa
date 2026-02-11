export type ToastSeverity = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: number;
  title: string;
  message: string;
  severity: ToastSeverity;
  duration?: number;
  sticky?: boolean;
}