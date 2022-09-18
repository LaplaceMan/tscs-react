import React from "react"
import { AiOutlineBell, AiOutlineMail, AiOutlineCalendar } from "react-icons/ai"
const IconColor:string = "#606266"
const IconSize:string = "1.3rem"

const BedgeItems:Array<{bedge: React.ReactNode, count: number}> = [{bedge: <AiOutlineBell fontSize={IconSize} color={IconColor}/>, count: 1}, {bedge: <AiOutlineMail fontSize={IconSize} color={IconColor}/>, count: 100}, {bedge: <AiOutlineCalendar fontSize={IconSize} color={IconColor}/>, count: 10}]

export default BedgeItems