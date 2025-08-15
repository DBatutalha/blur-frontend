import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Phone, Mail, Wallet, FileText, MapPin, CheckCircle, AlertCircle, Info } from "lucide-react";
import { enterpriseFormSchema } from "../utils/validation-schemas";

export default function EnterpriseForm({ onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting, touchedFields },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(enterpriseFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      phone: "",
      email: "",
      balance: "",
      address: "",
      taxNumber: "",
      taxProvince: "",
      taxDistrict: "",
    },
  });

  const watchedFields = watch();

  const onSubmitForm = (data) => {
    const enterpriseData = {
      ...data,
      balance: parseFloat(data.balance),
      taxAddress: {
        province: data.taxProvince,
        district: data.taxDistrict,
      },
    };
    onSubmit(enterpriseData);
    reset();
  };

  const getFieldStatus = (fieldName) => {
    if (errors[fieldName]) return "error";
    if (touchedFields[fieldName] && watchedFields[fieldName]) return "success";
    return "default";
  };

  const getStatusIcon = (fieldName) => {
    const status = getFieldStatus(fieldName);
    if (status === "error") return <AlertCircle className="w-4 h-4 text-error" />;
    if (status === "success") return <CheckCircle className="w-4 h-4 text-success" />;
    return null;
  };

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, "");

    if (digits.startsWith("90") && digits.length <= 12) {
      return digits;
    }

    return digits;
  };

  const formatTaxNumber = (value) => {
    const digits = value.replace(/\D/g, "");
    return digits.slice(0, 10);
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue("phone", formatted, { shouldValidate: true });
  };

  const handleTaxNumberChange = (e) => {
    const formatted = formatTaxNumber(e.target.value);
    setValue("taxNumber", formatted, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div className="card bg-base-50 border border-base-200">
        <div className="card-body p-4">
          <h3 className="card-title text-lg flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-primary" />
            Şirket Bilgileri
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label mb-1 flex justify-between items-center">
                <span className="label-text font-medium">Şirket Adı *</span>
                <span className="label-text-alt text-gray-500">{watchedFields.title?.length || 0}/100</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("title")}
                  className={`input input-bordered w-full pr-10 ${getFieldStatus("title") === "error" ? "input-error" : getFieldStatus("title") === "success" ? "input-success" : ""}`}
                  placeholder="Şirket adını giriniz"
                  maxLength={100}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">{getStatusIcon("title")}</div>
              </div>
              {errors.title && (
                <span className="text-error text-sm flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label mb-1 flex justify-between items-center">
                <span className="label-text font-medium">Bakiye *</span>
                <span className="label-text-alt text-gray-500">{watchedFields.balance?.toString().split(".")[1]?.length || 0}/2 ondalık</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  {...register("balance")}
                  className={`input input-bordered w-full pr-10 ${getFieldStatus("balance") === "error" ? "input-error" : getFieldStatus("balance") === "success" ? "input-success" : ""}`}
                  placeholder="0.00"
                  min="0"
                  max="999999999.99"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">{getStatusIcon("balance")}</div>
              </div>
              {errors.balance && (
                <span className="text-error text-sm flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.balance.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-50 border border-base-200">
        <div className="card-body p-4">
          <h3 className="card-title text-lg flex items-center gap-2 mb-4">
            <Phone className="w-5 h-5 text-secondary" />
            İletişim Bilgileri
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label mb-1 flex justify-between items-center">
                <span className="label-text font-medium">Telefon *</span>
                <span className="label-text-alt text-gray-500">{watchedFields.phone?.length || 0}/12</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  {...register("phone")}
                  onChange={handlePhoneChange}
                  className={`input input-bordered w-full pr-10 ${getFieldStatus("phone") === "error" ? "input-error" : getFieldStatus("phone") === "success" ? "input-success" : ""}`}
                  placeholder="905xxxxxxxxxx"
                  maxLength={12}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">{getStatusIcon("phone")}</div>
              </div>
              {errors.phone && (
                <span className="text-error text-sm flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label mb-1 flex justify-between items-center">
                <span className="label-text font-medium">E-posta *</span>
                <span className="label-text-alt text-gray-500">{watchedFields.email?.length || 0}/100</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...register("email")}
                  className={`input input-bordered w-full pr-10 ${getFieldStatus("email") === "error" ? "input-error" : getFieldStatus("email") === "success" ? "input-success" : ""}`}
                  placeholder="ornek@email.com"
                  maxLength={100}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">{getStatusIcon("email")}</div>
              </div>
              {errors.email && (
                <span className="text-error text-sm flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-50 border border-base-200">
        <div className="card-body p-4">
          <h3 className="card-title text-lg flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-accent" />
            Vergi Bilgileri
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-control">
              <label className="label mb-1 flex justify-between items-center">
                <span className="label-text font-medium">Vergi Numarası *</span>
                <span className="label-text-alt text-gray-500">{watchedFields.taxNumber?.length || 0}/10</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("taxNumber")}
                  onChange={handleTaxNumberChange}
                  className={`input input-bordered w-full pr-10 ${getFieldStatus("taxNumber") === "error" ? "input-error" : getFieldStatus("taxNumber") === "success" ? "input-success" : ""}`}
                  placeholder="xxxxxxxxxx"
                  maxLength={10}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">{getStatusIcon("taxNumber")}</div>
              </div>
              {errors.taxNumber && (
                <span className="text-error text-sm flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.taxNumber.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label mb-1 flex justify-between items-center">
                <span className="label-text font-medium">Vergi Dairesi İli *</span>
                <span className="label-text-alt text-gray-500">{watchedFields.taxProvince?.length || 0}/50</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("taxProvince")}
                  className={`input input-bordered w-full pr-10 ${getFieldStatus("taxProvince") === "error" ? "input-error" : getFieldStatus("taxProvince") === "success" ? "input-success" : ""}`}
                  placeholder="İl adı"
                  maxLength={50}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">{getStatusIcon("taxProvince")}</div>
              </div>
              {errors.taxProvince && (
                <span className="text-error text-sm flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.taxProvince.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label mb-1 flex justify-between items-center">
                <span className="label-text font-medium">Vergi Dairesi İlçesi *</span>
                <span className="label-text-alt text-gray-500">{watchedFields.taxDistrict?.length || 0}/50</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("taxDistrict")}
                  className={`input input-bordered w-full pr-10 ${getFieldStatus("taxDistrict") === "error" ? "input-error" : getFieldStatus("taxDistrict") === "success" ? "input-success" : ""}`}
                  placeholder="İlçe adı"
                  maxLength={50}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">{getStatusIcon("taxDistrict")}</div>
              </div>
              {errors.taxDistrict && (
                <span className="text-error text-sm flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.taxDistrict.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-50 border border-base-200">
        <div className="card-body p-4">
          <h3 className="card-title text-lg flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-warning" />
            Adres Bilgileri
          </h3>
          <div className="form-control">
            <label className="label mb-1 flex justify-between items-center">
              <span className="label-text font-medium">Şirket Adresi *</span>
              <span className="label-text-alt text-gray-500">{watchedFields.address?.length || 0}/500</span>
            </label>
            <div className="relative">
              <textarea
                {...register("address")}
                className={`textarea textarea-bordered h-20 pr-10 w-full ${
                  getFieldStatus("address") === "error" ? "textarea-error" : getFieldStatus("address") === "success" ? "textarea-success" : ""
                }`}
                placeholder="Şirket adresini detaylı olarak giriniz"
                maxLength={500}
              />
              <div className="absolute top-3 right-3 pointer-events-none">{getStatusIcon("address")}</div>
            </div>
            {errors.address && (
              <span className="text-error text-sm flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                {errors.address.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="card bg-base-50 border border-base-200">
        <div className="card-body p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-base-content/70 flex items-center gap-2">
              <Info className="w-4 h-4" />
              <span>Form doğru doldurulduğunda "Onay" butonu aktif olacaktır</span>
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={onCancel} className="btn btn-outline btn-sm" disabled={isSubmitting}>
                İptal
              </button>
              <button type="submit" className={`btn btn-primary btn-sm ${!isValid || isSubmitting ? "btn-disabled" : "hover:bg-primary-focus"}`} disabled={!isValid || isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Onay
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
