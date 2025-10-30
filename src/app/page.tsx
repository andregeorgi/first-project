"use client";

import { AnimalCard } from "@/components/AnimalCard";
import { useEffect, useState } from "react";

interface Breed {
  name: string;
  imageUrl: string;
}

export default function Home() {

  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://dog.ceo/api/breeds/list/all");
        if (!res.ok) throw new Error("Failed to fetch breeds");

        const data = await res.json();
        const names = Object.keys(data.message);

        const breedData: Breed[] = await Promise.all(
          names.map(async (name) => {
            try {
              const imgRes = await fetch(`https://dog.ceo/api/breed/${name}/images/random`);
              const imgData = await imgRes.json();
              return { name, imageUrl: imgData.message };
            } catch {
              return { name, imageUrl: "/img/card-top.jpg" }; // fallback
            }
          })
        );

        setBreeds(breedData);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">🐶 Dog Breeds</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full max-w-6xl">

          {breeds.slice(0, 10).map((breed) => (
            <AnimalCard name={breed.name} imageUrl={breed.imageUrl} key={breed.name} />

          ))}

        </div>
      )}
    </div>
  );
}
