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
  MediaUpload,
  MediaPlaceholder
} = wp.editor;
const {
  InspectorControls
} = wp.blockEditor;
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
      attributes: { page_depth, q_padding, some_array, test_asc_array, faq_styles },
      className,
      setAttributes, attributes
    } = props;

    function updatePadding(padding) {

      // @todo this should be a prop or come from PHP?
      var styleIndex = 0;

      console.log('New padding: ', padding);

      //(value) => setState({ color: value.hex })

      let newColors = [...some_array];
      newColors[styleIndex] = padding;
      console.log('NEW: ', newColors);

      setAttributes({ some_array: newColors });
    }

    function updatePaddingTest(padding) {

      // @todo this should be a prop or come from PHP?
      //var styleIndex = 0;

//      console.log('TEST New padding: ', test_asc_array);

      console.log('STYLES (before update): ', JSON.parse(faq_styles));

      //(value) => setState({ color: value.hex })

      // it's registered in PHP as an array but we access it in JS in object form!
      let newStyles = {
        ...JSON.parse(faq_styles)[0],
        padding: padding
      };

      console.log('STYLES (after update): ', newStyles);
      console.log('STYLES STRING (after update): ', '[' + JSON.stringify(newStyles) + ']' );
      console.log('STYLES ORIGIN: ', faq_styles );

      setAttributes({ faq_styles: '[' + JSON.stringify(newStyles) + ']' });
//      newColors[styleIndex] = padding;
//      console.log('NEW STYLES: ', JSON.stringify(newStyles));
    }

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
            <PanelRow>
              <TextControl
                type="string"
                label="Q Padding"
                help="Padding for the question"
                value={some_array[0]}
                onChange={updatePadding}
              />
            </PanelRow>
            <PanelRow>
              <TextControl
                type="string"
                label="TEST Q Padding"
                help="Padding for the question"
                value={JSON.parse(faq_styles)[0].padding}
                onChange={updatePaddingTest}
              />
            </PanelRow>
          </PanelBody>
        </InspectorControls>
        <div className='ffaq'>
          {page_depth}
          <br />
          {JSON.stringify(props.attributes.test_asc_array.padding)}
          <br />
          Flexible FAQ Container
          <FlexibleFaq padding={JSON.parse(faq_styles)[0].padding} />
        </div>
      </Fragment>
    );
  },
  save() {
    // Rendering in PHP/React on frontend
    return null;
  },
});
