import axios from "axios";
import AccountNav from "./AccountNav";
import { useEffect, useState } from "react";
import PlaceImg from "./PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "./BookingDates";

export default function BookingsPage() {
    const [bookings, setBookings] = useState<any>([])
    useEffect(() => {
        axios.get('/bookings').then(res => {
            setBookings(res.data)
        })
    }, [])
    return (
        <div>
            <AccountNav />
            <div>
                {bookings.length > 0 && bookings.map((booking: any) => (
                    <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                        <div className="w-48">
                            <PlaceImg place={booking?.place} index={0} className="max-w-none w-48 object-cover" />
                        </div>
                        <div className="py-3 pr-4">
                            <h2 className="text-xl font-semibold truncate">{booking.place.title}</h2>
                            <BookingDates booking={booking} className="mb-2 mt-4 text-gray-600" />
                            <div className="flex gap-1 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-7 h-7">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                </svg>
                                <span className="text-lg font-medium">
                                    Total price: ${booking.price}
                                </span>
                            </div>
                        </div>
                    </Link>
                )
                )}
            </div>
        </div>
    )
}