import { useState, useEffect } from "react"
const useFetch = (url) => {
    const [data, setdata] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortConst = new AbortController();
        fetch(url, { singnal: abortConst.signal })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not get data')
                }
                console.log(res)
                return res.json()
            })
            .then(data => {
                setdata(data)
                setError(null)
                setIsPending(false)
            })
            .catch(err => {
                if (err.name === "AbortError") {
                    console.log('fetch aborted')
                } else {
                    setIsPending(false)
                    setError(err.message)
                }
             })
            return () => abortConst.abort();
    }, [url])
    return { data, isPending, error }
}

export default useFetch;