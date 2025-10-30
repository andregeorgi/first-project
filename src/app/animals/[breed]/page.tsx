import Link from "next/link";

interface BreedPageProps {
    params: {
        breed: string;
    };
}

let images: string[] = []

export default async function BreedPage({ params }: BreedPageProps) {
    const { breed } = await params;

    try {
        const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/6`);

        if (!res.ok) throw new Error("Failed to fetch images");
        const data = await res.json();
        images = data.message;
    } catch {
        images = []
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
            <Link href="/" className="self-start mb-4 text-blue-600 hover:underline">Back to all breeds</Link>
            <h1 className="text-3xl font-bold mb-6 capitalize">{breed}</h1>

            {images.length === 0 ?
                (<p>Loading images...</p>)
                :
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
            }
        </div>
    );
}
