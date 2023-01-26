import React, { useState, useEffect, useContext } from "react";
import { Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { UserContext } from "../context/context";
import { DateTime } from "luxon";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HistoryChart = () => {
  const [user, setUser] = useContext(UserContext);

  const [workouts, setWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(""); // State to display error message

  // Authentication
  const userId = user.user.id;
  const token = localStorage.getItem("token");
  const headers = {
    authorization: "Bearer " + token,
  };

  // Fetch User workouts
  useEffect(() => {
    fetch(`/api/workouts?userId=${userId}`, { headers: headers })
      .then((response) => response.json())
      .then((data) => {
        setWorkouts(data);
        setIsLoading(false);
        console.log("User routines", data);
      })
      .catch(() => {
        setErrorMessage("Unable to fetch your workouts");
        setIsLoading(false);
      });
  }, []);

  //   const formatData = () => {
  //     let data = { labels: [], datasets: [{ label: "Workouts", data: [] }] };
  //     let weeks = {};
  //     let currentWeek = DateTime.local().startOf("week").toISODate();

  //     // group workouts by week
  //     workouts.forEach((workout) => {
  //       let start = DateTime.fromISO(workout.workoutStart);
  //       let weekStart = start.startOf("week").toISODate();
  //       if (!weeks[weekStart]) {
  //         weeks[weekStart] = 0;
  //       }
  //       weeks[weekStart]++;
  //     });

  //     // set labels to be the Monday of the week
  //     for (let i = 0; i < 8; i++) {
  //       let date = DateTime.fromISO(currentWeek).minus({ weeks: i });
  //       let label = date.toISODate();
  //       if (!weeks[label]) {
  //         weeks[label] = 0;
  //       }
  //     }
  //     data.labels = Object.keys(weeks);
  //     data.labels = data.labels.sort();
  //     data.labels = data.labels.map((label) => {
  //       let date = DateTime.fromISO(label);
  //       return date.toFormat("yyyy-MM-dd");
  //     });
  //     data.datasets[0].data = Object.values(weeks).reverse();
  //     return data;
  //   };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Workouts per week",
      },
    },
  };

  const formatData = () => {
    let data = {
      labels: [],
      datasets: [
        {
          label: "Workouts",
          data: [],
          //   backgroundColor: "rgba(255, 99, 132, 0.5)",
          backgroundColor: "#2196f3",
        },
      ],
    };
    let weeks = {};
    let currentWeek = DateTime.local().startOf("week").toISODate();

    // Initialize weeks object with a value of 0 for each week
    for (let i = 0; i < 8; i++) {
      let date = DateTime.fromISO(currentWeek).minus({ weeks: i });
      let label = date.toISODate();
      weeks[label] = 0;
    }

    // group workouts by week
    workouts.forEach((workout) => {
      let start = DateTime.fromISO(workout.workoutStart);
      let weekStart = start.startOf("week").toISODate();
      weeks[weekStart]++;
    });

    // set labels to be the Monday of the week
    for (let i = 0; i < 8; i++) {
      let date = DateTime.fromISO(currentWeek).minus({ weeks: i });
      let label = date.toISODate();
    }
    data.labels = Object.keys(weeks);
    data.labels = data.labels.sort();
    data.labels = data.labels.map((label) => {
      let date = DateTime.fromISO(label);
      return date.toFormat("yyyy-MM-dd");
    });
    data.datasets[0].data = Object.values(weeks).reverse();
    return data;
  };

  const data = formatData();

  return (
    <>
      <Typography>{workouts.length} workouts completed</Typography>
      <Bar data={data} options={options} />
    </>
  );
};

export default HistoryChart;
