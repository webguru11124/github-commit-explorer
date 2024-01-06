import { Box, CircularProgress, Grid, styled } from "@mui/material";
import { CommitGraph } from "../../components/CommitGraph/CommitGraph";
import { RepositoryManager } from "../../components/RepositoryManager/RepositoryManager";
import { useEffect } from "react";
import { useRepositoryAction } from "../../app/hooks/useRespositoryAction";
import { useSelector } from "react-redux";
import { selectLoading } from "../../app/store";

const Wrapper = styled(Box)({
  display: "flex",
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
});
export const ExplorerPage = () => {
  const { fetchRepos } = useRepositoryAction();
  const loading = useSelector(selectLoading);
  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  return (
    <Grid container>
      <Grid item md={9} xs={12}>
        {loading ? (
          <Wrapper>
            <CircularProgress />{" "}
          </Wrapper>
        ) : (
          <CommitGraph />
        )}
      </Grid>
      <Grid item md={3} xs={12}>
        <RepositoryManager />
      </Grid>
    </Grid>
  );
};
