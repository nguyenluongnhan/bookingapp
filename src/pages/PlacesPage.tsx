import { Link } from "react-router-dom";
import AccountNav from "./AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "./PlaceImg";

export default function PlacesPage() {
    const [places, setPlaces] = useState([])
    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            setPlaces(data)
        })
    }, [])

    return (
        <div>
            <AccountNav />
            <div className="text-center">
                <Link className="inline-flex gap-1.5 bg-primary text-white rounded-full px-6 py-2" to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place
                </Link>
            </div>
            <div className="mt-4">
                {places.length > 0 && places.map((place: any) => (
                    <Link to={'/account/places/' + place._id} className="cursor-pointer flex gap-2.5 bg-gray-100 p-4 rounded-2xl" key={place._id}>
                        <div className="w-32 h-32 bg-gray-200 grow shrink-0 flex">
                            <PlaceImg place={place} index={0} />
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl">{place.title}</h2>
                            <p className="text-sm mt-2">{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}