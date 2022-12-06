import '../Sidebar/Sidebar.css'
import Tab from '../Tab/Tab';
import yoga from '../../assets/img/yoga.svg'
import swim from '../../assets/img/swim.svg'
import bike from '../../assets/img/bike.svg'
import fit from '../../assets/img/fit.svg'





const Sidebar: any = () => {

    return (
        <section className="sidebar_block" >
            <div className="sidebar_tab_block">
                <Tab url="#" img={yoga} />
                <Tab url="#" img={swim} />
                <Tab url="#" img={bike} />
                <Tab url="#" img={fit} />
            </div>

            <p className="sidebar_text">Copiryght, SportSee 2020</p>

        </section>
    )
}

export default Sidebar