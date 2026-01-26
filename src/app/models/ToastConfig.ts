export interface ToastConfig {
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center';
  maxToasts?: number;
  preventDuplicates?: boolean;
}