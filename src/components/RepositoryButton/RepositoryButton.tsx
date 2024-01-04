import { Box, Button as MUIButton, Typography, useTheme } from "@mui/material";
import {
  Repository,
  remove,
  setHovered,
} from "../../app/features/repository/respositorySlice";
import { formatDate, formatNumberAsK } from "../../helpers";
import { Star, Trash2 } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { selectHovered } from "../../app/store";
import { useSearchParams } from "react-router-dom";
interface RepositoryButtonProps extends Repository {}

export const RepositoryButton = (props: RepositoryButtonProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const hovered = useSelector(selectHovered);
  const ishovered = hovered === props.id;
  const [searchParams, setSearchParams] = useSearchParams();
  const removeRepo = (repoId: number) => {
    dispatch(remove(repoId));
    const existingRepoIds = (searchParams.get("repoNames") ?? "")
      .split("-")
      .filter((repo) => repo !== "");

    // Add the new repository ID to the list
    const updatedRepoIds: string[] = existingRepoIds.filter(
      (id) => id !== repoId.toString()
    );
    setSearchParams({ repoNames: updatedRepoIds.join("-") });
  };
  return (
    <MUIButton
      sx={(theme) => ({
        backgroundColor: theme.palette.grey[900],
        borderRadius: "4px",
        boxShadow: `8px 0px 0px 0px ${props.color} inset`,
        paddingX: 3,
        paddingY: 2,
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        "&:hover": {
          backgroundColor: theme.palette.grey[900], // Set the hover color
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
      <Box sx={{ flexShrink: 1 }}>
        <Box component="div" sx={{ textAlign: "left" }}>
          <Typography variant="button" component="span" color="text.secondary">
            {`${props.owner.login} / `}
          </Typography>
          <Typography
            variant="button"
            component="span"
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
            ml={1}
            sx={{ fontWeight: "bold", display: "flex", alignItems: "center" }}
          >
            {formatNumberAsK(props.stargazers_count)}
          </Typography>
          <Typography
            variant="body2"
            component="div"
            sx={{ ml: 2, display: "flex", alignItems: "center" }}
            color="text.secondary"
          >
            {`Updated ${formatDate(props.updated_at)}`}
          </Typography>
        </Box>
      </Box>

      {ishovered ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            "&:active": {
              opacity: 0.9,
            },
          }}
        >
          <Trash2></Trash2>
        </Box>
      ) : null}
    </MUIButton>
  );
};
