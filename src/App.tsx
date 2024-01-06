import { useEffect } from "react";
import "./App.css";
import { ExplorerLayout } from "./components/ExplorerLayout/ExplorerLayout";
import { useSearchParams } from "react-router-dom";

function App() {
  // const [searchParams, setSearchParams] = useSearchParams();
  // useEffect(() => {
  //   const existingRepoIds = (searchParams.get("repoIds") ?? "")
  //     .split("-")
  //     .filter((repo) => repo !== "");
  // }, []);
  return <ExplorerLayout />;
}

export default App;
