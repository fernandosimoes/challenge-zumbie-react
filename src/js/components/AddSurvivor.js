import React, { Component } from 'react'
import {addPeople} from '../actions/people';
import { connect } from 'react-redux';
import SearchGeoCoding from './SearchGeoCoding';
import PropTypes from 'prop-types';


class Survivor extends Component {


  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      gender: '',
      items: {},
      lonlat: '1111',
    }

    this.formsubmit = this.formsubmit.bind(this);
    this.changename = this.changename.bind(this);
    this.changeage = this.changeage.bind(this);
    this.changegender = this.changegender.bind(this);
    this.changeitems = this.changeitems.bind(this);
    this.updatelonlat = this.updatelonlat.bind(this);
  }

  formsubmit(e) {
    e.preventDefault();
    console.log(this.state);
    const items = Object.keys(this.state.items).map(item => {
      console.log(item)
      return item + ':' + this.state.items[item] + ';'
    })
    // console.log(items)
    const formcontent = {};
    formcontent.name = this.state.name + new Date().getTime();;
    formcontent.age = this.state.age;
    formcontent.gender = this.state.gender;
    formcontent.items = items;
    formcontent.lonlat = this.state.lonlat;
    this.props.addPeople(formcontent);
  }

  updatelonlat(lonlat) {
    this.setState({
      lonlat: lonlat.lat + ' ' + lonlat.lng
    })
  }

  changename(e) {
    this.setState({
      name: e.target.value
    })
    console.log(this.state)
  }

  changeage(e) {
    this.setState({
      age: e.target.value
    })
    console.log(this.state)
  }
  changegender(e) {
    this.setState({
      gender: e.target.value
    })
    console.log(this.state)
  }
  changeitems(e) {
    let item = { ...this.state.items }
    item[e.target.name] = e.target.value;
    this.setState({ items: item })
  }
  fetchPlaces() {
    const { google, map } = this.props;
    const service = new google.maps.places.PlacesService(map);
    console.log(service);
  }

  render() {
    return (
      <div className="container margin--top">
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input className="input" type="text" placeholder="" onChange={this.changename} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="age" className="label">Age</label>
              <div className="control">
                <input type="text" className="input" id="age" onChange={this.changeage}/>
              </div>
            </div>
            <div className="field">
              <label htmlFor="gender" className="label">Gender</label>
              <div className="control">
                <div className="select">
                  <select onChange={this.changegender} value={this.state.value} >
                    <option>Select dropdown</option>
                    <option value="M">M</option>
                    <option value="F">F</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field is-clearfix">
              <label htmlFor="items" className="label">Items</label>
              <div className="control">
                <div className="checkbox--items">
                  <input type="text" className="input" name="water" onChange={this.changeitems} placeholder="How many water ex: 1"/>
                </div>
                <div className="checkbox--items">
                  <input type="text" className="input" name="food" onChange={this.changeitems} placeholder="How many food ex: 1" />
                </div>
                <div className="checkbox--items">
                  <input type="text" className="input" name="medication" onChange={this.changeitems} placeholder="How many medicine ex: 1" />
                </div>
                <div className="checkbox--items">
                  <input type="text" className="input" name="ammunition" onChange={this.changeitems} placeholder="How many ammunition ex: 1" />
                </div>
              </div>
            </div>
            <div className="submit">
              <button className="button is-primary" onClick={this.formsubmit}>Submit</button>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label htmlFor="map" className="label">Last Location</label>
              <div className="control">
                <input type="text" className="input" id="map" value={this.state.lonlat} />
              </div>
          </div>
          <div className="map" style={{width: '100%', height: '500px', position: 'relative'}}>
              <SearchGeoCoding updatelonlat={this.updatelonlat} />
            </div>
          </div>
        </div>
        
      </div>
    )
  }
}


Survivor.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  gender: PropTypes.string,
  items: PropTypes.string,
  lonlat: PropTypes.string,
}

const mapStateToProps = (state) => {
  return {}
}


const mapDispatchToProps = (dispatch) => {
  return {
      addPeople: (formcontent) => { dispatch(addPeople(formcontent))},
  }
}
// const googleMapsComponent = GoogleApiWrapper({ apiKey: '' })(Survivor)

const AddSurvivor = connect(mapStateToProps, mapDispatchToProps)(Survivor);

export {AddSurvivor, Survivor}