import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../api";

const mockRestaurants = [
  {
    id: 1,
    name: "Hawker Chan",
    address: "78 Smith St, Singapore 058972",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipOUIP1wI9OUK4Dz4IkZKuZtW6KjUHMcji7tume9=s1360-w1360-h1020",
    description: "Famous for its Michelin-starred soya sauce chicken rice.",
  },
  {
    id: 2,
    name: "Odette",
    address: "1 St Andrew's Rd, Singapore 178957",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipPUzzmqPdmJV3K7LXMMD4Dk7Ch67J-N2rBevWsQ=s1360-w1360-h1020",
    description:
      "A contemporary French restaurant named after the chef's grandmother.",
  },
  {
    id: 3,
    name: "Burnt Ends",
    address: "20 Teck Lim Rd, Singapore 088391",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipM7HPUg9gr3z5a0svZnB0HMYNJmugvXxFRlq0s4=s1360-w1360-h1020",
    description:
      "Modern Australian barbecue restaurant with an open-concept kitchen.",
  },
  {
    id: 4,
    name: "Candlenut",
    address: "17A Dempsey Rd, Singapore 249676",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipM7HPUg9gr3z5a0svZnB0HMYNJmugvXxFRlq0s4=s1360-w1360-h1020",
    description: "World's first Michelin-starred Peranakan restaurant.",
  },
];

function Home() {
  const [restaurants, setRestaurant] = useState(mockRestaurants);
  const fetchItems = () => {
    api
      .get("/restaurants")
      .then((response) => response.data.length && setRestaurant(response.data));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="bg-white">
      <Header />
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl">Restaurants</h2>
        <br />
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {restaurants.map((restaurant) => (
            <a key={restaurant.id} href="/food" className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={restaurant.imageUrl}
                  alt={restaurant.description}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">
                {restaurant.address}
              </h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {restaurant.name}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
