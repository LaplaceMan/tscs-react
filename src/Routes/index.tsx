import { Routes, Route } from "react-router-dom"
import {Market} from "../pages"
import React from "react"

const AllRoutes = (): React.ReactElement => {
    return (
        <Routes>
            <Route path="market" element={<Market/>}/>
        </Routes>
    )
}

export default AllRoutes