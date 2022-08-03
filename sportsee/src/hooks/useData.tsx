import { useEffect, useState } from "react"


type Props = {
    url: string
    onSuccess: (data: any) => any
}
const useData: any = ({ url, onSuccess }: Props) => {
    const [data, setData] = useState<any>()

    useEffect(() => {
        try {
            fetch(url)
                .then(res => res.json())
                .then(
                    (result) => setData(onSuccess(result))
                )
        }
        catch (error) {
            console.log(error)
        }

    }, [])



    return (

        data 
    )

}


export default useData