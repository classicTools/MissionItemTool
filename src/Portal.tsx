import { PropsWithChildren, useEffect } from 'react'
import { createPortal } from 'react-dom'

export const HintImagePortal = 'img-portal-root'
interface PortalProps extends PropsWithChildren {
    portalId: string
}

const Portal = ({ portalId, children }: PortalProps) => {
    const mount = document.getElementById(portalId)
    const el = document.createElement('div')
    //@ts-ignore
    useEffect(() => {
        if (mount) {
            mount.appendChild(el)
            return () => mount.removeChild(el)
        }
    }, [el, mount])

    return createPortal(children, el)
}

export default Portal
