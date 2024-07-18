import React, { useEffect, useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import moment from "moment";
import Header from "../components/Header";
import api from "../api";

const foodData = {
  "2024-07": [
    {
      id: 1,
      name: "Apple",
      calories: 95,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Banana",
      calories: 105,
      imageUrl: "https://via.placeholder.com/150",
    },
  ],
  "2024-06": [
    {
      id: 3,
      name: "Orange",
      calories: 62,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Grapes",
      calories: 104,
      imageUrl: "https://via.placeholder.com/150",
    },
  ],
  // Add more months and food items as needed
};

const Calories = () => {
  const [foodListApi, setFoodList] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState(
    moment().format("YYYY-MM")
  );

  const fetchFood = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const calorieResponse = await api.get(`/calories/user/${userId}`);
      const calorieData = calorieResponse.data;

      // Create an array of promises to fetch food data for each calorie record
      const foodPromises = calorieData.map((cal) =>
        api.get(`/food/${cal.foodId}`).then((foodResponse) => ({
          ...cal, // Spread calorie record
          ...foodResponse.data, // Add food data
        }))
      );

      // Wait for all food data to be fetched and merged with calorie data
      const mergedData = await Promise.all(foodPromises);

      // Update the state with the merged data
      setFoodList(mergedData);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  useEffect(() => {
    fetchFood();
  }, []);

  const foodList = useMemo(()=> {
    return foodListApi.filter(i => moment(i.date).format('YYYY-MM') === selectedMonth)
  }, [foodListApi,selectedMonth]);

  const totalCalories = foodList.reduce(
    (total, item) => total + Number(item.cal),
    0
  );

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text("Calories Summary " + selectedMonth, 10, 10);
    doc.text("Total calories " + totalCalories + " kcal");
    doc.text("------");
    foodList.forEach((item, index) => {
      doc.text(`${item.name}: ${item.calories} cal`, 10, 20 + index * 10);
    });
    doc.text("------");
    doc.save("calories-summary.pdf");
  };

  const getLastSixMonths = () => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const month = moment().subtract(i, "months").format("YYYY-MM");
      months.push(month);
    }
    return months;
  };

  const lastSixMonths = getLastSixMonths();

  console.log({ foodListApi });
  return (
    <div>
      <Header />

      <div className="m-auto p-5 w-[800px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Calories Summary</h2>
          <button
            onClick={handleDownload}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded"
          >
            <svg
              className="h-5 w-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v4a2 2 0 002 2h12a2 2 0 002-2v-4M16 12l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download PDF
          </button>
        </div>

        <div className="mb-4">
          <div className="flex space-x-2">
            {lastSixMonths.map((month) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(month)}
                className={`px-4 py-2 rounded ${
                  selectedMonth === month
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-lg font-semibold">
            Total Calories: {totalCalories}
          </p>
        </div>

        <ul role="list" className="divide-y divide-gray-100">
          {foodList.map((item) => (
            <li key={item.id} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={item.imageUrl}
                  alt={item.name}
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {item.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {item.cal} cal
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calories;
