import { useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown, Building2, Mail, Calendar, CheckCircle, AlertCircle, Power, PowerOff } from "lucide-react";

export default function EnterpriseTable({ enterprises, onEnterpriseClick }) {
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });

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

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedEnterprises = [...enterprises].sort((a, b) => {
    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (sortConfig.key === "createdAt") {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ChevronsUpDown className="w-4 h-4" />;
    }
    return sortConfig.direction === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  if (enterprises.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">Henüz hiç şirket bulunmamaktadır</div>
        <div className="text-gray-400 text-sm">Yeni şirket eklemek için yukarıdaki "Yeni Şirket" butonunu kullanın</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr className="bg-base-200">
            <th className="cursor-pointer hover:bg-base-300 transition-colors" onClick={() => handleSort("title")}>
              <div className="flex items-center gap-2">
                Şirket Adı
                {getSortIcon("title")}
              </div>
            </th>
            <th className="cursor-pointer hover:bg-base-300 transition-colors" onClick={() => handleSort("balance")}>
              <div className="flex items-center gap-2">
                Bakiye
                {getSortIcon("balance")}
              </div>
            </th>
            <th className="cursor-pointer hover:bg-base-300 transition-colors" onClick={() => handleSort("createdAt")}>
              <div className="flex items-center gap-2">
                Oluşturulma Tarihi
                {getSortIcon("createdAt")}
              </div>
            </th>
            <th className="cursor-pointer hover:bg-base-300 transition-colors" onClick={() => handleSort("verified")}>
              <div className="flex items-center gap-2">
                Doğrulandı
                {getSortIcon("verified")}
              </div>
            </th>
            <th className="cursor-pointer hover:bg-base-300 transition-colors" onClick={() => handleSort("disabled")}>
              <div className="flex items-center gap-2">
                Aktif
                {getSortIcon("disabled")}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedEnterprises.map((enterprise) => (
            <tr key={enterprise.id} className="hover:bg-base-100 cursor-pointer transition-colors" onClick={() => onEnterpriseClick(enterprise)}>
              <td className="font-medium">
                <div className="flex items-center gap-3">
                  <div className="avatar avatar-placeholder">
                    <div className="bg-primary text-primary-content rounded-full w-10">
                      <Building2 className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{enterprise.title}</div>
                    <div className="text-sm opacity-50 flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {enterprise.email}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <span className={`font-bold ${enterprise.balance >= 0 ? "text-success" : "text-error"}`}>{formatBalance(enterprise.balance)}</span>
              </td>
              <td className="text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(enterprise.createdAt)}
                </div>
              </td>
              <td>
                <div className={`badge ${enterprise.verified ? "badge-success" : "badge-warning"}`}>
                  {enterprise.verified ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Evet
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Hayır
                    </>
                  )}
                </div>
              </td>
              <td>
                <div className={`badge ${enterprise.disabled ? "badge-error" : "badge-success"}`}>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
