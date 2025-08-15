import { z } from "zod";

export const enterpriseFormSchema = z.object({
  title: z.string().min(1, "Şirket adı zorunludur").min(2, "Şirket adı en az 2 karakter olmalıdır").max(100, "Şirket adı en fazla 100 karakter olabilir").trim(),

  phone: z
    .string()
    .min(1, "Telefon numarası zorunludur")
    .regex(/^90[0-9]{10}$/, "Telefon numarası 90 ile başlamalı ve 12 haneli olmalıdır")
    .trim(),

  email: z.string().min(1, "E-posta adresi zorunludur").email("Geçerli bir e-posta adresi giriniz").max(100, "E-posta adresi çok uzun").toLowerCase().trim(),

  balance: z
    .string()
    .min(1, "Bakiye zorunludur")
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
      message: "Bakiye 0 veya daha büyük olmalıdır",
    })
    .refine(
      (val) => {
        const num = parseFloat(val);
        return Number.isFinite(num) && (num.toString().split(".")[1]?.length || 0) <= 2;
      },
      {
        message: "Bakiye en fazla iki ondalık basamaklı olmalıdır",
      }
    )
    .refine(
      (val) => {
        const num = parseFloat(val);
        return num <= 999999999.99;
      },
      {
        message: "Bakiye çok yüksek",
      }
    ),

  address: z.string().min(1, "Adres zorunludur").min(10, "Adres en az 10 karakter olmalıdır").max(500, "Adres çok uzun").trim(),

  taxNumber: z
    .string()
    .min(1, "Vergi numarası zorunludur")
    .regex(/^[0-9]{10}$/, "Vergi numarası 10 haneli olmalıdır")
    .trim(),

  taxProvince: z.string().min(1, "Vergi dairesi ili zorunludur").min(2, "İl adı en az 2 karakter olmalıdır").max(50, "İl adı çok uzun").trim(),

  taxDistrict: z.string().min(1, "Vergi dairesi ilçesi zorunludur").min(2, "İlçe adı en az 2 karakter olmalıdır").max(50, "İlçe adı çok uzun").trim(),
});

export const validateEnterpriseData = (data) => {
  try {
    return { success: true, data: enterpriseFormSchema.parse(data) };
  } catch (error) {
    return { success: false, errors: error.errors };
  }
};

export const getFieldValidationRules = (fieldName) => {
  const rules = {
    title: {
      minLength: 2,
      maxLength: 100,
      pattern: null,
    },
    phone: {
      minLength: 12,
      maxLength: 12,
      pattern: "^90[0-9]{10}$",
    },
    email: {
      minLength: 1,
      maxLength: 100,
      pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    },
    balance: {
      min: 0,
      max: 999999999.99,
      step: 0.01,
    },
    taxNumber: {
      minLength: 10,
      maxLength: 10,
      pattern: "^[0-9]{10}$",
    },
    address: {
      minLength: 10,
      maxLength: 500,
    },
    taxProvince: {
      minLength: 2,
      maxLength: 50,
    },
    taxDistrict: {
      minLength: 2,
      maxLength: 50,
    },
  };

  return rules[fieldName] || {};
};
