import React from 'react';
import threeDots from "../../../assets/images/threeDots.svg";
import {Image} from "antd";

const Preloader =()=> {
        return (
            <div className={'preloder'}>
                <Image src={threeDots} alt=''/>
                </div>
        );
    }

export default Preloader;