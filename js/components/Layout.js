import React from "react";

import CommentBox from "./CommentBox/CommentBox";
import Footer from "./Footer";
import Header from "./Header";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

  render() {
    
    return (
      <div>
        <Header changeTitle={this.changeTitle.bind(this)} title={this.state.title} />
        <CommentBox pollInterval={2000} />
        <Footer />
      </div>
    );
  }
}