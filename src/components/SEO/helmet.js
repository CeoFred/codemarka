/** @format */

import React from 'react'
import Helmet from 'react-helmet'

export default function helmet(props) {
    return (
        <Helmet
            title={ props.title || 'codemarka' }
            meta={ [
                { name: 'description', content: props.metaDescription },
                {
                    name: 'og:title',
                    property: 'og:title',
                    content: props.title || 'codemarka.dev'
                },
                { name: 'og:type', property: 'og:type', content: 'website' },
                {
                    name: 'og:url',
                    property: 'og:url',
                    content: 'https://codemarka.dev'
                },
                { name: 'twitter:card', content: 'summary' },
                { name: 'twitter:site', content: '@codemarka' },
                { name: 'twitter:creator', content: '@codemon_' },
                {
                    name: 'og:description',
                    property: 'og:description',
                    content: props.metaDescription
                },
                {
                    name: 'og:image',
                    property: 'og:image',
                    content:
                        'https://lh3.googleusercontent.com/lle6ArHxUMaps446HH81UyEQ2l9VcMZNvsE19ppC-e4CNhIpSbkjSZ00VqvvTMqNAi0vkM2BzZAgDz0hOJHuFaYKHJOydj5oBYwMPF12H0QDmzI6_YAl-mzx4KN8qOzHY34yuYnDM8pwWA5B3MHDHo3gb9kE_78LgzrD61sbba8qvyTkSExOVL5PFxUMZwRLxouz4WMt2QUoK2tr4ojHbPOMvygWwgfdoKlszyMGYafijNYqH_p2CkRXhF3kDuwf571zWlxdEa9Y4GIQrmJaqdByCUfyr77NIpkj7LguniV1mG7Xtr-LVyx5hgJ69He-0ROF8jY1TB8f3B--vgY2w94VEll-2FKZgvgFDa21yg2eVfxhRUIbQrgeWZp1rqviaOmmOAXKotRAiPXEpfFJhTrNgc8ORINTzsDF6dr3DjJfzrmnWTRWqrUoL5fsxVmNxEi9_yGCKkoyivRb9iIivsT3CPqIrDg-cTeoUwtbqNyHt_TNDiQo9Nk3V0BPd8E0nweqF2SWYwSHXAVCziY8amVFN0gN_5DgxY_E0tUBJF-5SKde7Dw0ra321JVQcpwiC-Gv0W84ZlU_Eppoq92ZUoJyZ1C_5koI_jL5vj7aSycw2WtvmnxnfbheK8eICsQrN71DqDX7HnI9is-M3BYK7wE_d58GhBZceNZgS1v9trAXcJ7RfoINER60r5tqJA8ABYudu2vKVItdNr3KH5T6UiX18kCQ31B87NiJVmZMRY5KHeY=s532-no'
                }
            ] }>
            {props.link}
            {props.children}
        </Helmet>
    )
}
