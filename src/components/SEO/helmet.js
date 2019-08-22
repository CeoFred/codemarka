import React from "react";
import Helmet from "react-helmet";


export default function helmet(props) {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{props.title}</title>
                {props.link}
                <meta name="description" content={props.metaDescription}/>
            </Helmet>
        </div>
    )
}
