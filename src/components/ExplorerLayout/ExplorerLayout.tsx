import { Grid } from "@mui/material";
import { GraphPanel } from "../GraphPanel/GraphPanel";
import { RepositoryManager } from "../RepositoryManager/RepositoryManager";

export const ExplorerLayout = () => {
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
