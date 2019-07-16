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
    'blocks-playground/static',
    {
        title: __( 'Example - Static Block', 'blocks-playground' ),
        description: __( 'Demonstration of how to make a static call to action block.', 'blocks-playground' ),
        category: 'common',
        icon: {
          background: 'rgba(254, 243, 224, 0.52)',
          src: icon,
        },        
        keywords: [
            __( 'Banner', 'blocks-playground' ),
            __( 'CTA', 'blocks-playground' ),
            __( 'Shout Out', 'blocks-playground' ),
        ],
        edit: props => {
          const { className, isSelected } = props;
          return (
            <div className={ className }>
              <h2>{ __( 'Static Call to Action', 'blocks-playground' ) }</h2>
              <p>{ __( 'This is really important!', 'blocks-playground' ) }</p>
              {
                isSelected && (
                  <p className="sorry warning">{ __( '✋ Sorry! You cannot edit this block ✋', 'blocks-playground' ) }</p>
                )
              }
            </div>
          );
        },
        save: props => {
          return (
            <div>
              <h2>{ __( 'Call to Action', 'blocks-playground' ) }</h2>
              <p>{ __( 'This is really important!', 'blocks-playground' ) }</p>
            </div>
          );
        },
    },
);
