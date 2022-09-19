import React from 'react';
import { MarketCarousel, MarketNotice, MarketPersonal, MarketIDCard } from '../components'
const Market = ():React.ReactElement => {
    return(
        <div className='flex flex-col'>
            <div className='flex flex-row h-[20vw] min-h-[250px]'>
                <MarketCarousel />
                <div className='flex flex-row mx-[1vw] justify-between'>
                    <MarketNotice />
                    <div className='flex flex-col justify-between'>
                        <MarketIDCard />
                        <MarketPersonal/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Market