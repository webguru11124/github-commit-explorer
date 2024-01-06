import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  Repository,
  add,
  remove,
  resetRepos,
  setLoading,
} from "../features/repository/respositorySlice";
import { generateColorFromRepositoryId } from "../../helpers/color";
import { githubAPIService } from "../api/githubAPIService";
import React from "react";

export function useRepositoryAction() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [trigger] = githubAPIService.useLazySearchReposQuery();

  // interact with the cache in the same way as you would with a useFetch...() hook

  const fetchRepos = React.useCallback(async () => {
    dispatch(setLoading(true));
    const existingRepoNames = (searchParams.get("repoNames") ?? "")
      .split(",")
      .filter((repo) => repo !== "");

    try {
      const repos: Array<Repository[]> = await Promise.all(
        existingRepoNames.map((name) => trigger(`repo:${name}`).unwrap())
      );
      dispatch(
        resetRepos(
          repos
            .filter((repo) => repo.length > 0)
            .map((repo) => ({
              ...repo[0],
              color: generateColorFromRepositoryId(repo[0].id),
            }))
        )
      );
    } catch (error) {
      if (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        enqueueSnackbar(`Error: ${error.message ?? ""} `, {
          variant: "error",
        });
      }
    }
  }, []);

  const removeRepo = React.useCallback((repo: Repository) => {
    dispatch(remove(repo.id));
    const existingRepoNames = (searchParams.get("repoNames") ?? "")
      .split(",")
      .filter((repo) => repo !== "");

    // Add the new repository ID to the list
    const updatedRepoNames: string[] = existingRepoNames.filter(
      (name) => name !== repo.full_name
    );
    setSearchParams({ repoNames: updatedRepoNames.join(",") });
  }, []);

  const addRepo = React.useCallback((newValue: Repository) => {
    dispatch(
      add({
        ...newValue,
        color: generateColorFromRepositoryId(newValue.id),
      })
    );
    const existingRepoNames = (searchParams.get("repoNames") ?? "")
      .split(",")
      .filter((repo) => repo != "");

    // Add the new repository ID to the list
    const updatedRepoNames: string[] = [
      ...existingRepoNames,
      newValue.full_name,
    ];
    // Update the URL with the new repository Names
    setSearchParams({ repoNames: updatedRepoNames.join(",") });
  }, []);
  return { removeRepo, addRepo, fetchRepos };
}
