import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Repository } from "../features/repository/respositorySlice";
import { isArray } from "chart.js/helpers";
type CommitActivity = {
  days: number[];
  total?: number;
  week: number;
};
export type Commits = {
  commits: number[];
  color: string;
  id: number;
};
export const githubAPIService = createApi({
  reducerPath: "api", // Unique key for the reducer path
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com", // Base URL for GitHub API
  }),
  endpoints: (builder) => ({
    getCommitActivity: builder.query({
      query: ({ owner, repo, color, id }) => ({
        url: `/repos/${owner}/${repo}/stats/commit_activity`,
        method: "GET",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
        meta: { color, id }, // Include color in the meta object
      }),
      transformResponse: (response: CommitActivity[], _meta, arg): Commits => {
        const res: number[] = new Array(7).fill(0);
        if (!isArray(response)) {
          //error handle
          throw new Error("unable to get commit activity");
        }
        response.forEach((activity) => {
          activity.days.forEach((commit, index) => {
            res[index] += commit;
          });
        });

        return { commits: res, color: arg.color, id: arg.id };
      },
    }),
    
    searchRepos: builder.query<Repository[], string>({
      query: (searchText: string) => ({
        url: `/search/repositories?q=${searchText}`,
        method: "GET",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }),
      transformResponse: (response: { items: Repository[] }) => {
        return response.items;
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetCommitActivityQuery, useSearchReposQuery } =
  githubAPIService;
