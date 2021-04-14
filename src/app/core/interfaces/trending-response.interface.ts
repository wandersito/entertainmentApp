export interface TrendingResponse {
    page:          number;
    results:       Result[];
    total_pages:   number;
    total_results: number;
}

export interface Result {
    original_language: OriginalLanguage;
    original_title?:   string;
    poster_path:       string;
    video?:            boolean;
    vote_average:      number;
    overview:          string;
    release_date?:     Date;
    vote_count:        number;
    adult?:            boolean;
    backdrop_path:     string;
    title?:            string;
    genre_ids:         number[];
    id:                number;
    popularity:        number;
    media_type:        MediaType;
    original_name?:    string;
    name?:             string;
    origin_country?:   string[];
    first_air_date?:   Date;
}

export enum MediaType {
    Movie = "movie",
    Tv = "tv",
}

export enum OriginalLanguage {
    En = "en",
    Ja = "ja",
    Ko = "ko",
}

export enum TimeWindow {
    Day = "day",
    Week = "week"
}