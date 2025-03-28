import { mainApi } from "../../apis";

export const getProductsAdmin = async (filters: any, token: string) => {
  try {
    let queryString = `/products/admin?page=${filters.page}&limit=${filters.limit ?? 8
      }`;
    // Agregar los parámetros a la cadena de consulta solo si tienen un valor no vacío
    if (filters.search) queryString += `&search=${filters.search}`;
    if (filters.collection) queryString += `&collection=${filters.collection}`;
    if (filters.category) queryString += `&category=${filters.category}`;
    if (filters.tag) queryString += `&tag=${filters.tag}`;
    if (filters.date) queryString += `&date=${filters.date}`;
    if (filters.score) queryString += `&score=${filters.score}`;

    if (filters.section2 === "status") {
      if (filters.status) queryString += `&status=${filters.status}`;
    } else if (filters.section2 === "mostSold") {
      if (filters.mostSold) queryString += `&mostSold=${filters.mostSold}`;
    } else if (filters.section2 === "featured") {
      if (filters.featured) queryString += `&featured=${filters.featured}`;
    }

    if (filters.order) queryString += `&order=${filters.order}`;

    const response = await mainApi.get(queryString, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getOneProduct = async (id: string, token: string) => {
  try {
    const response = await mainApi.get(`/products/admin/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error getting product:", error);
    throw error;
  }
}

export const createProduct = async (data: any, token: string) => {
  try {
    const response = await mainApi.post(`/products/admin`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (id: string, data: any, token: string) => {
  try {
    const response = await mainApi.patch(`/products/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id: string, token: string) => {
  try {
    const response = await mainApi.delete(`/products/admin/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const loadExcelProducts = async (excel: string, token: string) => {
  try {
    const response = await mainApi.post(
      "/excel-products",
      { url: excel },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

export const getExcelProducts = async (token: string) => {
  try {
    const response = await mainApi.get("/excel-products", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadFolder = async (
  files: File[],
  folderName: string
): Promise<any> => {
  try {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    const response = await mainApi.post(
      `/files/uploadFolder?folderName=${folderName}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading folder:", error);
  }
};

export const getProductTitles = async (): Promise<any> => {
  try {
    const { data } = await mainApi.get(`/products/all/productsName`);
    return data;
  } catch (error) {
    console.error("Error getting product titles:", error);
  }
}