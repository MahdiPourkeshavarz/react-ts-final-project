import { useMutation } from "@tanstack/react-query";
import { API_ROUTES } from "../constants";

export function useEditProductMutation() {
  return useMutation({
    mutationFn: (product) => updateProduct(product),
    onMutate: () => {
      console.log("done");
    },
  });
}
