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

  //   // render dropdowns
  }

  render() {
    const { some_array } = this.props;
    const bg = "pink";

    return (
      <div
        css={css`
          background-color: ${bg};
          color: #fff;
          padding: ${some_array[0]}
        `}
      >
        I am an FAQ!
      </div>
    );
  }
}