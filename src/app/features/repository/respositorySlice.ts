import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { githubAPIService } from "../../api/githubAPIService";
export type Repository = {
  full_name: string;
  id: number;
  node_id: string;
  name: string;
  owner: {
    login: string;
    id: number;
  };
  updated_at: string;
  stargazers_count: number;
  color?: string;
};
interface RepositoryState {
  repos: Repository[];
  hovered: number | null;
}
const initialState: RepositoryState = {
  repos: [],
  hovered: null,
}; // Explicitly define the type

export const repositorySlice = createSlice({
  name: "repository",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Repository>) => {
      state.repos.push(action.payload);
    },
    setHovered: (state, action: PayloadAction<number | null>) => {
      state.hovered = action.payload;
    },
    remove: (state, action: PayloadAction<number>) => {
      state.repos = state.repos.filter((repo) => repo.id !== action.payload);
    },
  },
});
export const { add, setHovered, remove } = repositorySlice.actions;

export default repositorySlice.reducer;
