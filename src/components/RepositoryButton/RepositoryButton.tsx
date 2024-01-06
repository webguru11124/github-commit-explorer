import {
  Box,
  Button as MUIButton,
  Skeleton,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { Repository } from "../../app/features/repository/respositorySlice";
import { formatDate, formatNumberAsK } from "../../helpers";
import { Star, Trash2 } from "react-feather";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const StyleButton = styled(MUIButton)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  borderRadius: "4px",
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  "&:hover": {
    backgroundColor: theme.palette.grey[900], // Set the hover color
    opacity: 0.8,
  },
  "&:active": {
    opacity: 0.7,
  },
}));

type LoadingProps = {
  loading: true;
  repo?: Repository;
  ishovered?: boolean;
  onClick?: (repo: Repository) => void;
  onHover?: (repoID: number) => void;
};

type NotLoadingProps = {
  loading?: false;
  repo: Repository;
  ishovered: boolean;
  onClick: (repo: Repository) => void;
  onHover: (repoID: number | null) => void;
};

type RepositoryButtonProps = LoadingProps | NotLoadingProps;
export const RepositoryButton = (props: RepositoryButtonProps) => {
  const theme = useTheme();
  if (props.loading) {
    return (
      <Skeleton
        variant="rectangular"
        width="100%"
        height={90}
        
        component={StyleButton}
      />
    );
  }

  const { repo, ishovered, onClick, onHover } = props as NotLoadingProps;

  return (
    <StyleButton
      sx={{
        boxShadow: `8px 0px 0px 0px ${
          repo.color ?? theme.palette.grey[400]
        } inset`,

        opacity: ishovered ? 1 : 0.3,
      }}
      fullWidth
      onMouseEnter={() => {
        onHover(repo.id);
      }}
      onMouseLeave={() => {
        onHover(null);
      }}
      onClick={() => {
        onClick(repo);
      }}
    >
      <Grid2 container px={3} py={2} spacing={2} width="100%">
        <Grid2 xs={10}>
          <Box
            component="div"
            sx={{ textAlign: "left", display: "flex", flexDirection: "row" }}
          >
            <Typography
              variant="button"
              noWrap
              component="div"
              color="text.secondary"
            >
              {`${repo.owner.login} / `}
            </Typography>
            <Typography
              variant="button"
              component="div"
              sx={{ fontWeight: "bold" }}
              color="white"
            >
              {repo.name}
            </Typography>
          </Box>
          <Box
            component="div"
            textAlign="left"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {/* <StarBorderIcon sx={{ color: "yellow", mr: 0.5 }} /> */}
            <Star color="white" size={theme.typography.body2.fontSize} />
            <Typography
              variant="body2"
              component="div"
              noWrap
              ml={1}
              sx={{
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              {formatNumberAsK(repo.stargazers_count)}
            </Typography>
            <Typography
              variant="body2"
              component="span"
              noWrap
              sx={{ ml: 2 }}
              display={{ xs: "none", lg: "block" }}
              color="text.secondary"
            >
              {`Updated ${formatDate(repo.updated_at)}`}
            </Typography>
          </Box>
        </Grid2>
        <Grid2 sx={{ display: "flex", alignItems: "center" }} xs={2}>
          <Box
            sx={{
              "&:active": {
                opacity: 0.9,
              },
            }}
          >
            <Trash2 />
          </Box>
        </Grid2>
      </Grid2>
    </StyleButton>
  );
};
