import axios from "axios"
import { useEffect, useState } from "react"
import PhotosUploader from "./PhotosUploader"
import Perks from "./Perks"
import AccountNav from "./AccountNav"
import { Navigate, useParams } from "react-router-dom"

export default function PlacesFromPage() {
    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState<any>([])
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGusets] = useState(1)
    const [price, setPrice] = useState(100)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        if (!id) {
            return
        }
        axios.get('/places/' + id).then((res) => {
            const { data } = res
            setTitle(data.title)
            setAddress(data.address)
            setAddedPhotos(data.addedPhotos)
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGusets(data.maxGuests)
            setPrice(data.price)
        })
    }, [id])

    function inputHeader(title: any) {
        return <h2 className="text-xl mt-3">{title}</h2>
    }

    function inputDescription(value: any) {
        return <p className="text-gray-500 text-sm">{value}</p>
    }

    function preInput(title: any, value: any) {
        return (
            <>
                {inputHeader(title)}
                {inputDescription(value)}
            </>
        )
    }

    async function addNewPlace(e: any) {
        e.preventDefault()
        const data = { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price }

        if (id) {
            await axios.put('/places', { id, ...data })
            setRedirect(true)
        } else {
            await axios.post('/places', data)
            setRedirect(true)
        }
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={addNewPlace}>
                {preInput('Title', 'Title for your place. Should be short and catchy as in advertisement')}
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="title, for example: Cosy A frame Cabin in Jibhi Valley" />
                {preInput('Address', 'Address to this place')}
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="address" />
                {preInput('Photos', 'more = better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                {preInput('Description', 'Description of the place')}
                <textarea rows={4} value={description} onChange={e => setDescription(e.target.value)} />
                {preInput('Perks', 'Select all the perks of your place')}
                <div className="mt-2 grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-6 gap-2">
                    <Perks selected={perks} onChange={setPerks} />
                </div>
                {preInput('Extra Info', 'House rules, etc')}
                <textarea rows={4} value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />
                {preInput('Check in&out times', 'Add check in and out times, remember to have some tome window for cleaning the room between guests')}
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2">
                    <div>
                        <label className="mt-2">Check in time</label>
                        <input type="text"
                            value={checkIn}
                            onChange={e => setCheckIn(e.target.value)} />
                    </div>
                    <div>
                        <label className="mt-2">Check out time</label>
                        <input type="text"
                            value={checkOut}
                            onChange={e => setCheckOut(e.target.value)} />
                    </div>
                    <div>
                        <label className="mt-2">Max number of guests</label>
                        <input type="number"
                            value={maxGuests}
                            onChange={e => setMaxGusets(parseInt(e.target.value))} />
                    </div>
                    <div>
                        <label className="mt-2">Price per night</label>
                        <input type="number"
                            value={price}
                            onChange={e => setPrice(parseInt(e.target.value))} />
                    </div>
                </div>
                <div className="my-4">
                    <button className="primary">Save</button>
                </div>
            </form>
        </div>
    )
}