import Link from "next/link";

interface BreedPageProps {
    params: Promise<{ breed: string }>;
}

export default async function BreedPage({ params }: BreedPageProps) {
    const { breed } = await params;

    const res = await fetch(
        `https://dog.ceo/api/breed/${breed}/images/random/6`
    );

    if (!res.ok) {
        return (
            <div className="p-6">
                <p>Failed to load images.</p>
            </div>
        );
    }

    const data = await res.json();

    const images: string[] = data.message;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
            <Link href="/" className="self-start mb-4 text-blue-600 hover:underline">
                Back to all breeds
            </Link>

            <h1 className="text-3xl font-bold mb-6 capitalize">{breed}</h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((img) => (
                    <img
                        key={img}
                        src={img}
                        alt={breed}
                        className="rounded-lg w-full h-40 object-cover shadow-sm"
                        loading="lazy"
                    />
                ))}
            </div>
        </div>
    );
}
