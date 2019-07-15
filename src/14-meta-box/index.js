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
    'bpblocks/meta-box',
    {
        title: __( 'Example - Meta Box', 'bpblocks' ),
        description: __( 'An example of how to build a block with a meta box field.', 'bpblocks'),
        category: 'common',
        icon: {
            background: 'rgba(254, 243, 224, 0.52)',
            src: icon,
        },         
        keywords: [
            __( 'Meta', 'bpblocks' ),
            __( 'Custom field', 'bpblocks' ),
            __( 'Box', 'bpblocks' ),
        ],
        attributes: {
            text: {
                type: 'string',
                source: 'meta',
                meta: 'bpblocks_gb_metabox',
            },
        },
        edit: props => {
            const { attributes: { text }, className, setAttributes } = props;
            return [
                <InspectorControls>
                    <PanelBody>
                        <TextControl
                            label={ __( 'Meta box', 'bpblocks' ) }
                            value={ text }
                            onChange={ text => setAttributes( { text } ) }
                        />
                    </PanelBody>
                </InspectorControls>,                
                <div className={ className } >
                    <p>{ __( 'Check the meta', 'bpblocks' ) }</p>
                </div>
            ];
        },
        save: props => {
            return (
                <p>{ __( 'Check the meta', 'bpblocks' ) }</p>
            );
        },
    },
);
