import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { editPost ,fetchPost } from '../actions/index';
import PostsForm from './posts_form';

class PostsEdit extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  onSubmit(props) {
    this.props.editPost(this.props.params.id, props);
    return this.context.router.push('/');
  }

  render () {
    const { post } = this.props;
    if (!post) {
      return <div>Loading...</div>
    }

    return (
      <div className='form-edit'>
        <h3>Edit: {this.props.post.title}</h3>
        <PostsForm
          formSubmit={this.onSubmit.bind(this)}
          validateHandleSubmit={this.props.handleSubmit}
          initializeForm={this.props.initializeForm}
          title={this.props.fields.title}
          categories={this.props.fields.categories}
          content={this.props.fields.content}
          post={this.props.post}
        />
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a title';
  }
  if (!values.categories) {
    errors.categories = 'Enter a categories';
  }
  if (!values.content) {
    errors.content = 'Enter a content';
  }
  return errors;
}

function mapStateToProps(state) {
  return { post: state.posts.post };
}

export default reduxForm({
  form: 'PostsEditForm',
  'fields': ['title', 'categories', 'content'],
  validate
}, mapStateToProps, { editPost, fetchPost })(PostsEdit);
