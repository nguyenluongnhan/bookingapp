import { Place } from "~/Place";

export default function PlaceImg({ place, index, className }: { place: Place, index: 0, className?: string }) {

    if (!place.addedPhotos?.length)
        return '';

    if (!className) {
        className = 'object-cover'
    }

    return (
        <img className={className} src={'http://localhost:4000/uploads/' + place.addedPhotos[index]} />
    )
}