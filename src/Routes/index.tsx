import { Routes, Route } from 'react-router-dom'
import { Applications } from '../pages'
import React from 'react'

const AllRoutes = (): React.ReactElement => {
    return (
        <Routes>
            <Route path='Applications' element={<Applications/>}/>
        </Routes>
    )
}

export default AllRoutes