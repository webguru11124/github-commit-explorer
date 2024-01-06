/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";
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
  TooltipItem,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { selectHovered } from "../../app/store";
import { getWeekday } from "../../helpers";
import { Box } from "@mui/material";
import { setHovered } from "../../app/features/repository/respositorySlice";
import { useCommitActivities } from "../../hooks/useCommitActivities";

// Register the chart.js components we will use
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export const GraphPanel = () => {
  const hovered = useSelector(selectHovered);
  const { commitActivities } = useCommitActivities();
  const dispatch = useDispatch();

  const chartRef = React.useRef();
  const data = React.useMemo(
    () => ({
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // Adjust labels based on your data
      datasets: commitActivities
        .map((activity) => {
          // Extract RGB values from the rgb(x, x, x) string
          const rgbValues = activity.color
            ? activity.color.match(/\d+/g)
            : null;
          let rgbaColor;
          if (rgbValues) {
            // Set the desired alpha value for opacity (0.5 for 50% opacity)
            const alpha = hovered === null || hovered === activity.id ? 1 : 0.1;

            // Convert to rgba format with the specified alpha
            rgbaColor = `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, ${alpha})`;
          } else {
            rgbaColor = `rgba(0, 0, 0, 0.05)`;
          }

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
        })
        .filter(Boolean),
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
          label: function (context: TooltipItem<"line">) {
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
  
  return (
    <Box display="flex" alignItems="center" height="100%">
      <Line
        ref={chartRef}
        data={data}
        options={options}
        style={{ height: "100%" }}
      />
    </Box>
  );
};
