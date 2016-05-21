import React from "react";

import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default class CommentBox extends React.Component {
	constructor() {
	    super();
	    this.state = {
	      data: [],
	    };
	    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
	    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
	 }
  loadCommentsFromServer() {
    $.ajax({
      url: "/api/comments.json",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
  handleCommentSubmit(comment) {
  	 var comments = this.state.data;
    comment.id = Date.now();
    var newComments = comments.concat([comment]);

    this.setState({data: newComments});

    $.ajax({
      url: "/api/comments.json",
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
      	 this.setState({data: comments});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }
  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }
  render() {
    return (
      <div className="commentBox">
      	<CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }

}