import { useState, forwardRef } from "react";
import {
  X,
  Phone,
  Mail,
  Wallet,
  FileText,
  MapPin,
  Calendar,
  Hash,
  Power,
  PowerOff,
  Trash2,
  CheckCircle,
  AlertCircle,
  Building2,
  Globe,
  Shield,
} from "lucide-react";
import ConfirmationModal from "./ConfirmationModal";
import toast from "./Toast";

const EnterpriseDetailModal = forwardRef(
  ({ enterprise, onClose, onToggleStatus, onDelete }, ref) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showStatusConfirm, setShowStatusConfirm] = useState(false);

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    };

    const formatBalance = (balance) => {
      return new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(balance);
    };

    const handleDeleteClick = () => {
      if (ref?.current) {
        ref.current.close();
      }
      setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = async () => {
      setIsDeleting(true);
      try {
        await onDelete(enterprise.id);
        toast.success("Şirket başarıyla silindi");
        setShowDeleteConfirm(false);
        if (onClose) {
          onClose();
        }
      } catch (error) {
        const errorMessage =
          error.message || "Şirket silinirken bir hata oluştu";
        toast.error(errorMessage);
        if (ref?.current) {
          ref.current.showModal();
        }
      } finally {
        setIsDeleting(false);
      }
    };

    const handleDeleteCancel = () => {
      setShowDeleteConfirm(false);
      if (ref?.current) {
        ref.current.showModal();
      }
    };

    const handleToggleStatusClick = () => {
      if (ref?.current) {
        ref.current.close();
      }
      setShowStatusConfirm(true);
    };

    const handleToggleStatusConfirm = async () => {
      try {
        await onToggleStatus(enterprise.id, !enterprise.disabled);
        setShowStatusConfirm(false);
        toast.success(
          `Şirket ${
            enterprise.disabled ? "aktifleştirildi" : "pasifleştirildi"
          }`
        );
        if (ref?.current) {
          ref.current.showModal();
        }
      } catch (error) {
        const errorMessage =
          error.message || "Durum değiştirilirken bir hata oluştu";
        toast.error(errorMessage);
        if (ref?.current) {
          ref.current.showModal();
        }
      }
    };

    const handleToggleStatusCancel = () => {
      setShowStatusConfirm(false);
      if (ref?.current) {
        ref.current.showModal();
      }
    };

    const getStatusConfirmConfig = () => {
      if (enterprise.disabled) {
        return {
          title: "Şirketi Aktifleştir",
          message: `${enterprise.title} şirketini aktif hale getirmek istediğinizden emin misiniz?`,
          type: "success",
          confirmText: "Aktifleştir",
          icon: <Power className="w-8 h-8 text-success" />,
        };
      } else {
        return {
          title: "Şirketi Pasifleştir",
          message: `${enterprise.title} şirketini pasif hale getirmek istediğinizden emin misiniz?`,
          type: "warning",
          confirmText: "Pasifleştir",
          icon: <PowerOff className="w-8 h-8 text-warning" />,
        };
      }
    };

    return (
      <>
        <dialog ref={ref} id="enterprise-detail-modal" className="modal">
          <div className="modal-box max-w-3xl">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="avatar avatar-placeholder">
                  <div className="bg-primary text-primary-content rounded-xl w-16 h-16 flex items-center justify-center">
                    <Building2 className="w-8 h-8" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-2xl text-base-content leading-tight">
                    {enterprise.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div
                      className={`badge badge-sm ${
                        enterprise.disabled ? "badge-error" : "badge-success"
                      }`}
                    >
                      {enterprise.disabled ? (
                        <>
                          <PowerOff className="w-3 h-3 mr-1" />
                          Pasif
                        </>
                      ) : (
                        <>
                          <Power className="w-3 h-3 mr-1" />
                          Aktif
                        </>
                      )}
                    </div>
                    <div
                      className={`badge badge-sm ${
                        enterprise.verified ? "badge-success" : "badge-warning"
                      }`}
                    >
                      {enterprise.verified ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Doğrulandı
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Doğrulanmadı
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <form method="dialog">
                <button
                  type="button"
                  onClick={() => {
                    if (onClose) {
                      onClose();
                    }
                  }}
                  className="btn btn-sm btn-circle btn-ghost hover:bg-base-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="card bg-base-50 border border-base-200">
                  <div className="card-body p-4">
                    <h4 className="card-title text-base flex items-center gap-2 mb-3">
                      <Globe className="w-4 h-4 text-primary" />
                      İletişim Bilgileri
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Phone className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-base-content/60 font-medium">
                            Telefon
                          </div>
                          <a
                            href={`tel:${enterprise.phone}`}
                            className="text-sm font-mono text-primary hover:text-primary-focus hover:underline transition-colors cursor-pointer"
                          >
                            {enterprise.phone}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                          <Mail className="w-4 h-4 text-secondary" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-base-content/60 font-medium">
                            E-posta
                          </div>
                          <a
                            href={`mailto:${enterprise.email}`}
                            className="text-sm text-secondary hover:text-secondary-focus hover:underline transition-colors cursor-pointer"
                          >
                            {enterprise.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-base-50 border border-base-200">
                  <div className="card-body p-4">
                    <h4 className="card-title text-base flex items-center gap-2 mb-3">
                      <Wallet className="w-4 h-4 text-success" />
                      Finansal Bilgiler
                    </h4>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success mb-1">
                        {formatBalance(enterprise.balance)}
                      </div>
                      <div className="text-xs text-base-content/60">
                        Güncel Bakiye
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="card bg-base-50 border border-base-200">
                  <div className="card-body p-4">
                    <h4 className="card-title text-base flex items-center gap-2 mb-3">
                      <FileText className="w-4 h-4 text-accent" />
                      Vergi Bilgileri
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                          <Hash className="w-4 h-4 text-accent" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-base-content/60 font-medium">
                            Vergi Numarası
                          </div>
                          <div className="text-sm font-mono">
                            {enterprise.taxNumber}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-accent" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-base-content/60 font-medium">
                            Vergi Dairesi
                          </div>
                          <div className="text-sm">
                            {enterprise.taxAddress.province} /{" "}
                            {enterprise.taxAddress.district}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card bg-base-50 border border-base-200">
                  <div className="card-body p-4">
                    <h4 className="card-title text-base flex items-center gap-2 mb-3">
                      <Shield className="w-4 h-4 text-info" />
                      Sistem Bilgileri
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-info/10 rounded-lg flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-info" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-base-content/60 font-medium">
                            Oluşturulma
                          </div>
                          <div className="text-sm">
                            {formatDate(enterprise.createdAt)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-info/10 rounded-lg flex items-center justify-center">
                          <Hash className="w-4 h-4 text-info" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-base-content/60 font-medium">
                            Sistem ID
                          </div>
                          <div className="text-xs font-mono text-base-content/70 truncate">
                            {enterprise.id}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="card bg-base-50 border border-base-200">
                <div className="card-body p-4">
                  <h4 className="card-title text-base flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-warning" />
                    Şirket Adresi
                  </h4>
                  <div className="bg-base-100 p-3 rounded-lg border border-base-200">
                    <p className="text-sm whitespace-pre-line leading-relaxed">
                      {enterprise.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 mt-6 border-t border-base-200">
              <div className="flex gap-2">
                <button
                  onClick={handleToggleStatusClick}
                  className={`btn btn-sm ${
                    enterprise.disabled ? "btn-success" : "btn-warning"
                  }`}
                >
                  {enterprise.disabled ? (
                    <>
                      <Power className="w-4 h-4 mr-2" />
                      Aktifleştir
                    </>
                  ) : (
                    <>
                      <PowerOff className="w-4 h-4 mr-2" />
                      Pasifleştir
                    </>
                  )}
                </button>
                <button
                  onClick={handleDeleteClick}
                  disabled={isDeleting}
                  className="btn btn-sm btn-error"
                >
                  {isDeleting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Siliniyor...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Sil
                    </>
                  )}
                </button>
              </div>

              <form method="dialog">
                <button
                  type="button"
                  onClick={() => {
                    if (onClose) {
                      onClose();
                    }
                  }}
                  className="btn btn-sm btn-outline"
                >
                  Kapat
                </button>
              </form>
            </div>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button
              type="button"
              onClick={() => {
                if (onClose) {
                  onClose();
                }
              }}
            >
              close
            </button>
          </form>
        </dialog>

        <ConfirmationModal
          isOpen={showDeleteConfirm}
          title="Şirketi Sil"
          message={`"${enterprise.title}" şirketini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`}
          type="danger"
          confirmText="Evet, Sil"
          cancelText="İptal"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          isLoading={isDeleting}
          loadingText="Siliniyor..."
        />

        <ConfirmationModal
          isOpen={showStatusConfirm}
          {...getStatusConfirmConfig()}
          onConfirm={handleToggleStatusConfirm}
          onCancel={handleToggleStatusCancel}
        />
      </>
    );
  }
);

EnterpriseDetailModal.displayName = "EnterpriseDetailModal";

export default EnterpriseDetailModal;
