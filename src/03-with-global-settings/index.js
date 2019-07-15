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
export default registerBlockType("bpblocks/with-global-settings", {
  title: __("With Global Settings", "bpblocks"),
  description: __(
    "Example block with global block settings",
    "bpblocks"
  ),
  category: "bpblocks",
  icon: {
    src: icon
  },
  keywords: [__("API Key", "bpblocks")],
  edit: props => {
    return <Edit {...props} />;
  },
  save: props => {
    return <p>{__("Show block global settings", "bpblocks")}</p>;
  }
});
