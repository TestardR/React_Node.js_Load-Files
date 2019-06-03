import React, { Component } from 'react';
import axios from 'axios';
import { Progress } from 'reactstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0
    };
  }

  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };

  onClickHandler = () => {
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    axios
      .post('http://localhost:8000/upload', data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
          });
        }
      })
      .then(res => {
        // then print response status
        console.log(res.statusText);
      });
  };

  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="col-md-12 mt-5">
            <div className="container">
              <form method="post" action="#" id="#">
                <div className="form-group files">
                  <label>Upload Your File </label>
                  <input
                    type="file"
                    className="form-control"
                    multiple=""
                    onChange={this.onChangeHandler}
                  />
                </div>
                <div class="form-group">
                  <Progress max="100" color="primary" value={this.state.loaded}>
                    {Math.round(this.state.loaded, 2)}%
                  </Progress>
                </div>
                <button
                  type="button"
                  className="btn btn-success btn-block"
                  onClick={this.onClickHandler}
                >
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
