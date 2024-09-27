import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { editOrder } from "../api/editOrder";

export function useEditOrderMutation(): UseMutationResult<
  void,
  unknown,
  { endpoint: string; deliveryStatus: boolean }
> {
  return useMutation<
    void,
    unknown,
    { endpoint: string; deliveryStatus: boolean }
  >({
    mutationFn: ({ endpoint, deliveryStatus }) =>
      editOrder(endpoint, deliveryStatus),
  });
}
