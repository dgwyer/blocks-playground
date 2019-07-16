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
export default registerBlockType("blocks-playground/shoutout-styles", {
  title: __("Shoutout", "blocks-playground"),
  description: __(
    "An example block for working with Styles API.",
    "blocks-playground"
  ),
    category: "blocks-playground",
  icon: {
    src: "megaphone"
  },
  keywords: [__("Call to Action", "blocks-playground")],
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
          placeholder={__("Headline", "blocks-playground")}
          onChange={headline => setAttributes({ headline })}
        />
        <RichText
          value={text}
          placeholder={__("Shoutout Text", "blocks-playground")}
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
