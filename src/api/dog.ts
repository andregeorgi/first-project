import { BreedsListResponse, BreedData } from "@/types/dog";

async function fetchJson<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to fetch with status: ${res.status}`);
    }
    return res.json();
}


export async function getAllBreeds(): Promise<BreedData[]> {
    const data = await fetchJson<BreedsListResponse>("https://dog.ceo/api/breeds/list/all")

    const breeds: BreedData[] = Object.keys(data.message).map((name) => ({
        name,
        subBreeds: data.message[name].length > 0 ? data.message[name] : undefined,
        imageUrl: `https://dog.ceo/api/breed/${name}/images/random`
    }))
    return breeds;
}


export async function getRandomBreedImage(breedName: string): Promise<string> {

    const data = await fetchJson<{ message: string, status: string }>(`https://dog.ceo/api/breed/${breedName}/images/random`);

    return data.message
}
