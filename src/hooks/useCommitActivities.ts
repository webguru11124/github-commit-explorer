import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectRepos } from "../app/store";
import { Commits, githubAPIService } from "../app/api/githubAPIService";
import { Repository } from "../app/features/repository/respositorySlice";
import { useSnackbar } from "notistack";

export const useCommitActivities = () => {
  const { enqueueSnackbar } = useSnackbar();
  const repos: Repository[] = useSelector(selectRepos);
  const [commitActivities, setCommitActivities] = useState<Array<Commits>>([]);
  const [trigger, { error }] = githubAPIService.useLazyGetCommitActivityQuery();

  useEffect(() => {
    async function fetchCommitActivities() {
      const activities: Array<Commits> = await Promise.all(
        repos.map((repo) =>
          trigger({
            owner: repo.owner.login,
            repo: repo.name,
            color: repo.color,
            id: repo.id,
          }).unwrap()
        )
      );
      setCommitActivities(activities);
    }
    fetchCommitActivities();
  }, [repos, trigger]);

  if (error && "message" in error) {
    console.log("error", error);
    enqueueSnackbar(`Error: ${error.message ?? ""}`, {
      variant: "error",
    });
  }
  return { commitActivities, error };
};
