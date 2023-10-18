import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Place } from "~/Place";

export default function BookingWidget({ place }: { place?: Place }) {
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [numberOfGuests, setNumberOfGuests] = useState(1)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [redirect, setRedirect] = useState('')
    let numberOfNights = 0

    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    async function bookThisPlace() {
        const values = { checkIn, checkOut, numberOfGuests, name, phone, place: place?._id, price: numberOfNights * place?.price! }
        const { data } = await axios.post('/bookings', values)
        const bookingId = data._id
        setRedirect(`/account/bookings/${bookingId}`)
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                Price: ${place?.price?.toString()} / per night
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="grid grid-cols-2">
                    <div className="py-3 px-4">
                        <label> Check in: </label>
                        <input type="date"
                            value={checkIn}
                            onChange={e => setCheckIn(e.target.value)} />
                    </div>
                    <div className="py-3 px-4 border-l">
                        <label> Check out: </label>
                        <input type="date"
                            value={checkOut}
                            onChange={e => setCheckOut(e.target.value)} />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label>Number of guests: </label>
                    <input type="number"
                        value={numberOfGuests}
                        onChange={e => setNumberOfGuests(parseInt(e.target.value))} />
                </div>
                {numberOfNights > 0 && (
                    <div className="py-3 px-4 border-t">
                        <label>Your full name: </label>
                        <input type="text"
                            value={name}
                            onChange={e => setName(e.target.value)} />
                        <label>Phone number: </label>
                        <input type="text"
                            value={phone}
                            onChange={e => setPhone(e.target.value)} />
                    </div>

                )}
            </div>
            <button onClick={bookThisPlace} className="primary !mt-4">
                Book this place
                {numberOfNights > 0 && (
                    <span> ${numberOfNights * place?.price!}</span>
                )}
            </button>
        </div>
    )
}