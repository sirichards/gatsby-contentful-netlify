import React, { Component } from "react"

class FullWidthText extends Component {

    render() {

        const { data } = this.props
        const text = data.text.childMarkdownRemark.html

        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: text,
                }}
            />
        )

    }
}

export default FullWidthText