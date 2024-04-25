import { UnixFS, unixfs } from "@helia/unixfs";
import { DefaultLibp2pServices, HeliaLibp2p, createHelia } from "helia";
import { Libp2p } from "libp2p";
import PropTypes, { any } from 'prop-types'
import { createContext, useCallback, useEffect, useState } from "react";


export const HeliaContext = createContext<{
    helia: HeliaLibp2p<Libp2p<DefaultLibp2pServices>> | null; // Updated type
    fs: UnixFS | null;
    error: boolean;
    starting: boolean;
}>({
    helia: null, 
    fs: null,
    error: false,
    starting: true
});


// @ts-ignore
export const HeliaProvider = ({ children }) => {
    const [helia, setHelia] = useState<HeliaLibp2p<Libp2p<DefaultLibp2pServices>> | null>(null); 
    const [fs, setFs] = useState<UnixFS | null>(null)
    const [starting, setStarting] = useState(true)
    const [error, setError] = useState(false)


    const startHelia = useCallback(async () => {
        if (helia) {
            console.info('helia already started')
            setStarting(false)
        } else {
            try {
                console.log('Starting helia')
                const helia = await createHelia()
                setHelia(helia)
                setFs(unixfs(helia))
                setStarting(false)
            } catch (e) {
                console.error(e)
                setError(true)
            }
        }
    }, [])

    useEffect(() => {
        startHelia()
    }, [])

    return (
        <HeliaContext.Provider value={{ helia: helia, fs: fs, error, starting }}>
            {children}
        </HeliaContext.Provider>
    )


}

HeliaProvider.propTypes = {
    children: PropTypes.any
}