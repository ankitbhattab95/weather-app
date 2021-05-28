import React from 'react'
import css from './weather-parameters.module.css'
function WeatherParameters(props) {
    const {title, value} = props

    return (
        <div className={css.card}>
            <div className={css.title}>
               {title}
            </div>
            <div className={css.value}>
                {value}
            </div>
        </div>
    )
}

export default WeatherParameters
