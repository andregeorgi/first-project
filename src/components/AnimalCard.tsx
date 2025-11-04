"use client";

import Link from "next/link";
import { useState } from "react";

interface AnimalCardProps {
    name: string;
    imageUrl: string;
}

export const AnimalCard = ({ name, imageUrl }: AnimalCardProps) => {
    const [loaded, setLoaded] = useState(false);

    {
        !loaded && (
            <div className="w-full h-32 sm:h-40 md:h-48 bg-gray-200 animate-pulse"></div>
        )
    }

    return (
        <Link href={`/animals/${encodeURIComponent(name)}`}>
            <div className="max-w-xs rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <img
                    className="w-full h-32 sm:h-40 md:h-48 object-cover"
                    src={imageUrl || "/img/card-top.jpg"}
                    alt={name}
                    onLoad={() => setLoaded(true)}
                />
                <div className="p-4 text-center font-semibold text-gray-800">{name}</div>
            </div>
        </Link>
    );
};
