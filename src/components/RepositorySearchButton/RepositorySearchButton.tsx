/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import { debounce } from "@mui/material/utils";
import { useTheme } from "@mui/material";
import { Repository } from "../../app/features/repository/respositorySlice";
import { githubAPIService } from "../../app/api/githubAPIService";
import { useSnackbar } from "notistack";
import { useRepositoryAction } from "../../app/hooks/useRespositoryAction";

export function RepositorySearchButton() {
  const [inputValue, setInputValue] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const { addRepo } = useRepositoryAction();
  // Trigger the lazy query with debounce
  const [trigger, { data: searchResults, error }] =
    githubAPIService.useLazySearchReposQuery();

  const fetchRepos = React.useMemo(
    () =>
      debounce((input) => {
        if (input) {
          trigger(input);
        }
      }, 200),
    [trigger]
  );

  useEffect(() => {
    fetchRepos(inputValue);
  }, [inputValue, fetchRepos]);

  // Directly use the searchResults from RTK Query
  const options = searchResults || [];

  if (error) {
    //@ts-expect-error
    enqueueSnackbar(`Error: ${error.message ?? ""}`, {
      variant: "error",
    });
  }
  
  return (
    <Autocomplete
      sx={{
        backgroundColor: theme.palette.common.white,
        borderRadius: 1,
      }}
      getOptionLabel={(option) => option.full_name || ""}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      noOptionsText="No Repos"
      onChange={(_event, newValue: Repository | null) => {
        if (newValue) {
          addRepo(newValue);
        }
      }}
      onInputChange={(_event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          hiddenLabel
          placeholder="Search a Github Repository..."
          fullWidth
          variant="filled"
        />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>
          <Typography variant="body1" component="span" color="text.secondary">
            {option.owner.login} /
          </Typography>
          <Typography
            variant="body1"
            component="span"
            sx={{ fontWeight: "bold" }}
          >
            {option.name}
          </Typography>
        </li>
      )}
    />
  );
}
