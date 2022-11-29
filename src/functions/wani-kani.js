import { swrHook } from "/src/functions/use-swr-wrapper";
import useSWRImmutable from "swr/immutable";
import { fetcherNoLogging } from "/src/functions/api_client/fetcher";

export const useWaniKaniAssignments = (apiToken) => {
  const { data, loading, error } = swrHook(useSWRImmutable(
      !!apiToken ? 'https://api.wanikani.com/v2/assignments' : null, (url) => fetcherNoLogging(url, { Authorization: `Bearer ${apiToken}` })
  ));
  console.log(data, loading, error);
  return { assignments: data?.data, loadingAssignments: loading, assignmentsError: error };
}