import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { deleteData } from "../api/deleteData";

export function useDeleteMutation(): UseMutationResult<void, unknown, string> {
  return useMutation<void, unknown, string>({
    mutationFn: (endpoint: string) => deleteData(endpoint),
  });
}
