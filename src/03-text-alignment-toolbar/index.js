/**
 * Block dependencies
 */
import classnames from 'classnames';
import './style.scss';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const {
  registerBlockType,
} = wp.blocks;
const {
  RichText,
  AlignmentToolbar,
  BlockControls,
} = wp.editor;


/**
  * Register block
 */
export default registerBlockType(
    'bpblocks/text-alignment-toolbar',
    {
        title: __( 'Example - Alignment Toolbar', 'bpblocks' ),
        description: __( 'How to add an alignment toolbar to a block for aligning text.', 'bpblocks' ),
        category: 'common',
        icon: {
            background: 'rgba(254, 243, 224, 0.52)',
            src: 'editor-alignleft',
        },                   
        keywords: [
            __( 'Toolbar', 'bpblocks' ),
            __( 'Settings', 'bpblocks' ),
            __( 'Float', 'bpblocks' ),
        ],
        attributes: {
            message: {
                type: 'array',
                source: 'children',
                selector: '.message-body',
            },
            textAlignment: {
                type: 'string',
            },
        },
        edit: props => {
          const {
              attributes: { textAlignment, message },
              className, setAttributes } = props;

          return (
            <div className={ className } >
                <BlockControls>
                    <AlignmentToolbar
                        value={ textAlignment }
                        onChange={ textAlignment => setAttributes( { textAlignment } ) }
                    />
                </BlockControls>
                <RichText
                    tagName="div"
                    multiline="p"
                    placeholder={ __( 'Enter your message here..', 'bpblocks' ) }
                    value={ message }
                    style={ { textAlign: textAlignment } }
                    onChange={ message => setAttributes( { message } ) }
                />
            </div>
          );
        },
        save: props => {
          const { textAlignment, message } = props.attributes;
          return (
            <div 
                className="message-body" 
                style={ { textAlign: textAlignment } } 
            >
              { message }
            </div>
          );
        },

    },
);
