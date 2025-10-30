"use client";

import Link from "next/link";

interface AnimalCardProps {
    name: string;
    imageUrl: string;
}

export const AnimalCard = ({ name, imageUrl }: AnimalCardProps) => {

    return (
        <Link href={`/animals/${encodeURIComponent(name)}`}>
            <div className="max-w-xs rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
                <img
                    className="w-full h-32 sm:h-40 md:h-48 object-cover"
                    src={imageUrl || "/img/card-top.jpg"}
                    alt={name}
                />
                <div className="p-4 text-center font-semibold text-gray-800">{name}</div>
            </div>
        </Link>
    );
};
