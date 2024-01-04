import { configureStore } from "@reduxjs/toolkit";
import repoReducer from "./features/repository/respositorySlice";
import { githubAPIService } from "./api/githubAPIService";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    respository: repoReducer,
    [githubAPIService.reducerPath]: githubAPIService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubAPIService.middleware),
});

setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const selectRepos = (state: RootState) => state.respository.repos;
export const selectHovered = (state: RootState) => state.respository.hovered;
