import React from "react";
import { useBici } from "../../../hooks/useBici";
import BiciListAdmin from "../../../components/Admin/Bici/BiciListAdmin";

const BiciList = () => {

    const {bici, useDeleteBici} = useBici();
        console.log(bici);
    return (
        <BiciListAdmin bici={bici} deleteBici={useDeleteBici}/>
    )
}

export default BiciList;
