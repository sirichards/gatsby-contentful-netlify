import React, { Component } from "react"
import FullWidthText from "./Blocks/FullWidthText"
import ImageText from "./Blocks/ImageText"

class ContentBlocks extends Component {

    render() {

        const { data } = this.props
        const contentBlocks = data.contentBlocks

        const blocks = contentBlocks.map(block => {

            const id = block.id

            switch (block.__typename) {
                case 'ContentfulContentBlockTextFullWidth':
                    return <FullWidthText data={block} key={id} />
                case 'ContentfulContentBlockImageAndText':
                    return <ImageText data={block} key={id} />
                default:
                    return;
            }
        })

        return (
            <>
                {
                    blocks.map((block) => {
                        return block
                    })
                }
            </>
        )

    }
}

export default ContentBlocks