import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import api from "../api";
import moment from "moment";

const restaurants = [
  {
    id: 1,
    name: "Earthen Bottle",
    description:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    imageUrl:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    address: "$30 Victoria St, #01-26/27 CHIJMES, Singapore 187996",
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    description:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
    imageUrl:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
    address:
      "41 Robertson Quay, #02-02 STPI Creative Workshop and Gallery, Singapore 238236",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    description:
      "Person using a pen to cross a task off a productivity paper card.",
    imageUrl:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
    address: "22 Orange Grove Rd, Level One, Garden Wing, Singapore 258350",
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    description:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
    imageUrl:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    address:
      "80 Middle Road Level 2 InterContinental Singapore, Singapore 188966",
  },
  {
    id: 1,
    name: "Earthen Bottle",
    description:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    imageUrl:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    address: "$30 Victoria St, #01-26/27 CHIJMES, Singapore 187996",
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    description:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
    imageUrl:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
    address:
      "41 Robertson Quay, #02-02 STPI Creative Workshop and Gallery, Singapore 238236",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    description:
      "Person using a pen to cross a task off a productivity paper card.",
    imageUrl:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
    address: "22 Orange Grove Rd, Level One, Garden Wing, Singapore 258350",
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    description:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
    imageUrl:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    address:
      "80 Middle Road Level 2 InterContinental Singapore, Singapore 188966",
  },
];

function Food() {
  const [items, setItems] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const fetchItems = () => {
    api.get("/food").then((response) => setItems(response.data));
  }

  useEffect(() => {
    fetchItems();
  }, [])

  const onConfirm = () => {
    api.put('/calories', {
      id: `${moment().unix()}-${localStorage.getItem('userId')}`,
      date: moment().format('YYYY-MM-DD'),
      foodId: selectedFood.id,
      userId: localStorage.getItem('userId')
    }).then(() => { alert("Added!")})
  }
  
  return (
    <div className="bg-white">
      <Header />
      <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
        <h2 className="text-xl">Select food item</h2>
        <br />
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {items.map((restaurant) => (
            <a key={restaurant.id} onClick={() => setSelectedFood(restaurant)} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
           
                  src={restaurant.imageUrl}
                  alt={restaurant.description}
                  className="h-[300px] w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">
                {restaurant.calories}
              </h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {restaurant.name}
              </p>
            </a>
          ))}
        </div>

        <button
          onClick={onConfirm}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Confirm selection
        </button>
      </div>
    </div>
  );
}

export default Food;
