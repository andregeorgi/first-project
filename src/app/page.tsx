"use client";

import { AnimalCard } from "@/components/AnimalCard";
import { useEffect, useRef, useState } from "react";

interface Breed {
  name: string;
  imageUrl: string;
}

export default function Home() {
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(20);

  const loaderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const res = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await res.json();
        const names = Object.keys(data.message);

        const breedData: Breed[] = await Promise.all(
          names.map(async (name) => {
            const imgRes = await fetch(
              `https://dog.ceo/api/breed/${name}/images/random`
            );
            const imgData = await imgRes.json();
            return { name, imageUrl: imgData.message };
          })
        );

        setBreeds(breedData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setVisibleCount((prev) => prev + 20);
      }

    },
      { threshold: 0.1, rootMargin: "200px", root: null }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [breeds]);


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">🐶 Dog Breeds</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full max-w-6xl">
            {breeds.slice(0, visibleCount).map((breed) => (
              <AnimalCard
                key={breed.name}
                name={breed.name}
                imageUrl={breed.imageUrl}
              />
            ))}
          </div>


          <div ref={loaderRef} className="h-10 mt-10">
            Loading more dogs...
          </div>
        </>
      )}
    </div>
  );
}