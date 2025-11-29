export interface BreedsListResponse {
    message: Record<string, string[]>
    status: string
}

export interface BreedData {
    name: string;
    subBreeds: string[] | undefined;
    imageUrl: string;
}

export type FetchStatus = "idle" | "loading" | "error" | "success";