import { Box, CircularProgress, Grid, styled } from "@mui/material";
import { GraphPanel } from "../GraphPanel/GraphPanel";
import { RepositoryManager } from "../RepositoryManager/RepositoryManager";
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
export const ExplorerLayout = () => {
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
          <GraphPanel />
        )}
      </Grid>
      <Grid item md={3} xs={12}>
        <RepositoryManager />
      </Grid>
    </Grid>
  );
};
