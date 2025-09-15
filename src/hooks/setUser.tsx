import { useEffect, useState } from 'react'
import useStore from '../store'
import { getCurrentUser, type GetCurrentUserOutput } from 'aws-amplify/auth'

const setUser = () => {
    const { setUser } = useStore()
    const [currentUser, setCurrentUser] = useState<GetCurrentUserOutput | null>(null)

    useEffect(() => {
        getCurrentUser().then(user => {
            setCurrentUser(user)
        })
    }, [])

    useEffect(() => {
        if (currentUser) setUser(currentUser)
    }, [currentUser])
    return currentUser
}

export default setUser