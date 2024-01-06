import { Box } from "@mui/material";
import { RepositoryButton } from "../RepositoryButton/RepositoryButton";
import { RepositorySearchButton } from "../RepositorySearchButton/RepositorySearchButton";
import { useSelector } from "react-redux";
import { selectRepos } from "../../app/store";

export const RepositoryManager = () => {
  const repos = useSelector(selectRepos);
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
            <RepositoryButton {...repo}></RepositoryButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
