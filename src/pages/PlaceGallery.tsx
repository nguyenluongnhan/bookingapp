import { useState } from "react";
import { Place } from "~/Place";

export default function PlaceGallery({ place }: { place?: Place }) {
    const [showPhoto, setShowPhoto] = useState(false)

    if (showPhoto) {
        return (
            <div className="absolute inset-0 bg-black text-white min-w-full min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-2xl">Photos of {place?.title}</h2>
                        <button className="fixed right-12 top-8 flex gap-1 bg-white px-4 py-2 rounded-2xl shadow-lg shadow-black text-black " onClick={() => setShowPhoto(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Close photos
                        </button>
                    </div>
                    {place?.addedPhotos?.length && place.addedPhotos.map((photo) => (
                        <div>
                            <img src={'http://localhost:4000/uploads/' + photo} />
                        </div>
                    )
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="relative">
            <div className="grid gap-2 sm:grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
                <div>
                    {place?.addedPhotos && place?.addedPhotos[0] && (
                        <img onClick={() => setShowPhoto(true)} src={'http://localhost:4000/uploads/' + place?.addedPhotos[0]} className="aspect-square object-cover" />
                    )}
                </div>
                <div className="hidden sm:grid">
                    {place?.addedPhotos && place.addedPhotos[1] && (
                        <img onClick={() => setShowPhoto(true)} src={'http://localhost:4000/uploads/' + place.addedPhotos[1]} className="aspect-square object-cover" />
                    )}
                    <div className="overflow-hidden">
                        {place?.addedPhotos && place.addedPhotos[2] && (
                            <img onClick={() => setShowPhoto(true)} src={'http://localhost:4000/uploads/' + place.addedPhotos[2]} className="aspect-square object-cover relative top-2" />
                        )}
                    </div>
                </div>
            </div>
            <button className="absolute bottom-1.5 right-1.5 px-4 py-2 bg-white rounded-lg border border-gray-700 flex gap-1" onClick={() => setShowPhoto(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                Show all photos
            </button>
        </div>
    )
}