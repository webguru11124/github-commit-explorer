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
      try {
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
      } catch (error) {
        if (error) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          enqueueSnackbar(`Error: ${error.message ?? ""} `, {
            variant: "error",
          });
        }
      }
    }
    fetchCommitActivities();
  }, [enqueueSnackbar, repos, trigger]);

  return { commitActivities, error };
};
