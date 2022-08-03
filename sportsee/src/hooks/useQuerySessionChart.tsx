import { useEffect, useState } from "react"

type Props = {
    url: string
}
const useQuerySessionChart: any = ({ url }: Props) => {
    const [data, setData] = useState<any>()

    useEffect(() => {
        try {
            fetch(url)
                .then(res => res.json())
                .then(
                    (result) => setData(result)
                )
        }
        catch(error){
            console.log(error)
        }
     
    }, [])


    return (
        data?.data?.sessions
    )

}


export default useQuerySessionChart