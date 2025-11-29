"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getRandomBreedImage } from "@/api/dog";
import { get } from "http";

interface AnimalCardProps {
    name: string;
}

export const AnimalCard = ({ name }: AnimalCardProps) => {
    const [loaded, setLoaded] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null)


    useEffect(() => {
        async function loadImages() {
            const url = await getRandomBreedImage(name);
            setImageUrl(url);
        }
        loadImages();
    }, [name])

    return (
        <Link href={`/animals/${encodeURIComponent(name)}`}>
            <div className="max-w-xs rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                {!loaded && (
                    <div className="w-full h-32 sm:h-40 md:h-48 bg-gray-200 animate-pulse"></div>
                )}
                {imageUrl && (
                    <img
                        className="w-full h-32 sm:h-40 md:h-48 object-cover"
                        src={imageUrl || "/img/card-top.jpg"}
                        alt={name}
                        onLoad={() => setLoaded(true)}
                    />
                )}
                <div className="p-4 text-center font-semibold text-gray-800">{name}</div>
            </div>
        </Link>
    );
};
