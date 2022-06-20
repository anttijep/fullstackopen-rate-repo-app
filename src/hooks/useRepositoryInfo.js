import { useQuery } from "@apollo/client";
import { GET_REPOSITORY_INFO } from "../graphql/queries";

const useRepositoryInfo = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(
    GET_REPOSITORY_INFO,
    {
      fetchPolicy: "cache-and-network",
      variables,
    }
  );
  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        ...variables,
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };
  return {
    repository: data?.repository,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepositoryInfo;
