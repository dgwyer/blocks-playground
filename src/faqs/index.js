/**
 * Block dependencies
 */
import icon from "./icon";
import style from "./style.scss";

/**
 * Block libraries
 */

const { withInstanceId } = wp.compose;
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
      attributes: { images, direction, isLightboxEnabled },
      className,
      setAttributes
    } = props;

    const attr = getBlockAttributes();

    return (
      <Fragment>
        <InspectorControls>
          <PanelBody title={__("Gallery Settings", "blocks-playground")} initialOpen={true}>
            <PanelRow>
              <div>Add controls here...</div>
            </PanelRow>
          </PanelBody>
        </InspectorControls>
        <div className='ffaq'>
          {JSON.stringify(props.attributes)}
          Flexible FAQ Container
          <FAQ />
        </div>
      </Fragment>
    );
  },
  save() {
    // Rendering in PHP/React on frontend
    return null;
  },
});
