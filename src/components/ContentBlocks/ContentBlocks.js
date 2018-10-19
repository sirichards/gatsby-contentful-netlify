import React, { Component } from "react"
import FullWidthText from "./Blocks/FullWidthText"
import ImageText from "./Blocks/ImageText"

class ContentBlocks extends Component {

    render() {

        const { data } = this.props
        const acfFields = data.acf.flexible_content_page

        const blocks = acfFields.map(acf => {

            const id = acf.id

            switch (acf.__typename) {
                case 'WordPressAcf_full_width_text':
                    return <FullWidthText data={data} key={id} />
                case 'WordPressAcf_2_columns_text':
                    return <ImageText data={data} key={id} />
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