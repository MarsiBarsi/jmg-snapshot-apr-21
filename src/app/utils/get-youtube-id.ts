export function getYoutubeId(youtube: string = ''): string {
    return youtube.split('=')[1]?.split('&')[0];
}
