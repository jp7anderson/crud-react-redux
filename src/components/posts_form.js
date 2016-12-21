import React, { Component } from 'react';
import { Link } from 'react-router';

export default class PostsForm extends Component {
  componentWillMount() {
    if (this.props.post) {
      this.props.initializeForm(this.props.post);
    }
  }

  onSubmit(props) {
    this.props.formSubmit(props);
  }

  render () {
    return (
      <form onSubmit={this.props.validateHandleSubmit(props => this.onSubmit(props))}>
        <div className={`form-group ${this.props.title.touched && this.props.title.invalid ? 'has-error' : ''}`}>
          <label>Title</label>
          <input type='text' ref='title' className='form-control' {...this.props.title} />
          <div className='help-block'>
            {this.props.title.touched ? this.props.title.error : ''}
          </div>
        </div>
        <div className={`form-group ${this.props.categories.touched && this.props.categories.invalid ? 'has-error' : ''}`}>
          <label>Categories</label>
          <input type='text' ref='categories' className='form-control' {...this.props.categories} />
          <div className='help-block'>
            {this.props.categories.touched ? this.props.categories.error : ''}
          </div>
        </div>
        <div className={`form-group ${this.props.content.touched && this.props.content.invalid ? 'has-error' : ''}`}>
          <label>Content</label>
          <textarea ref='content' className='form-control' {...this.props.content} />
          <div className='help-block'>
            {this.props.content.touched ? this.props.content.error : ''}
          </div>
        </div>
        <div className='actions-buttons'>
          <button type='submit' className='btn btn-primary'>Submit</button>
          <Link to='/' className='btn btn-danger'>Cancel</Link>
        </div>
      </form>
    );
  }
}
