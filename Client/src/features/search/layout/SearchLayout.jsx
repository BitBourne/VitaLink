import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom"; // 1. Importamos useNavigate

// Context
import useAuth from "../../auth/hooks/useAuth";
import { SearchProvider } from "../Context/searchProvider";

// Components
import Header from "../../../core/ui/Layout/Header";
import SearchBar from "../components/SearchBar";

const SearchLayout = () => {
    const { user, loading } = useAuth();
    if(loading) return 'Cargando contenido...';

    return (
        <div className="bg-main-gradient-10">
            <SearchProvider>
                <Header></Header>

                {/* Verifica que user._id exista y muestra contenido condicionalmente */}
                { user?.id ? (
                    // Contenido
                    <main className="w-11/12 max-w-6xl mx-auto py-5">
                        <Outlet/>
                    </main>
                ) : <Navigate to='/auth' />}
            </SearchProvider>
        </div>
    )
}

export default SearchLayout;