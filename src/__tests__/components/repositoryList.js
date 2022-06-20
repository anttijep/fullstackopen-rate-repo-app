import { render, within } from "@testing-library/react-native";
import { RepositoryListContainer } from "../../components/RepositoryList";
import { numberToString } from "../../utils/util";
import { NativeRouter } from "react-router-native";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          startCursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
        },
        edges: [
          {
            node: {
              id: "jaredpalmer.formik",
              fullName: "jaredpalmer/formik",
              description: "Build forms in React, without the tears",
              language: "TypeScript",
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars2.githubusercontent.com/u/4060187?v=4",
            },
            cursor: "WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd",
          },
          {
            node: {
              id: "async-library.react-async",
              fullName: "async-library/react-async",
              description: "Flexible promise-based React data loader",
              language: "JavaScript",
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                "https://avatars1.githubusercontent.com/u/54310907?v=4",
            },
            cursor:
              "WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==",
          },
        ],
      };

      const curtest = render(
        <NativeRouter>
          <RepositoryListContainer repositories={repositories} />
        </NativeRouter>
      );
      const nodes = repositories.edges.map((e) => e.node);
      const repItem = curtest.getAllByTestId("repositoryItem");
      for (const r of repItem) {
        const node = nodes.find(
          (n) => within(r).queryAllByText(n.fullName).length
        );
        expect(node).not.toBeNull();
        const avatarImg = within(r).getByTestId("repositoryItemImage");
        expect(avatarImg.props.source.uri).toBe(node.ownerAvatarUrl);
        for (const [k, v] of Object.entries(node)) {
          if (k === "ownerAvatarUrl" || k === "id") {
            continue;
          }
          const str = typeof v === "number" ? numberToString(v) : v;
          expect(within(r).getByText(str)).toBeDefined();
        }
      }
    });
  });
});
