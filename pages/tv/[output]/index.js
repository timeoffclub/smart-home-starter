import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Brand() {
    const router = useRouter()
    const brand = router.asPath.split('/')[2]
    const width = router.asPath.split('/')[3]
    console.log(brand)

    return (
        <></>
    )
}