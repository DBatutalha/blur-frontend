import { forwardRef } from "react";
import { AlertTriangle, CheckCircle, Trash2 } from "lucide-react";

const ConfirmationModal = forwardRef(
  (
    {
      isOpen,
      title,
      message,
      confirmText = "Onayla",
      cancelText = "İptal",
      type = "danger", // danger, warning, success
      icon,
      onConfirm,
      onCancel,
      isLoading = false,
      loadingText = "İşleniyor...",
    },
    ref
  ) => {
    if (!isOpen) return null;

    const getTypeStyles = () => {
      switch (type) {
        case "danger":
          return {
            icon: <Trash2 className="w-8 h-8 text-error" />,
            confirmButton: "btn-error",
            titleColor: "text-error",
          };
        case "warning":
          return {
            icon: <AlertTriangle className="w-8 h-8 text-warning" />,
            confirmButton: "btn-warning",
            titleColor: "text-warning",
          };
        case "success":
          return {
            icon: <CheckCircle className="w-8 h-8 text-success" />,
            confirmButton: "btn-success",
            titleColor: "text-success",
          };
        default:
          return {
            icon: <AlertTriangle className="w-8 h-8 text-info" />,
            confirmButton: "btn-info",
            titleColor: "text-info",
          };
      }
    };

    const getActionIcon = () => {
      if (icon) return icon;

      switch (type) {
        case "danger":
          return <Trash2 className="w-8 h-8 text-error" />;
        case "warning":
          return <AlertTriangle className="w-8 h-8 text-warning" />;
        case "success":
          return <CheckCircle className="w-8 h-8 text-success" />;
        default:
          return <AlertTriangle className="w-8 h-8 text-info" />;
      }
    };

    const styles = getTypeStyles();

    const handleConfirm = async () => {
      if (onConfirm) {
        await onConfirm();
      }
    };

    const handleCancel = () => {
      if (onCancel) {
        onCancel();
      }
    };

    return (
      <dialog ref={ref} className="modal modal-open">
        <div className="modal-box max-w-md">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex justify-center">{getActionIcon()}</div>

            <h3 className={`font-bold text-xl ${styles.titleColor}`}>{title}</h3>

            <p className="text-base-content/70 text-sm leading-relaxed">{message}</p>

            <div className="flex gap-3 w-full pt-4">
              <button onClick={handleCancel} disabled={isLoading} className="btn btn-outline flex-1">
                {cancelText}
              </button>

              <button onClick={handleConfirm} disabled={isLoading} className={`btn ${styles.confirmButton} flex-1`}>
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    {loadingText}
                  </>
                ) : (
                  confirmText
                )}
              </button>
            </div>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    );
  }
);

ConfirmationModal.displayName = "ConfirmationModal";

export default ConfirmationModal;
