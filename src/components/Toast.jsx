import { createRoot } from "react-dom/client";
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from "lucide-react";

class ToastManager {
  constructor() {
    this.container = null;
    this.toasts = [];
    this.init();
  }

  init() {
    if (!this.container) {
      this.container = document.createElement("div");
      this.container.id = "toast-container";
      this.container.className = "fixed top-4 right-4 space-y-2 z-[99999]";
      document.body.appendChild(this.container);
    }
  }

  show(message, type = "info", duration = 3000) {
    const id = Date.now() + Math.random();
    const toast = { id, message, type, duration };
    this.toasts.push(toast);

    const toastElement = document.createElement("div");
    this.container.appendChild(toastElement);

    const root = createRoot(toastElement);
    root.render(this.renderToast(toast, () => this.remove(id)));

    if (duration > 0) {
      setTimeout(() => {
        this.remove(id);
      }, duration);
    }

    return id;
  }

  success(message, duration = 3000) {
    return this.show(message, "success", duration);
  }

  error(message, duration = 5000) {
    return this.show(message, "error", duration);
  }

  warning(message, duration = 4000) {
    return this.show(message, "warning", duration);
  }

  info(message, duration = 3000) {
    return this.show(message, "info", duration);
  }

  remove(id) {
    const index = this.toasts.findIndex((toast) => toast.id === id);
    if (index > -1) {
      this.toasts.splice(index, 1);

      const toastElement = this.container.querySelector(
        `[data-toast-id="${id}"]`
      );
      if (toastElement) {
        toastElement.remove();
      }
    }
  }

  renderToast(toast, onRemove) {
    const getToastStyles = () => {
      switch (toast.type) {
        case "success":
          return {
            bgClass: "bg-success text-success-content",
            icon: <CheckCircle className="w-5 h-5" />,
          };
        case "error":
          return {
            bgClass: "bg-error text-error-content",
            icon: <AlertCircle className="w-5 h-5" />,
          };
        case "warning":
          return {
            bgClass: "bg-warning text-warning-content",
            icon: <AlertTriangle className="w-5 h-5" />,
          };
        case "info":
        default:
          return {
            bgClass: "bg-info text-info-content",
            icon: <Info className="w-5 h-5" />,
          };
      }
    };

    const styles = getToastStyles();

    return (
      <div
        data-toast-id={toast.id}
        className={`${styles.bgClass} rounded-lg shadow-lg p-4 min-w-80 max-w-md transform transition-all duration-300 ease-in-out animate-slide-in z-[9999]`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">{styles.icon}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium leading-5">{toast.message}</p>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={onRemove}
              className="inline-flex text-current hover:opacity-70 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  clear() {
    this.toasts.forEach((toast) => this.remove(toast.id));
  }
}

const toast = new ToastManager();

export default toast;
