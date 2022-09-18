import React from "react";
import { MarketCarousel, MarketNotice } from "../components"
const Market = ():React.ReactElement => {
    return(
        <div>
            <MarketCarousel />
            <MarketNotice/>
        </div>
    );
}

export default Market