import axios from 'axios';
import firebaseApp from '../firebase_connection';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';

const fireRef = firebaseApp.database().ref('posts');

export function fetchPosts() {
  return dispatch => {
    fireRef.on('value', snapshot => {
      let items = [];
      snapshot.forEach((child) => {
        let record = {
          firebaseKey: child.key,
          title: child.val().title,
          categories: child.val().categories,
          content: child.val().content
        }
        items.push(record);
      });

      dispatch({
        type: FETCH_POSTS,
        payload: { data: items }
      });
    });
  };
}

export function createPost(props) {
  return dispatch => fireRef.push(props);
}

export function fetchPost(id) {
  return dispatch => {
    fireRef.child(id).on('value', snapshot => {
      let record = {
        firebaseKey: snapshot.key,
        title: snapshot.val().title,
        categories: snapshot.val().categories,
        content: snapshot.val().content
      }

      dispatch({
        type: FETCH_POST,
        payload: { data: record }
      });
    });
  };
}

export function editPost(id, props) {
  return dispatch => fireRef.child(id).update(props);
}

export function deletePost(id) {
  return dispatch => fireRef.child(id).remove();
}
