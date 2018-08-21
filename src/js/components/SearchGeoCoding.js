import React, { Component} from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = () => <div className="marker">
  You was here
</div>;

class SearchGeoCoding extends Component {

  constructor(props) {
    super(props);
    if (typeof props.survivor !== "undefined" && typeof props.survivor.lonlat === "string") {
      let lonlat = props.survivor.lonlat.split(' ');
      lonlat = lonlat[1].replace('(', "") + ' ' + lonlat[2].replace(')', "")
      this.state ={
        lat: Number(lonlat.split(' ')[0]),
        lng: Number(lonlat.split(' ')[1]),
        zoom: 11
      }
    } else {
      this.state = {
        lat: -22.813373199999997,
        lng: -47.2377045,
        zoom: 11
      }
    }
    this.handleClick = this.handleClick.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.updatelocation = this.updatelocation.bind(this);
    this._render = this._render.bind(this);
    this.getLocation();
  }

  updatelocation(e) {
    e.preventDefault();
    
    // console.log(items)
    const survivor = {};
    const id = this.props.survivor.location.split('/')
    survivor.name = this.props.survivor.name + new Date().getTime();;
    survivor.age = this.props.survivor.age;
    survivor.gender = this.props.survivor.gender;
    survivor.lonlat = this.state.lng + ' ' + this.state.lat;
    survivor.id = id[id.length-1];
    this.props.updatePeople(survivor);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>{
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        if(!this.props.survivor) {
          console.log(position.coords);
          this.setState({
            lat: lat,
            lng: lng
          })
        }
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
      <div style={{ height: this.props.height ? this.props.height : '500px', width: '100%' }}>
        {this._render()}
        {this.props.survivor &&  <div className="submit">
          <button className="button" onClick={this.updatelocation}>Change Location</button>
        </div>}
      </div>
    );
  }
}

export default SearchGeoCoding;