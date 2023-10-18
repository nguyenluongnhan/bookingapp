import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddressLink from "./AddressLink";
import BookingDates from "./BookingDates";
import PlaceGallery from "./PlaceGallery";

export default function BookingPage() {
    const { id } = useParams()
    const [booking, setBooking] = useState<any>(null)
    useEffect(() => {
        if (id) {
            axios.get(`/bookings/${id}`).then((res) => {
                setBooking(res.data)
            })
        }
    }, [id])

    if (!booking) {
        return ''
    }
    console.log(booking)

    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking?.place?.title}</h1>
            <AddressLink className="my-2 block">{booking?.place.address}</AddressLink>
            <div className="flex justify-between items-center bg-gray-200 p-6 my-6 rounded-2xl">
                <div>
                    <h2 className="text-xl mb-4">Your booking information:</h2>
                    <BookingDates booking={booking} />
                </div>
                <div className="bg-primary p-6 text-white rounded-2xl">
                    <div>Total price</div>
                    <div className="text-2xl">${booking.price}</div>
                </div>
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    )
}