export interface ProvidersResponse {
    id:      number;
    results: { [key: string]: Provider };
}

export interface Provider {
    link:      string;
    rent:      Buy[];
    buy:       Buy[];
    flatrate?: Buy[];
}

export interface Buy {
    display_priority: number;
    logo_path:        string;
    provider_id:      number;
    provider_name:    string;
}
