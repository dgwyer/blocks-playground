//  Import core block libraries
//const { __ } = wp.i18n;
// const {
//   TextControl,
//   RadioControl,
//   SelectControl
// } = wp.components;
//const { Component, Fragment } = wp.element;

export default class FlexibleFaqs extends React.Component {

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
  // componentDidMount() {

  //   // render dropdowns
  // }

  render() {
    const { block_taxonomy } = this.props;

    return (
      <div className="ffaq">
        I am an FAQ!
      </div>
    );
  }
}