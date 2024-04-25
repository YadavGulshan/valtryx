import { useContext } from "react";
import { HeliaContext } from "../provider/helia_provider";

export const useHelia = () => {
    const { helia, fs, error, starting } = useContext(HeliaContext)
    return { helia, fs, error, starting }
}