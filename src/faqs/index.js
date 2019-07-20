/**
 * Block dependencies
 */
import icon from "./icon";
import style from "./style.scss";

import FlexibleFaq from "./components/FlexibleFaq";

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerBlockType, getBlockAttributes } = wp.blocks;
const {
  BlockControls,
  InspectorControls,
  MediaUpload,
  MediaPlaceholder
} = wp.editor;
const {
  IconButton,
  Toolbar,
  PanelBody,
  PanelRow,
  TextControl,  
  RadioControl,
  ToggleControl
} = wp.components;

/**
 * Register block
 */

export default registerBlockType("blocks-playground/faqs", {
  title: __("FAQs (NEW)", "blocks-playground"),
  description: __("FAQs rendered via React on frontend", "blocks-playground"),
  category: "blocks-playground",
  icon,
  keywords: [
    __("FAQs", "blocks-playground"),
    __("WPGO", "blocks-playground"),
    __("Frequently Asked Questions", "blocks-playground")
  ],
  supports: {
    align: ["full", "wide"]
  },
  edit: props => {

    const {
      attributes: { page_depth },
      className,
      setAttributes
    } = props;

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__("General Settings", "blocks-playground")} initialOpen={true}>
          <PanelRow>
							<TextControl
								type="number"
								label="Page indentation"
								min="0"
								max="5"
								help="Leave at zero for auto-depth"
								value={page_depth}
								onChange={(value) => { setAttributes({ page_depth: parseInt(value) }); }}
							/>
						</PanelRow>
          </PanelBody>
        </InspectorControls>
        <div className='ffaq'>
        {page_depth}
          {JSON.stringify(props.attributes)}
          Flexible FAQ Container
          <FlexibleFaq />
        </div>
      </Fragment>
    );
  },
  save() {
    // Rendering in PHP/React on frontend
    return null;
  },
});
