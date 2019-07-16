/**
 * Block dependencies
 */
import icon from './icon';
import './style.scss';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { TextControl, PanelBody } = wp.components;

/**
 * Register example block
 */
export default registerBlockType(
    'blocks-playground/meta-box',
    {
        title: __( 'Example - Meta Box', 'blocks-playground' ),
        description: __( 'An example of how to build a block with a meta box field.', 'blocks-playground'),
        category: 'common',
        icon: {
            background: 'rgba(254, 243, 224, 0.52)',
            src: icon,
        },         
        keywords: [
            __( 'Meta', 'blocks-playground' ),
            __( 'Custom field', 'blocks-playground' ),
            __( 'Box', 'blocks-playground' ),
        ],
        attributes: {
            text: {
                type: 'string',
                source: 'meta',
                meta: 'blocks-playground_gb_metabox',
            },
        },
        edit: props => {
            const { attributes: { text }, className, setAttributes } = props;
            return [
                <InspectorControls>
                    <PanelBody>
                        <TextControl
                            label={ __( 'Meta box', 'blocks-playground' ) }
                            value={ text }
                            onChange={ text => setAttributes( { text } ) }
                        />
                    </PanelBody>
                </InspectorControls>,                
                <div className={ className } >
                    <p>{ __( 'Check the meta', 'blocks-playground' ) }</p>
                </div>
            ];
        },
        save: props => {
            return (
                <p>{ __( 'Check the meta', 'blocks-playground' ) }</p>
            );
        },
    },
);
