import React from "react";
import SearchHeader from "../../search/components/SearchHeader.jsx";
import FiltersBar from "../../search/components/FiltersBar.jsx";
import DoctorIdentity from "../components/DoctorIdentity.jsx"
import Disponibility from "../components/Contact.jsx"
import PersonalInformation from "../components/ProfesionalInfo.jsx";




// prueba



const DoctorProfile = () => {
    return (
        <div className="min-h-screen bg-blue-50/50">


            {/* Resultados de Doctores */}
            <div className="container mx-auto px-4 lg:py-12">
                <div>
                    <DoctorIdentity /> 
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-card text-card-foreground flex">
                        <PersonalInformation />
                    </div>
                    <div className="bg-card text-card-foreground flex ">
                        <Disponibility  /> 
                    </div>
                </div>

            </div>
            

        </div>
    );
};

export default DoctorProfile;