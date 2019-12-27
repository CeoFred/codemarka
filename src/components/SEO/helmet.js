/** @format */

import React from 'react'
import Helmet from 'react-helmet'

export default function helmet({follow = true,lang,title,metaDescription,pathname,image,children}) {
    return (
        <Helmet
            htmlAttributes={ {
                lang: lang || 'en'
            } }
            title={
                title ||
                'Codemarka - Learning, Building and collaboration in real time.'
            }
            titleTemplate={ `%s | ${ title ||
                'Codemarka - Learning, Building and collaboration in real time.' }` }
            meta={ [
                {
                    name: 'description',
                    content:
                        metaDescription ||
                        'An online real time code editor for learning, building and collaborating with multi language support.'
                },
                {
                    property: 'og:title',
                    content: title
                },
                {
                    property: 'og:url',
                    content: 'https://codemarka.dev'
                },

                {
                    property: 'og:description',
                    content:
                        metaDescription ||
                        'An online real time code editor for learning, building and collaborating with multi language support.'
                },
                {
                    property: 'og:type',
                    content: 'website'
                },
                {
                    name: 'twitter:card',
                    content: 'summary'
                },
                {
                    name: 'twitter:creator',
                    content: '@codemon_'
                },
                {
                    name: 'twitter:title',
                    content: title
                },
                {
                    name: 'og:site_name',
                    content: 'codemarka'
                },
                {
                    name: 'og:locale',
                    content: 'en'
                },
                {
                    name: 'og:image',
                    content:
                        image ||
                        'https://res.cloudinary.com/ogwugo-people/image/upload/v1577469153/dark.png'
                },
                {
                    name: 'twitter:description',
                    content:
                        metaDescription ||
                        'An online real time code editor for learning, building and collaborating with multi language support.'
                }
            ] }>
            {children}
            <link
                rel="canonical"
                href={ `https://codemarka/${ pathname || '' }` }
            />
            <meta
                name="robots"
                content={ follow ? 'follow' : 'nofollow,noindex' }
            />
        </Helmet>
    )
}
