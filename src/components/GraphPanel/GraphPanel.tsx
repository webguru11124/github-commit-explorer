import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  ChartEvent,
  ActiveElement,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { selectHovered, selectRepos } from "../../app/store";
import { Commits, githubAPIService } from "../../app/api/githubAPIService";
import { getWeekday } from "../../helpers";
import { Box } from "@mui/material";
import { setHovered } from "../../app/features/repository/respositorySlice";
import { useSnackbar } from "notistack";

// Register the chart.js components we will use
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export const GraphPanel = () => {
  const repos = useSelector(selectRepos);
  const { enqueueSnackbar } = useSnackbar();
  const [trigger, { error }] = githubAPIService.useLazyGetCommitActivityQuery();

  const hovered = useSelector(selectHovered);
  const [commitActivities, setCommitActivities] = React.useState<
    Array<Commits>
  >([]);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchCommitActivities() {
      const activities: Array<Commits> = await Promise.all(
        repos.map((repo) =>
          trigger({
            owner: repo.owner.login,
            repo: repo.name,
            color: repo.color,
            id: repo.id,
          }).unwrap()
        )
      );
      setCommitActivities(activities);
    }
    fetchCommitActivities();
  }, [repos, trigger]);

  const chartRef = React.useRef();
  const data = React.useMemo(
    () => ({
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // Adjust labels based on your data
      datasets: commitActivities.map((activity) => {
        // Extract RGB values from the rgb(x, x, x) string
        const rgbValues = activity.color.match(/\d+/g);
        if (rgbValues) {
          // Set the desired alpha value for opacity (0.5 for 50% opacity)
          const alpha = hovered === null || hovered === activity.id ? 1 : 0.1;

          // Convert to rgba format with the specified alpha
          const rgbaColor = `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, ${alpha})`;

          return {
            label: "Commits over Time",
            data: activity.commits,
            fill: false,
            backgroundColor: rgbaColor,
            borderWidth: 4,
            borderColor: rgbaColor,
            cubicInterpolationMode: "monotone",
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: "rgba(255, 255, 255, 1)",
            pointBorderColor: rgbaColor,
            pointBorderWidth: 2,
            pointHoverBackgroundColor: rgbaColor,
          };
        }
      }),
    }),
    [commitActivities, hovered]
  );

  const options = {
    animation: {
      duration: 100, // Set duration to 0 to disable animation
    },
    onHover: (_event: ChartEvent, chartElement: ActiveElement[]) => {
      if (chartElement.length) {
        const datasetIndex = chartElement[0].datasetIndex;
        const datasetId = commitActivities[datasetIndex].id;
        dispatch(setHovered(datasetId));
      }
    },
    scales: {
      x: {
        grid: {
          display: false, // This will remove the grid lines for the x-axis
        },
        ticks: {
          display: false,
        },
        borderWidth: "5px", // Adjust this value to make the x-axis line thicker
      },
      y: {
        grid: {
          display: false, // This will remove the grid lines for the y-axis
        },
        ticks: {
          display: false,
        },
        borderWidth: "5px", // Adjust this value to make the y-axis line thicker
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context: any) {
            // context contains a lot of information about the point and dataset
            const labelIndex = context.dataIndex;
            const datasetIndex = context.datasetIndex;

            // You can pull data from your datasets to customize the label
            const label = commitActivities[datasetIndex].commits[labelIndex];

            // Return the text you want to display
            return `Commits on ${getWeekday(labelIndex)}: ${label}`;
          },
        },
      },
    },
  };
  if (error) {
    console.log("error", error);
    enqueueSnackbar(`Error: ${(error as any).message ?? ""}`, {
      variant: "error",
    });
  }
  return (
    <Box display="flex" alignItems="center" height="100vh">
      <Line
        ref={chartRef}
        data={data as any}
        options={options}
        style={{ height: "100%" }}
      />
    </Box>
  );
};
