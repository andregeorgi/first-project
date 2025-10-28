"use client";

import { useEffect, useState } from "react";


export default function Home() {

  const [breeds, setBreeds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        if (!response.ok) {
          throw new Error("Failed to fetch dog breeds");
        }
        const data = await response.json();
        const breedNames = Object.keys(data.message);
        setBreeds(breedNames);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  return (
    <div className="text-center text-2xl font-bold text-blue-600">
      <h1 className="mb-4">Dog Breeds</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!loading && !error && (
        <ul className="list-disc list-inside">
          {breeds.map((breed) => (
            <li key={breed}>{breed}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
