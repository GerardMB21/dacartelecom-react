import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getConfig from '../../../../utils/getConfig';
import { useSelector } from 'react-redux';

const TotalSolds = ({adviser}) => {

    const date = useSelector(state=>state.date);
    const [solds,setSolds] = useState([]);
    let total = 0;

    useEffect(()=>{
        if (!date.endDate) {
            const getSolds = async ()=>{
                try {
                    const data = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${date?.startDate}&userId=${adviser?.id}`,getConfig());
                    setSolds(data.data.sales);
                } catch (error) {
                    setSolds([]);
                    console.log(error.response.data);
                }
            }
    
            getSolds();
        } else {
            const getSolds = async ()=>{
                try {
                    const data = await axios.get(`https://api-dacartelecom.herokuapp.com/api/v1/solds/get/querys?startDate=${date?.startDate}&finishDate=${date?.endDate}&userId=${adviser?.id}`,getConfig());
                    setSolds(data.data.sales);
                } catch (error) {
                    setSolds([]);
                    console.log(error.response.data);
                }
            }
    
            getSolds();
        }
    },[adviser,date]);

    solds?.map(sold=>{
        return total += sold.sold
    });

    return (
        <div style={{
            background: '#405191'
        }}>
            <p>{ adviser ? total : 'Total' }</p>
        </div>
    );
};

export default TotalSolds;