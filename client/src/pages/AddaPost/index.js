import './style.css';
import React, { Component } from 'react';
import FirebaseContext from '../../components/Firebase/context';
import API from '../../services/APIService';
import { Link } from 'react-router-dom';
import LockScreen from '../../components/LockScreen';

class AddaPost extends Component {

  state = {
    postTitle: '',
    postBody: ''
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const addPostForm = document.querySelector("#addPostForm");

    if (addPostForm.checkValidity()) {
      const newPost = {
        title: this.state.postTitle,
        body: this.state.postBody,
        userId: this.firebase.dbUserInfo._id
      };

      this.lockScreen.lock();

      API.createPost(newPost)
        .then(() => window.location.href = "/")
        .catch(err => {
          console.log(err);
          window.M.toast({ html: 'Error sending post request' });
        })
        .finally(() => this.lockScreen.unlock());
    } else {
      window.M.toast({ html: 'Please enter required fields' });
    }

  }

  render() {
    return (
      <FirebaseContext.Consumer>
        {
          firebase => {
            this.firebase = firebase;

            return (
              <div id="addAPostPage">
                <div className="container">
                  {firebase.dbUserInfo &&
                    <form id="addPostForm">
                      <Link id="backArrow" to={"/"}><i className="small material-icons">arrow_back</i></Link>
                      <div className="row">
                        <div className="input-field col s12">
                          <input id="postTitle" type="text" className="validate" required pattern="^[a-zA-Z1-9].*" name="postTitle" value={this.state.postTitle} onChange={this.handleInputChange} />
                          <label htmlFor="postTitle">Title</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="input-field col s12">
                          <textarea id="postBody" name="postBody" className="materialize-textarea validate" required pattern="^[a-zA-Z1-9].*" value={this.state.postBody} onChange={this.handleInputChange}></textarea>
                          <label htmlFor="postBody">Body</label>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col s12">
                          <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.onSubmit}>
                            Submit<i className="material-icons right">send</i>
                          </button>
                        </div>
                      </div>
                    </form>
                  }

                </div>
                <LockScreen id="addPostLockScreen" ref={(lockScreen) => this.lockScreen = lockScreen} />
              </div>
            )
          }
        }

      </FirebaseContext.Consumer>
    )
  }
}

export default AddaPost;