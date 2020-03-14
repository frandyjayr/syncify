import React, { Component } from 'react';
import './Sidebar.css';
import Search from '../../Components/Search/Search.js';
import SearchResults from '../../Components/Search/SearchResults.js';
import { Search as SpotifySearch} from 'react-spotify-api';
import { withRouter } from 'react-router-dom'

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchConfig: {
        options: {
          limit: 5
        },
        album: true,
        artist: true,
        playlist: true,
        track: true,
        query: ''
      },
      test: null
    };
  }

  HandleSearchChange = (event) => {
    this.setState({searchConfig:{...this.state.searchConfig, query: event.target.value}})
  }

  componentDidMount = () => {
    console.log(this.state)
  }

  shouldComponentUpdate = (nextProps, newState) => {
    if (this.state.searchConfig.query !== newState.searchConfig.query) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return(
      <div className='sidebar_container'>  
        <Search searchChange={this.HandleSearchChange}></Search>
        {this.state.searchConfig.query.length > 0 ? (
        <SpotifySearch {...this.state.searchConfig} children={(searchResult, loading, error) => {
          return searchResult ?
            <SearchResults data={searchResult}></SearchResults> : <div>Search for a song</div>}}>
        </SpotifySearch> ) : 
        <div>START SEARCHING</div>
        }
      </div>
    )
  }

        
};

export default withRouter(Sidebar);