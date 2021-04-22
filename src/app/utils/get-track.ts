import {Composition} from 'src/app/interfaces/composition';

export function getTrack({title, author}: Composition): string {
    return `https://waterplea.com/jamigo/${author} - ${title}.aac`;
}
