import React, { Component } from "react"

class ImageText extends Component {

    render() {

        const { data } = this.props
        const text = data.text.childMarkdownRemark.html
        const image = data.image.file.url

        return (
            <>
                <div>
                    <img src="//placehold.it/400x300" alt="" />
                </div>
                <div
                    dangerouslySetInnerHTML={{
                        __html: text,
                    }}
                />
            </>
        )

    }
}

export default ImageText