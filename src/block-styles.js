const { registerBlockStyle } = wp.blocks;

import "./style.scss";

registerBlockStyle("core/quote", {
  name: "colorful-quote",
  label: "Colorful Quote"
});

registerBlockStyle("blocks-playground/shoutout-styles", {
  name: "default",
  label: "Default"
});

registerBlockStyle("blocks-playground/shoutout-styles", {
  name: "serious",
  label: "Serious"
});

registerBlockStyle("blocks-playground/shoutout-styles", {
  name: "colorful",
  label: "Colorful"
});
