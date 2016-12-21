import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPosts, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsIndex extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  onDeleteClick(firebaseKey) {
    this.props.deletePost(firebaseKey);
  }

  renderPosts() {
    return this.props.posts.map((post) => {
      return (
        <tr key={post.firebaseKey}>
          <td>
            <Link to={'posts/' + post.firebaseKey}>
              <strong>{post.title}</strong>
            </Link>
          </td>
          <td className='text-center'>
            <Link className='btn btn-default' to={'posts/edit/' + post.firebaseKey}>
              Editar
            </Link>
            <button
              onClick={this.onDeleteClick.bind(this, post.firebaseKey)}
              className='btn btn-danger'>
              Delete Post
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <div className='text-right'>
          <Link to='/posts/new' className='btn btn-primary'>
            Add a Post
          </Link>
        </div>

        <div className='posts'>
          <h3>Posts</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Titulo</th>
                <th className='text-center'>Ações</th>
              </tr>
            </thead>
            <tbody>
              {this.renderPosts()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts.all };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts, deletePost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex);
