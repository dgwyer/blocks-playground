/**
 * Block dependencies
 */
import icon from './icon';
import './style.scss';
import './editor.scss';

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register block
 */
export default registerBlockType(
    'bpblocks/static',
    {
        title: __( 'Example - Static Block', 'bpblocks' ),
        description: __( 'Demonstration of how to make a static call to action block.', 'bpblocks' ),
        category: 'common',
        icon: {
          background: 'rgba(254, 243, 224, 0.52)',
          src: icon,
        },        
        keywords: [
            __( 'Banner', 'bpblocks' ),
            __( 'CTA', 'bpblocks' ),
            __( 'Shout Out', 'bpblocks' ),
        ],
        edit: props => {
          const { className, isSelected } = props;
          return (
            <div className={ className }>
              <h2>{ __( 'Static Call to Action', 'bpblocks' ) }</h2>
              <p>{ __( 'This is really important!', 'bpblocks' ) }</p>
              {
                isSelected && (
                  <p className="sorry warning">{ __( '✋ Sorry! You cannot edit this block ✋', 'bpblocks' ) }</p>
                )
              }
            </div>
          );
        },
        save: props => {
          return (
            <div>
              <h2>{ __( 'Call to Action', 'bpblocks' ) }</h2>
              <p>{ __( 'This is really important!', 'bpblocks' ) }</p>
            </div>
          );
        },
    },
);
