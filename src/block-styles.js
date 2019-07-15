const { registerBlockStyle } = wp.blocks;

import "./style.scss";

registerBlockStyle("core/quote", {
  name: "colorful-quote",
  label: "Colorful Quote"
});

registerBlockStyle("bpblocks/shoutout-styles", {
  name: "default",
  label: "Default"
});

registerBlockStyle("bpblocks/shoutout-styles", {
  name: "serious",
  label: "Serious"
});

registerBlockStyle("bpblocks/shoutout-styles", {
  name: "colorful",
  label: "Colorful"
});
