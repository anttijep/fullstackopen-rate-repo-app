import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";

const useCurrentUser = (variables, fetchPolicy) => {
  const { data, loading, fetchMore, ...rest } = useQuery(GET_CURRENT_USER, {
    variables,
    fetchPolicy,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.me.reviews?.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        ...variables,
        after: data.me.reviews.pageInfo.endCursor,
      },
    });
  };

  return { user: data?.me, loading, fetchMore: handleFetchMore, ...rest};
};

export default useCurrentUser;
