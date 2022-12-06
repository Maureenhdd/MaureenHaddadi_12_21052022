import '../DailyCard/DailyCard.css'
import PropTypes from 'prop-types';


/**
 * Component for daily user info card 
 * @component
 * @prop {string} title title of card
 * @prop {string} subtitle subtitle of card
 * @prop {string} icon url of icon 
 * @prop {string} bg background color for icon 
 * 
 * @return {FunctionalComponent}
 * 
 */

const DailyCard: any = ({ title, subtitle, icon, bg }: any) => {

    return (
        <div className="daily_cards_block" ><img src={icon} alt={`icon`} className={`daily_card_block__i icon--${bg}`} />
            <div className="daily_cards_block__left">
                <h4>{title}</h4>
                <p>{subtitle}</p>
            </div></div>
    )
}

DailyCard.propTypes = {
    /**
 * card's title
 */
    title: PropTypes.string,
    /**
* card's subtitle
*/
    subtitle: PropTypes.string,
    /**
* card's icon url 
*/
    icon: PropTypes.string,
    /**
* card's background color 
*/
    bg: PropTypes.string
}

export default DailyCard