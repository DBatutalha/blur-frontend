import { useState, useEffect, useRef } from "react";
import EnterpriseForm from "../components/EnterpriseForm";
import EnterpriseTable from "../components/EnterpriseTable";
import EnterpriseDetailModal from "../components/EnterpriseDetailModal";
import { createEnterprise, getEnterprises, toggleEnterpriseStatus, deleteEnterprise, getEnterpriseById } from "../requests/enterprise-requests";
import { Plus, AlertCircle, X, Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import toast from "../components/Toast";

export default function Enterprises() {
  const [enterprises, setEnterprises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnterprise, setSelectedEnterprise] = useState(null);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingEnterpriseDetails, setLoadingEnterpriseDetails] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const createModalRef = useRef(null);
  const detailModalRef = useRef(null);

  useEffect(() => {
    loadEnterprises(currentPage, pageSize, searchTerm);
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (selectedEnterprise && detailModalRef.current) {
      setTimeout(() => {
        if (detailModalRef.current) {
          detailModalRef.current.showModal();
        }
      }, 0);
    }
  }, [selectedEnterprise]);

  const loadEnterprises = async (page = currentPage, size = pageSize, search = searchTerm) => {
    try {
      setLoading(true);

      const response = await getEnterprises(page, size, search);

      if (response && response.data && response.data.enterprises) {
        setEnterprises(response.data.enterprises);
        setTotalItems(response.data.pagination?.totalCount || 0);
        setTotalPages(response.data.pagination?.totalPages || 0);
      } else if (response && response.enterprises) {
        setEnterprises(response.enterprises);
        setTotalItems(response.pagination?.totalCount || 0);
        setTotalPages(response.pagination?.totalPages || 0);
      } else {
        setEnterprises([]);
        setTotalItems(0);
        setTotalPages(0);
      }
      setError(null);
    } catch {
      setEnterprises([]);
      setTotalItems(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    if (createModalRef.current) {
      createModalRef.current.showModal();
    }
  };

  const closeCreateModal = () => {
    if (createModalRef.current) {
      createModalRef.current.close();
    }
  };

  const handleCreateEnterprise = async (enterpriseData) => {
    try {
      await createEnterprise(enterpriseData);
      
      closeCreateModal();
      toast.success("Şirket başarıyla oluşturuldu!");
      
      await loadEnterprises(currentPage, pageSize, searchTerm);
    } catch (err) {
      const errorMessage = err.message || "Şirket oluşturulurken bir hata oluştu";
      toast.error(errorMessage);
    }
  };

  const handleEnterpriseClick = async (enterprise) => {
    try {
      setLoadingEnterpriseDetails(true);
      const fullEnterprise = await getEnterpriseById(enterprise.id);
      setSelectedEnterprise(fullEnterprise);
    } catch (err) {
      const errorMessage = err.message || "Şirket detayları yüklenirken bir hata oluştu";
      toast.error(errorMessage);
    } finally {
      setLoadingEnterpriseDetails(false);
    }
  };

  const handleToggleStatus = async (id, disabled) => {
    try {
      await toggleEnterpriseStatus(id, disabled);

      await loadEnterprises(currentPage, pageSize, searchTerm);
      
      if (selectedEnterprise && selectedEnterprise.id === id) {
        setSelectedEnterprise((prev) => ({ ...prev, disabled }));
      }
    } catch (err) {
      const errorMessage = err.message || "Durum değiştirilirken bir hata oluştu";
      toast.error(errorMessage);
    }
  };

  const handleDeleteEnterprise = async (id) => {
    try {
      await deleteEnterprise(id);

      await loadEnterprises(currentPage, pageSize, searchTerm);

      if (totalPages > 0 && currentPage > totalPages) {
        setCurrentPage(1);
        await loadEnterprises(1, pageSize, searchTerm);
      }

      if (selectedEnterprise && selectedEnterprise.id === id) {
        setSelectedEnterprise(null);
      }
    } catch (err) {
      const errorMessage = err.message || "Şirket silinirken bir hata oluştu";
      toast.error(errorMessage);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
    loadEnterprises(1, pageSize, "");
  };

  const handleSearchSubmit = () => {
    setCurrentPage(1);
    loadEnterprises(1, pageSize, searchTerm);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageSizeChange = (e) => {
    const newPageSize = parseInt(e.target.value);
    setPageSize(newPageSize);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content">Şirketler</h1>
          <p className="text-base-content/60 mt-2">Sistemdeki tüm şirketleri görüntüleyin ve yönetin</p>
        </div>

        <button onClick={openCreateModal} className="btn btn-primary">
          <Plus className="w-5 h-5" />
          Yeni Şirket
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          <AlertCircle className="w-6 h-6" />
          <span>{error}</span>
          <button className="btn btn-sm btn-ghost" onClick={() => setError(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="card bg-base-100 shadow-sm">
        <div className="card-body p-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Şirket adı, e-posta, telefon, vergi numarası veya adres ile arama yapın..."
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={(e) => e.key === "Enter" && handleSearchSubmit()}
                className="input input-bordered w-full pr-10"
              />
              {searchTerm && (
                <button onClick={clearSearch} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            <button onClick={handleSearchSubmit} className="btn btn-primary">
              <Search className="h-4 w-4 mr-2" />
              Ara
            </button>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h2 className="card-title">Şirket Listesi</h2>
            {loadingEnterpriseDetails && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="loading loading-spinner loading-sm"></span>
                Detaylar yükleniyor...
              </div>
            )}
          </div>
          <EnterpriseTable enterprises={enterprises} onEnterpriseClick={handleEnterpriseClick} />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t">
            <div className="text-sm text-gray-600">
              {searchTerm ? (
                <>
                  <span className="font-medium">{totalItems}</span> sonuç bulundu
                  {totalItems > 0 && (
                    <>
                      {" "}
                      (Sayfa {currentPage} / {totalPages})
                    </>
                  )}
                </>
              ) : (
                <>
                  Toplam <span className="font-medium">{totalItems}</span> şirket
                  {totalItems > 0 && (
                    <>
                      {" "}
                      (Sayfa {currentPage} / {totalPages})
                    </>
                  )}
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sayfa başına:</span>
                <select value={pageSize} onChange={handlePageSizeChange} className="select select-bordered select-sm w-20">
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>

              {totalPages > 1 && (
                <div className="join">
                  <button onClick={goToFirstPage} disabled={currentPage === 1} className="join-item btn btn-sm">
                    <ChevronsLeft className="w-4 h-4" />
                  </button>
                  <button onClick={goToPreviousPage} disabled={currentPage === 1} className="join-item btn btn-sm">
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {getPageNumbers().map((page, index) => (
                    <button
                      key={index}
                      onClick={() => typeof page === "number" && goToPage(page)}
                      disabled={page === "..."}
                      className={`join-item btn btn-sm ${page === currentPage ? "btn-active" : page === "..." ? "btn-disabled" : ""}`}>
                      {page}
                    </button>
                  ))}

                  <button onClick={goToNextPage} disabled={currentPage === totalPages} className="join-item btn btn-sm">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button onClick={goToLastPage} disabled={currentPage === totalPages} className="join-item btn btn-sm">
                    <ChevronsRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <dialog ref={createModalRef} id="create-enterprise-modal" className="modal">
        <div className="modal-box max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-2xl">Yeni Şirket Ekle</h3>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost">
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>

          <EnterpriseForm onSubmit={handleCreateEnterprise} onCancel={closeCreateModal} />
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {selectedEnterprise && (
        <EnterpriseDetailModal ref={detailModalRef} enterprise={selectedEnterprise} onClose={() => setSelectedEnterprise(null)} onToggleStatus={handleToggleStatus} onDelete={handleDeleteEnterprise} />
      )}
    </div>
  );
}
