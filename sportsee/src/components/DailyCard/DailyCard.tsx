import React, { useEffect, useState } from 'react';
import * as d3 from 'd3'
import '../DailyCard/DailyCard.css'
import PropTypes from 'prop-types';


/**
 * Component for daily user info card 
 * @param {string} title title of card
 * @param {string} subtitle subtitle of card
 * @param {string} icon url of icon 
 * @param {string} bg background color for icon 
 * 
 * @return {FunctionalComponent}
 * 
 */

type Props = {
    title: string
    subtitle: string
    icon: string
    bg: string
}

const DailyCard: any = ({ title, subtitle, icon, bg }: Props) => {

    return (
        <div className="daily_cards_block" ><img src={icon} alt={`icon`} className={`daily_card_block__i icon--${bg}`} />
            <div className="daily_cards_block__left">
                <h4>{title}</h4>
                <p>{subtitle}</p>
            </div></div>
    )
}

DailyCard.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    icon: PropTypes.string,
    bg: PropTypes.string
}

export default DailyCard