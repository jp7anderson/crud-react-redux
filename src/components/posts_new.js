import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import PostsForm from './posts_form';

class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createPost(props);
    return this.context.router.push('/');
  }

  render() {
    return (
      <div className='form-new'>
        <h3>Create A New Post</h3>
        <PostsForm
          formSubmit={this.onSubmit.bind(this)}
          initializeForm={this.props.initializeForm}
          validateHandleSubmit={this.props.handleSubmit}
          title={this.props.fields.title}
          categories={this.props.fields.categories}
          content={this.props.fields.content}
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

export default reduxForm({
  form: 'PostsNewForm',
  'fields': ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew);
