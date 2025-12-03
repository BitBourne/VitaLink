import React, { useEffect, useState } from "react";
import SearchHeader from "../components/SearchHeader";
import FiltersBar from "../components/FiltersBar";
import DoctorCard from "../components/DoctorCard";
import useAxiosPrivate from "../../../core/api/useAxiosPrivate";

const SearchPage = () => {
    const axiosPrivate = useAxiosPrivate();

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filtros globales
    const [filters, setFilters] = useState({
        specialty: "",
        city: "",
        minRating: "",
        hasAvailability: "",
        clinicId: "",
        sort: "",
    });

    // Fetch inicial
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const { data } = await axiosPrivate.get("/api/doctor");
                setDoctors(data);
            } catch (error) {
                console.log("Error loading doctors:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    useEffect(() => {
        const fetchFiltered = async () => {
            try {
                const { data } = await axiosPrivate.get("/api/doctor/search", {
                    params: {
                        specialty: filters.specialty || undefined,
                        city: filters.city || undefined,
                        minRating: filters.minRating || undefined,
                        hasAvailability: filters.hasAvailability || undefined,
                        clinicId: filters.clinicId || undefined,
                        sort: filters.sort || undefined,
                    },
                });

                setDoctors(data);
            } catch (error) {
                console.log("Error filtering doctors:", error);
            }
        };

        if (
            filters.specialty ||
            filters.city ||
            filters.minRating ||
            filters.hasAvailability ||
            filters.clinicId ||
            filters.sort
        ) {
            fetchFiltered();
        }
    }, [filters, axiosPrivate]);

    return (
        <div className="min-h-screen bg-blue-50/50">
            <SearchHeader />

            {/** FiltersBar */}
            <FiltersBar setFilters={setFilters} />

            <div className="max-w-7xl mx-auto px-6 py-10">
                {loading ? (
                    <p className="text-center text-gray-500">Cargando doctores...</p>
                ) : doctors.length === 0 ? (
                    <p className="text-center text-gray-500">No se encontraron doctores</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {doctors.map((d) => (
                            <DoctorCard
                                key={d.id}
                                doctor={{
                                    name: `${d.DP_user.name} ${d.DP_user.last_name}`,
                                    specialty: d.DP_specialties?.[0]?.name || "Especialidad no disponible",
                                    rating: d.average_rating,
                                    reviews: d.total_reviews,
                                    address: d.clinics?.[0]?.address || "Dirección no disponible",
                                    branch: d.clinics?.[0]?.name || "Sucursal",
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
