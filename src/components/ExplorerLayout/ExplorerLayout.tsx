import { Container, Grid, Stack } from "@mui/material";
import { GraphPanel } from "../GraphPanel/GraphPanel";
import { RepositoryManager } from "../RepositoryManager/RepositoryManager";

export const ExplorerLayout = () => {
  return (
    <Grid container>
      <Grid item xs={9}>
        <GraphPanel />
      </Grid>
      <Grid item xs={3}>
        <RepositoryManager />
      </Grid>
    </Grid>
  );
};
