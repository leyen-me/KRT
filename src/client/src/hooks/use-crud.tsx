import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchRequest } from "@/utils/apiUtils";
import { useState } from "react";
import { IResult } from "@app/result";

interface UseCrudOptions<T, Q extends Record<string, any>> {
  baseUrl: string;
  listUrl?: string;
  pageUrl?: string;
  deleteUrl?: string;
  isPage?: boolean;
  primaryKey?: string;
  defaultQueryForm?: Q;
  defaultPage?: number;
  defaultLimit?: number;
  onQuerySuccess?: (data: T[]) => void;
  onQueryError?: (error: Error) => void;
  onQuerySettled?: () => void;
}

interface PaginationState {
  page: number;
  limit: number;
  total: number;
}

export function useCrud<
  T,
  Q extends Record<string, any> = Record<string, any>
>({
  baseUrl,
  listUrl = `${baseUrl}/list`,
  pageUrl = `${baseUrl}/page`,
  deleteUrl = `${baseUrl}/delete`,
  isPage = true,
  primaryKey = "id",
  defaultQueryForm = {} as Q,
  defaultPage = 1,
  defaultLimit = 10,
  onQuerySuccess,
  onQueryError,
  onQuerySettled,
}: UseCrudOptions<T, Q>) {
  const queryClient = useQueryClient();
  const [queryForm, setQueryForm] = useState<Q>(defaultQueryForm);
  const [pagination, setPagination] = useState<PaginationState>({
    page: defaultPage,
    limit: defaultLimit,
    total: 0,
  });
  const [sort, setSort] = useState({ field: "", order: "" });

  // List/Page Query
  const { data, isLoading: loading } = useQuery<T>({
    queryKey: ["crud", baseUrl, queryForm, pagination, sort],
    queryFn: async () => {
      const url = isPage ? pageUrl : listUrl;
      const params = {
        ...queryForm,
        ...(isPage && {
          pageNo: pagination.page,
          pageSize: pagination.limit,
        }),
        ...(sort.field && {
          order: sort.field,
          asc: sort.order === "asc",
        }),
      };

      const response = await fetchRequest(url, {
        method: "GET",
        params,
      });

      if (isPage) {
        setPagination((prev) => ({
          ...prev,
          total: response.data.total,
        }));
        return response.data;
      }
      return response.data;
    },
  });

  // Create/Update Mutation
  const { mutateAsync: save } = useMutation({
    mutationFn: async (formData: Partial<T>) => {
      const method = (formData as any)[primaryKey] ? "PUT" : "POST";
      return await fetchRequest(baseUrl, {
        method,
        body: formData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crud", baseUrl] });
    },
  });

  // Delete Mutation
  const { mutateAsync: remove } = useMutation({
    mutationFn: async (id: string | number) => {
      return await fetchRequest(`${deleteUrl}?id=${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crud", baseUrl] });
    },
  });

  // Batch Delete Mutation
  const { mutateAsync: batchRemove } = useMutation({
    mutationFn: async (ids: (string | number)[]) => {
      return await fetchRequest(deleteUrl, {
        method: "DELETE",
        body: ids,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["crud", baseUrl] });
    },
  });

  // Get Detail Query
  const getDetail = async (id: string | number) => {
    return await fetchRequest(`${baseUrl}/${id}`, {
      method: "GET",
    });
  };

  const onPageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  const onLimitChange = (limit: number) => {
    setPagination((prev) => ({ ...prev, page: 1, limit }));
  };

  const onSortChange = (field: string, order: "asc" | "desc") => {
    setSort({ field, order });
  };

  const resetQueryForm = () => {
    setQueryForm(defaultQueryForm);
    setPagination({
      page: defaultPage,
      limit: defaultLimit,
      total: 0,
    });
    setSort({ field: "", order: "" });
  };

  return {
    // Data
    data,
    loading,
    pagination,
    queryForm,

    // Actions
    save,
    remove,
    batchRemove,
    getDetail,

    // Query Form
    setQueryForm,
    resetQueryForm,

    // Pagination
    onPageChange,
    onLimitChange,

    // Sorting
    onSortChange,
  };
}
