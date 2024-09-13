import { useQuery } from "@tanstack/react-query";
import { getData } from "../api/getData";

export function useGetData(endpoints: string, id?: string) {
  return useQuery({
    queryKey: [endpoints, id],
    queryFn: () => getData(endpoints, id),
  });
}
