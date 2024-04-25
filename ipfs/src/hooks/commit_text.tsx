
import { useState, useCallback } from 'react'
import { useHelia } from './use_helia'

const encoder = new TextEncoder()
const decoder = new TextDecoder()

export const useCommitText = () => {
    const { helia, fs, error, starting } = useHelia()
    const [cid, setCid] = useState<number| null| undefined>(null)
    const [cidString, setCidString] = useState<number | string>('')
    const [committedText, setCommittedText] = useState('')

    const commitText = useCallback(async (text: string) => {
        if (!error && !starting) {
            try {
                const cid = await fs?.addBytes(encoder.encode(text))
                // @ts-ignore
                setCid(cid)
                // @ts-ignore
                setCidString(cid?.toString())
                setCommittedText(text)

                console.log('Committed text:', text)
            } catch (e) {
                console.error(e)
            }
        } else if (error) {
            console.error('Error starting Helia')
        } else {
            console.error('Helia not started yet')
        }
    }, [error, starting, helia, fs])



    const fetchCommittedText = useCallback(async () => {
        let text = ''
        if (!error && !starting) {
            try {
                // @ts-ignore
                for await (const chunk of fs?.cat(cid) ?? []) {
                    text += decoder.decode(chunk, {
                        stream: true
                    })
                }
                setCommittedText(text)
            } catch (e) {
                console.error(e)
            }
        } else {
            console.log('please wait for helia to start')
        }
    }, [error, starting, cid, helia, fs])

    return { cidString, committedText, commitText, fetchCommittedText }
}