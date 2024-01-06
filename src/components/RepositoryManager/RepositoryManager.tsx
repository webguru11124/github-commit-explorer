import { Box } from "@mui/material";
import { RepositoryButton } from "../RepositoryButton/RepositoryButton";
import { RepositorySearchButton } from "../RepositorySearchButton/RepositorySearchButton";
import {
  selectLoading,
  selectLoadingCount,
  selectRepos,
} from "../../app/store";

import { useDispatch, useSelector } from "react-redux";
import { selectHovered } from "../../app/store";
import { setHovered } from "../../app/features/repository/respositorySlice";
import { useRepositoryAction } from "../../app/hooks/useRespositoryAction";
export const RepositoryManager = () => {
  const repos = useSelector(selectRepos);
  const { removeRepo } = useRepositoryAction();

  const dispatch = useDispatch();
  const hovered = useSelector(selectHovered);
  const loading = useSelector(selectLoading);
  const loadingCount = useSelector(selectLoadingCount);
  return (
    <Box
      px={3}
      py={10}
      sx={(theme) => ({
        backgroundColor: theme.palette.grey[600],
      })}
      height="100vh"
    >
      <RepositorySearchButton />
      <Box mt={2.5}>
        {repos.map((repo) => (
          <Box mt={2} key={repo.id}>
            <RepositoryButton
              repo={repo}
              ishovered={hovered === repo.id || hovered === null}
              onClick={(repo) => removeRepo(repo)}
              onHover={(id) => dispatch(setHovered(id))}
            ></RepositoryButton>
          </Box>
        ))}
        {loading
          ? Array(loadingCount)
              .fill(null)
              .map((_, index) => (
                <Box mt={2} key={index}>
                  <RepositoryButton loading={true} />
                </Box>
              ))
          : null}
      </Box>
    </Box>
  );
};
