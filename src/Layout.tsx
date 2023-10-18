import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
    return (
        <div className="max-w-7xl mx-auto p-4 flex flex-col min-h-screen">
            <Header />
            <Outlet />
        </div>
    )
}