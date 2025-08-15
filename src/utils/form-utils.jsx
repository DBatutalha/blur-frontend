export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const formatPhoneForDisplay = (phone) => {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("90") && digits.length === 12) {
    return digits;
  }
  return phone;
};

export const formatTaxNumberForDisplay = (taxNumber) => {
  if (!taxNumber) return "";
  const digits = taxNumber.replace(/\D/g, "");
  if (digits.length === 10) {
    return digits;
  }
  return taxNumber;
};

export const formatBalanceForDisplay = (balance) => {
  if (balance === null || balance === undefined) return "0.00";
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(balance);
};

export const isValidTurkishPhone = (phone) => {
  const phoneRegex = /^90[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ""));
};

export const isValidTurkishTaxNumber = (taxNumber) => {
  const taxRegex = /^[0-9]{10}$/;
  return taxRegex.test(taxNumber.replace(/\D/g, ""));
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getFieldValidationStatus = (fieldName, value, errors, touchedFields) => {
  if (errors[fieldName]) return "error";
  if (touchedFields[fieldName] && value && value.trim()) return "success";
  return "default";
};

export const getCharacterCount = (value, maxLength) => {
  const current = value?.length || 0;
  const remaining = maxLength - current;
  return { current, remaining, isOverLimit: remaining < 0 };
};

export const sanitizeFormData = (data) => {
  const sanitized = {};
  Object.keys(data).forEach((key) => {
    if (typeof data[key] === "string") {
      sanitized[key] = data[key].trim();
    } else {
      sanitized[key] = data[key];
    }
  });
  return sanitized;
};

export const isFormComplete = (data, requiredFields) => {
  return requiredFields.every((field) => {
    const value = data[field];
    if (typeof value === "string") {
      return value.trim().length > 0;
    }
    return value !== null && value !== undefined;
  });
};

export const getFormCompletionPercentage = (data, requiredFields) => {
  const completed = requiredFields.filter((field) => {
    const value = data[field];
    if (typeof value === "string") {
      return value.trim().length > 0;
    }
    return value !== null && value !== undefined;
  }).length;

  return Math.round((completed / requiredFields.length) * 100);
};
