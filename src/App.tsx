import { useEffect } from "react";
import "./App.css";
import { ExplorerLayout } from "./components/ExplorerLayout/ExplorerLayout";
import { useRepositoryAction } from "./app/hooks/useRespositoryAction";

function App() {
  const { fetchRepos } = useRepositoryAction();
  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);
  return <ExplorerLayout />;
}

export default App;
