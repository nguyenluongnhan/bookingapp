import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
    const [places, setPlaces] = useState<any>([])
    useEffect(() => {
        axios.get('/places').then((res: any) => {
            setPlaces([...res.data, ...res.data, ...res.data])
        })
    }, [])

    return (
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3">
            {places.length > 0 && places.map((place: any) => (
                <Link to={'/place/' + place._id}>
                    <div className="bg-gray-500 mb-2 rounded-2xl flex">
                        {place.addedPhotos?.[0] && (
                            <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/' + place.addedPhotos[0]} />
                        )}
                    </div>
                    <h3 className="font-bold">{place.address}</h3>
                    <h2 className="text-sm truncate text-gray-500">{place.title}</h2>
                    <div className="mt-1">
                        <span className="font-bold">
                            ${place.price} per night
                        </span>
                    </div>
                </Link>
            ))
            }
        </div >
    );
}