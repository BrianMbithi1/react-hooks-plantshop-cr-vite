import React, { useState, useEffect } from "react";

import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  
  useEffect(() => {
    fetch("http://localhost:3000/plants")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch plants");
        }

        return response.json();
      })
      .then((data) => {
        setPlants(data);
      })
      .catch((error) => {
        console.error("Error fetching plants:", error);
      });
  }, []);

  // Add a new plant to the backend
  function handleAddPlant(newPlant) {
    fetch("http://localhost:3000/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add plant");
        }

        return response.json();
      })
      .then((data) => {
        setPlants((previousPlants) => [
          ...previousPlants,
          data,
        ]);
      })
      .catch((error) => {
        console.error("Error adding plant:", error);
      });
  }

  // Filter plants using their names
  const filteredPlants = plants.filter((plant) =>
    plant.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />

      <Search
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;