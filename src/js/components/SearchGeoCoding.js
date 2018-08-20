import React, { Component} from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

/*
class SearchGeoCoding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: ''
    }

    this.handleSelect = this.handleSelect.bind(this)
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        
        this.props.updatelonlat(latLng)
      })
      .catch(error => console.error('Error', error));
  };
  render() {
    return (
      <div>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ... by cep or by address',
                  className: 'location-search-input input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
    );
  }
}
*/
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => <div className="marker">
  You was here
</div>;

class SearchGeoCoding extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: -22.813373199999997,
      lng: -47.2377045,
      zoom: 11
    }
    
    this.handleClick = this.handleClick.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this._render = this._render.bind(this);
    this.getLocation();
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>{
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log(position.coords);
        this.setState({
            lat: lat,
            lng: lng
        })
        this._render();
        this.props.updatelonlat({ lng: this.state.lng, lat:this.state.lat})
      });
    }
  }
  handleClick(e) {
    this.props.updatelonlat({ lng: e.lng, lat: e.lat })
    this.setState({ lng: e.lng, lat: e.lat })
    this.forceUpdate();
  }
  onchangemap() {

  }
  _render() {
    return (<GoogleMapReact
      bootstrapURLKeys={{ key: '' }}
      defaultCenter={{ lat: this.state.lat, lng: this.state.lng }}
      defaultZoom={this.state.zoom}
      onClick={(e) => this.handleClick(e)}
      _onChange={this.onchangemap}
    >
      <Marker
        lat={this.state.lat}
        lng={this.state.lng}
        text={'Kreyser Avrora'}
      />
    </GoogleMapReact>)
  }
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '500px', width: '100%' }}>
        {this._render()}
      </div>
    );
  }
}

export default SearchGeoCoding;