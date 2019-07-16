/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
  InspectorControls,
  ColorPalette,
  PanelColorSettings,
  ContrastChecker
} = wp.editor;

const {
  CheckboxControl,
  PanelBody,
  PanelRow,
  RadioControl,
  RangeControl,
  TextControl,
  TextareaControl,
  ToggleControl,
  SelectControl
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    const {
      attributes: {
        checkboxControl,
        colorPaletteControl,
        colorPaletteControl2,
        radioControl,
        rangeControl,
        textControl,
        textareaControl,
        toggleControl,
        selectControl
      },
      setAttributes
    } = this.props;

    return (
      <InspectorControls>
        <PanelBody
          title={__("Panel Body Title", "blocks-playground")}
          initialOpen={false}
        >
          <PanelRow>
            <p>{__("Panel Body Copy", "blocks-playground")}</p>
          </PanelRow>
        </PanelBody>

        <PanelBody>
          <CheckboxControl
            heading={__("Checkbox Control", "blocks-playground")}
            label={__("Check here", "blocks-playground")}
            help={__("Checkbox control help text", "blocks-playground")}
            checked={checkboxControl}
            onChange={checkboxControl => setAttributes({ checkboxControl })}
          />
        </PanelBody>

        <PanelColorSettings
          title={__("Color Settings", "blocks-playground")}
          colorSettings={[
            {
              value: colorPaletteControl,
              onChange: colorPaletteControl => {
                setAttributes({ colorPaletteControl });
              },
              label: __("Background Color")
            }
          ]}
        />

        <PanelBody>
          <h3>{__("Color Settings 2", "blocks-playground")}</h3>
          <ColorPalette
            value={colorPaletteControl2}
            onChange={colorPaletteControl2 => {
              setAttributes({ colorPaletteControl2 });
            }}
          />
          <ContrastChecker
            {...{
              // Text is considered large if font size is greater or equal to 18pt or 24px,
              // currently that's not the case for button.
              isLargeText: false,
              textColor: colorPaletteControl2,
              backgroundColor: colorPaletteControl
            }}
          />
        </PanelBody>
        <PanelBody>
          <RadioControl
            label={__("Radio Control", "blocks-playground")}
            selected={radioControl}
            options={[
              { label: "Author", value: "a" },
              { label: "Editor", value: "e" }
            ]}
            onChange={radioControl => setAttributes({ radioControl })}
          />
        </PanelBody>

        <PanelBody>
          <RangeControl
            beforeIcon="arrow-left-alt2"
            afterIcon="arrow-right-alt2"
            label={__("Range Control", "blocks-playground")}
            value={rangeControl}
            onChange={rangeControl => setAttributes({ rangeControl })}
            min={1}
            max={10}
          />
        </PanelBody>

        <PanelBody>
          <TextControl
            label={__("Text Control", "blocks-playground")}
            help={__("Text control help text", "blocks-playground")}
            value={textControl}
            onChange={textControl => setAttributes({ textControl })}
          />
        </PanelBody>

        <PanelBody>
          <TextareaControl
            label={__("Text Area Control", "blocks-playground")}
            help={__("Text area control help text", "blocks-playground")}
            value={textareaControl}
            onChange={textareaControl => setAttributes({ textareaControl })}
          />
        </PanelBody>

        <PanelBody>
          <ToggleControl
            label={__("Toggle Control", "blocks-playground")}
            checked={toggleControl}
            onChange={toggleControl => setAttributes({ toggleControl })}
          />
        </PanelBody>

        <PanelBody>
          <SelectControl
            label={__("Select Control", "blocks-playground")}
            value={selectControl}
            options={[
              { value: "a", label: __("Option A", "blocks-playground") },
              { value: "b", label: __("Option B", "blocks-playground") },
              { value: "c", label: __("Option C", "blocks-playground") }
            ]}
            onChange={selectControl => setAttributes({ selectControl })}
          />
        </PanelBody>
      </InspectorControls>
    );
  }
}
