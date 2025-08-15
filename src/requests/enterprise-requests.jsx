import { simpleAPICall } from "../utils/requesting";

const BASE_URL = "http://localhost:5153/api/enterprises";

export const createEnterprise = async (enterpriseData) => {
  const apiData = {
    title: enterpriseData.title,
    phone: enterpriseData.phone,
    email: enterpriseData.email,
    balance: enterpriseData.balance,
    address: enterpriseData.address,
    taxNumber: enterpriseData.taxNumber,
    taxProvince: enterpriseData.taxProvince,
    taxDistrict: enterpriseData.taxDistrict,
  };

  return simpleAPICall({
    endpoint: `${BASE_URL}/create`,
    body: JSON.stringify(apiData),
    options: {
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
};

export const getEnterprises = async (page = 1, pageSize = 5, search = "") => {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  if (search && search.trim()) {
    params.append("search", search.trim());
  }

  return simpleAPICall({
    endpoint: `${BASE_URL}/list?${params}`,
    method: "GET",
  });
};

export const getEnterpriseById = async (id) => {
  return simpleAPICall({
    endpoint: `${BASE_URL}/${id}`,
    method: "GET",
  });
};

export const toggleEnterpriseStatus = async (id, disabled) => {
  const formData = new FormData();
  formData.append("disabled", disabled);

  return simpleAPICall({
    endpoint: `${BASE_URL}/${id}/toggle-status`,
    body: formData,
    method: "PATCH",
  });
};

export const deleteEnterprise = async (id) => {
  return simpleAPICall({
    endpoint: `${BASE_URL}/${id}/delete`,
    method: "DELETE",
  });
};
