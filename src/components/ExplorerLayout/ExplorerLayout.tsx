import { Box, CircularProgress, Grid, styled } from "@mui/material";
import { GraphPanel } from "../GraphPanel/GraphPanel";
import { RepositoryManager } from "../RepositoryManager/RepositoryManager";
import { useEffect } from "react";
import { useRepositoryAction } from "../../app/hooks/useRespositoryAction";
import { useSelector } from "react-redux";
import { selectLoading } from "../../app/store";

const FullScreenBox = styled(Box)({
  display: "flex",
  width: "100vw",
  height: "100vh",
  justifyContent: "center",
  alignItems: "center",
});
export const ExplorerLayout = () => {
  const { fetchRepos } = useRepositoryAction();
  const loading = useSelector(selectLoading);
  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  console.log(loading);

  if (loading) {
    return (
      <FullScreenBox>
        <CircularProgress />
      </FullScreenBox>
    );
  }
  return (
    <Grid container>
      <Grid item md={9} xs={12}>
        <GraphPanel />
      </Grid>
      <Grid item md={3} xs={12}>
        <RepositoryManager />
      </Grid>
    </Grid>
  );
};
