import React from "react";
import { Outlet } from "react-router-dom";

// Components
import Header from "../../../core/ui/layout/Header";
import SearchBar from "../components/SearchBar";



const SearchLayout = () => {


    return (
        <div className="bg-main-gradient-10">
            <Header></Header>

            <main className="w-11/12 max-w-6xl mx-auto py-5">
                <Outlet/>
            </main>
        </div>
    )
}

export default SearchLayout;