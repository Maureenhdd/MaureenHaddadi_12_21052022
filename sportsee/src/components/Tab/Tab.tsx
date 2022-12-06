import '../Tab/Tab.css'

type Props = {
    url: string
    img: string
}

const Tab: any = ({ url, img }: Props) => {

    return (
        <a href={url} className="tab" >
            <img src={img} className='tab_i' />
        </a>
    )
}

export default Tab