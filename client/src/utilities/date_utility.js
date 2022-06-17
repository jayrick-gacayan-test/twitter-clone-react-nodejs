import React, { useEffect, useState } from "react";
import moment from 'moment';

export const TimePassed = ({ spanClassName, date }) => {
    const [ timeDifference, setTimeDifference ] = useState(null);

    useEffect(
        () => {
            timeDif(date);

            const setTimeDifferenceInterval = setInterval(
                () => {
                    timeDif(date);
                }
                , 1000);

            return () => {
                clearInterval(setTimeDifferenceInterval);
            }
        }
        ,[ date ]
    );

    const timeDif = (date) => {
        setTimeDifference(moment(new Date(date)).fromNow());
    }
    
    return (
        <span className={ spanClassName }>{ timeDifference }</span>
    )
}

export const TimeClock = () => {
    const [ clockTime, setClockTime ] = useState({
        hr: 0,
        min: 0,
        sec: 0,
        ampm: "am"
    });

    useEffect(
        () => {
            update();

            const timeClockInterval = setInterval(
                () => {
                    update();
                }, 1000);

            return () => {
                clearInterval(timeClockInterval);
            }
        },[]
    );

    const update = () => {
        const date = new Date();
        let hour = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();

        setClockTime({
            hr: hour % 12 || 12,
            min: min < 10 ? `0${min}`: min,
            sec: sec < 10 ? `0${sec}`: sec,
            ampm: hour >= 12 ? "pm": "am"
        });

    };

    return (
        <span className="ms-3">
            { clockTime.hr } : { clockTime.min } : { clockTime.sec } : { clockTime.ampm }
        </span>
    );
}