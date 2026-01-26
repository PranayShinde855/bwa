import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast, ToastSeverity } from '../models/Toast';


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  public toasts$ = this.toastsSubject.asObservable();

  private toastId = 0;

  show(
    message: string,
    title: string = '',
    severity: ToastSeverity = 'info',
    duration: number = 3000,
    sticky = false
  ): number {
    const id = ++this.toastId;
    const toast: Toast = { id, title, message, severity, duration, sticky };

    const currentToasts = this.toastsSubject.value;
    this.toastsSubject.next([...currentToasts, toast]);

    if (!sticky && duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }

    return id;
  }

  success(message: string, title: string = 'Success'): number {
    return this.show(message, title, 'success', 5000);
  }

  error(message: string, title: string = 'Error'): number {
    return this.show(message, title, 'error', 0, true); // sticky
  }

  info(message: string, title: string = 'Info'): number {
    return this.show(message, title, 'info', 4000);
  }

  warn(message: string, title: string = 'Warning'): number {
    return this.show(message, title, 'warning', 4000);
  }

  remove(id: number): void {
    const currentToasts = this.toastsSubject.value;
    const updatedToasts = currentToasts.filter(t => t.id !== id);
    this.toastsSubject.next(updatedToasts);
  }

  clearAll(): void {
    this.toastsSubject.next([]);
  }
}   