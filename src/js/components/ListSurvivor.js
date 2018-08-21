import React, { Component } from 'react';
import {connect} from 'react-redux';
import ReactTable from "react-table";
import Modal from 'react-modal';
import { getPeople, infectedSurvivor, updatePeople } from '../actions/people';
import SearchGeoCoding from './SearchGeoCoding';
import { Route, Link } from "react-router-dom";
// import { BrowserRouter as Router,  } from "react-router-dom";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '350px',
    height: '320px',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#app');

class List extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      changeitems: false,
      reportinfected: false,
      lonlat: '',
      survivor: null,
      filtervalue: '',
      reporter: null,
      infected: []
    }
    this.renderEditable = this.renderEditable.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.updatelonlat = this.updatelonlat.bind(this);
    this.filterbyname = this.filterbyname.bind(this);
    this.filtersurvivor = this.filtersurvivor.bind(this);
  }

  openModal(survivor) {
    this.setState({ modalIsOpen: true, survivor: survivor });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  filterbyname(e) {
    this.setState({
      filtervalue: e.target.value
    })
  }
  filtersurvivor(people) {
    
    console.log(this.state.filtervalue)
    return people.filter(p => {
      return String(p.name).toLocaleLowerCase().includes(String(this.state.filtervalue).toLocaleLowerCase())
    });
  }
  updatelonlat(lonlat) {
    this.setState({
      lonlat: lonlat.lat + ' ' + lonlat.lng
    })
  }
  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }
  selectReporter(e, reporter) {
    console.log('reporter', e.target.checked)
    if (e.target.checked) {
      this.setState({
        reporter: reporter
      })
    } else {
      this.setState({
        reporter: null
      })
    }
  }

  selectinfected(e, infected) {
    if(e.target.checked) {
      this.setState({
        infected: infected
      })
    } else {
      
    }
  }

  infectedSurvivor() {
    this.infectedSurvivor();
  }
  reportInfected() {

  }
  changeItems() {

  }

  sortByCreate(people) {
    const peoples = people.sort((a,b) => {
      return b.updated_at.localeCompare(a.updated_at);
    })
    return peoples;
  }

  render() {
    if (!this.props.people.length) {
      return false;
    }
    const data = this.state.filtervalue.length ? this.filtersurvivor(this.props.people) : this.sortByCreate(this.props.people);
    console.log('this.state.reporter', this.state.reporter);
    return (
      <div className="container margin--top">
        <div className="columns">
        <div className="column">
          <Link to={`/addsurvivor`} className="button">Add Survivor</Link>
          <button className="button margin-left" onClick={this.reportInfected}>Report Infected</button>
          <button className="button margin-left" onClick={this.changeItems}>Change Items</button>
        </div>
          <div className="column">
            <div className="form-control">
              <label htmlFor="filter" className="label"></label>
              <input type="text" className="input" onChange={this.filterbyname} placeholder="Search by name"/>
            </div>
          </div>
        </div>

        <ReactTable
          data={data}
          columns={[
            {
              Header: "Reporter",
              id:"reporter",
              accessor: d=>{
                return (
                  <div>
                    <input type="radio" name="repoter" onClick={(e) => { return this.selectReporter(e, d) }}/>
                  </div>
                )
              },
            },
            {
              Header: "Name",
              accessor: "name",
            },
            {
              Header: "Age",
              accessor: "age",
            },
            {
              Header: "Gender",
              accessor: "gender",
            },
            {
              Header: "Infected",
              id: "infected?",
              accessor: d=>{
                // console.log('d.infected?', d);
                const checkedbox = this.state.infected.name === d.name ? 'checked=checked' : 'checked'
                if(d['infected?']) {
                  return (
                    <label className="label">
                      <input type="checkbox" checked="checked" disabled="disabled" />
                    </label>
                  )
                }
                return (
                  <label className="label">
                    <input type="checkbox" className="infectedsurvivors" {...checkedbox} onChange={(e) => {this.selectinfected(e,d)}} />
                  </label>
                )
              },
            },
            {
              Header: "Location",
              id:'lonlad',
              accessor: d=>{
                // console.log(typeof d.lonlat, d.lonlat)
                let lonlat = '';
                if (typeof d.lonlat === "string") {
                  lonlat = d.lonlat.split(' ');
                  lonlat = lonlat[1].replace('(', "") + ' ' + lonlat[2].replace(')', "")
                }
                // console.log(lonlat);
                return (
                  <div className="form-control">
                    <button onClick={() => {return this.openModal(d)}} className="button">See location</button>
                  </div>
                )
              },
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Change Locaction"
        >
          <SearchGeoCoding updatelonlat={this.updatelonlat} updatePeople={this.props.updatePeople} survivor={this.state.survivor} height='250px' closeModal={this.closeModal}  />
        </Modal>
        <Modal
          isOpen={this.state.reportinfected}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Report Infected"
        >
          colocar conteudo do component de trocas aqui
        </Modal>
        <Modal
          isOpen={this.state.changeitems}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Change Items"
        >
          colocar conteudo do component de trocas aqui
        </Modal>
      </div>
    );
  }
  componentDidMount() {
    this.props.getPeople();
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    people: state.people
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getPeople: () => { dispatch(getPeople()) },
    updatePeople: (survivorinfo) => { dispatch(updatePeople(survivorinfo)) },
  }
}

const ListSurvivor = connect(mapStateToProps, mapDispatchToProps)(List)


export {ListSurvivor, List};