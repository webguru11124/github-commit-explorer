import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
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
  loading: boolean;
}
const initialState: RepositoryState = {
  repos: [],
  loading: false,
  hovered: null,
}; // Explicitly define the type

export const repositorySlice = createSlice({
  name: "repository",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    resetRepos: (state, action: PayloadAction<Repository[]>) => {
      if (action.payload && Array.isArray(action.payload)) {
        state.repos = action.payload;
        state.loading = false;
      }
    },
    add: (state, action: PayloadAction<Repository>) => {
      if (!state.repos.find((repo) => repo.id === action.payload.id))
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
export const { add, setHovered, remove, setLoading, resetRepos } =
  repositorySlice.actions;

export default repositorySlice.reducer;
