// use params to get id
// find patient demographics by querying patient with id

import { useParams } from "react-router-dom";

const PatientPage = () => {
    const { id }= useParams();
    console.log(id)
return (
    <div> 
        THIS IS A PATIENT PAGE
    </div>
)
};

export default PatientPage;