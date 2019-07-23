/** @jsx jsx */
//  Import core block libraries
//const { __ } = wp.i18n;
// const {
//   TextControl,
//   RadioControl,
//   SelectControl
// } = wp.components;
//const { Component, Fragment } = wp.element;
import { css, jsx } from "@emotion/core";
//import { faqStyles } from './dynamicFaqStyles';

// render a single faq
export default class FlexibleFaq extends React.Component {

  constructor(props) {
    super(); // or super(props); ??

    // this.state = {
    //   types: [],
    //   taxonomies: [],
    //   taxonomy_select_disabled_status: true,
    //   taxonomy_select_disabled_help: '',
    //   wrapperClass: ''
    // };
    this.props = props;
  }

  // get post types to populate select box
  componentDidMount() {

    console.log('FlexibleFaq component mounted');
    // render dropdowns
  }

  render() {
 
    // @todoAdd these to separate file
    const { padding } = this.props;
    const bg = "green";
    const taggy = css`
      background-color: ${bg};
      color: #fff;
      padding: ${padding}
    `;

    return (
      <div>

        <div css={taggy}>
          I'm an FAQ!
        </div>

        <div className="flexible-faq-wrapper faq1">
          <div className="faq-question flexible-faq">
            <div className="faq-inner-question right">
              <span className="question-text">Why should I use Flexible FAQs?</span>
              <span class="faq-question-expand">X</span>
            </div>
          </div>
          <div className="faq-answer flexible-faq">
            <div className="faq-inner-answer">
              <p>Flexible FAQs was specifically created to make managing multiple FAQs as easy as possible.</p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}