import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getData } from "../api/getData";

export function useGetData<T>(endpoints: string): UseQueryResult<Partial<T>> {
  return useQuery<Partial<T>>({
    queryKey: [endpoints],
    queryFn: () => getData<T>(endpoints),
    enabled: !!endpoints,
  });
}
