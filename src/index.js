import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

// Our components
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

// API Key for YouTube stored in .env
const API_KEY = process.env.YOUTUBE_API_KEY;

// Create a new component.
// This component should produce some HTML.
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    YTSearch({key: API_KEY, term: 'surfboards'}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    return (
      <div>
        <SearchBar />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          // onVideoSelect={chosenVideo => this.setState({selectedVideo: chosenVideo})}
          onVideoSelect={selectedVideo => this.setState({selectedVideo})} // Refactor
          videos={this.state.videos}
        />
      </div>
    );
  }
}

// Take this component's generated HTML
// and put it on the page (in the DOM).
ReactDOM.render(<App />, document.querySelector('.container'));