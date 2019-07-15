/**
 * Block dependencies
 */
// import icons from "./icons";
import "./style.scss";
// import "./editor.scss";

/**
 * Internal block libraries
 */
const { Fragment } = wp.element;
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

/**
 * Register example block
 */
export default registerBlockType("bpblocks/shoutout-styles", {
  title: __("Shoutout", "bpblocks"),
  description: __(
    "An example block for working with Styles API.",
    "bpblocks"
  ),
    category: "bpblocks",
  icon: {
    src: "megaphone"
  },
  keywords: [__("Call to Action", "bpblocks")],
  attributes: {
    headline: {
      type: "string"
    },
    text: {
      type: "html"
    }
  },
  edit: props => {
    const {
      attributes: { headline, text },
      className,
      setAttributes,
      isSelected
    } = props;

    return (
      <div className={className}>
        {/* {isSelected ? (
          <TextControl
            label="Headline"
            value={headline}
            onChange={headline => setAttributes({ headline })}
          />
        ) : (
          <h2>{headline}</h2>
        )} */}
        <RichText
          value={headline}
          tagName="h2"
          placeholder={__("Headline", "bpblocks")}
          onChange={headline => setAttributes({ headline })}
        />
        <RichText
          value={text}
          placeholder={__("Shoutout Text", "bpblocks")}
          onChange={text => setAttributes({ text })}
        />
      </div>
    );
  },
  save: props => {
    const { headline, text } = props.attributes;
    return (
      <div>
        <RichText.Content value={headline} tagName="h2" />
        <RichText.Content value={text} tagName="div" />
      </div>
    );
  }
});
