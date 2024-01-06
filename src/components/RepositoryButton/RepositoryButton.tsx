import { Box, Button as MUIButton, Typography, useTheme } from "@mui/material";
import {
  Repository,
  setHovered,
} from "../../app/features/repository/respositorySlice";
import { formatDate, formatNumberAsK } from "../../helpers";
import { Star, Trash2 } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { selectHovered } from "../../app/store";
import { useRepositoryAction } from "../../app/hooks/useRespositoryAction";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
interface RepositoryButtonProps extends Repository {}

export const RepositoryButton = (props: RepositoryButtonProps) => {
  const theme = useTheme();
  const hovered = useSelector(selectHovered);
  const ishovered = hovered === props.id;
  const { removeRepo } = useRepositoryAction();
  const dispatch = useDispatch();

  return (
    <MUIButton
      sx={(theme) => ({
        backgroundColor: theme.palette.grey[900],
        borderRadius: "4px",
        boxShadow: `8px 0px 0px 0px ${props.color} inset`,
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
        opacity: hovered === null || ishovered ? 1 : 0.3,
      })}
      fullWidth
      onMouseEnter={() => {
        dispatch(setHovered(props.id));
      }}
      onMouseLeave={() => {
        dispatch(setHovered(null));
      }}
      onClick={() => {
        removeRepo(props.id);
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
              {`${props.owner.login} / `}
            </Typography>
            <Typography
              variant="button"
              component="div"
              sx={{ fontWeight: "bold" }}
              color="white"
            >
              {props.name}
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
              {formatNumberAsK(props.stargazers_count)}
            </Typography>
            <Typography
              variant="body2"
              component="span"
              noWrap
              sx={{ ml: 2 }}
              display={{ xs: "none", lg: "block" }}
              color="text.secondary"
            >
              {`Updated ${formatDate(props.updated_at)}`}
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
    </MUIButton>
  );
};
