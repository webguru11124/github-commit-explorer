import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Repository, add, remove } from "../features/repository/respositorySlice";
import { generateColorFromRepositoryId } from "../../helpers/color";

export function useRepositoryAction() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
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

  const addRepo = (newValue: Repository) => {
    dispatch(
      add({
        ...newValue,
        color: generateColorFromRepositoryId(newValue.id),
      })
    );
    const existingRepoIds = (searchParams.get("repoIds") ?? "")
      .split("-")
      .filter((repo) => repo != "");

    // Add the new repository ID to the list
    const updatedRepoIds: string[] = [
      ...existingRepoIds,
      newValue.id.toString(),
    ];
    // Update the URL with the new repository IDs
    setSearchParams({ repoIds: updatedRepoIds.join("-") });
  };
  return { removeRepo, addRepo };
}
