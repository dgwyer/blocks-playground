/**
 * Block dependencies
 */
import icon from "./icon";
import Edit from "./edit";

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
export default registerBlockType("blocks-playground/with-global-settings", {
  title: __("With Global Settings", "blocks-playground"),
  description: __(
    "Example block with global block settings",
    "blocks-playground"
  ),
  category: "blocks-playground",
  icon: {
    src: icon
  },
  keywords: [__("API Key", "blocks-playground")],
  edit: props => {
    return <Edit {...props} />;
  },
  save: props => {
    return <p>{__("Show block global settings", "blocks-playground")}</p>;
  }
});
