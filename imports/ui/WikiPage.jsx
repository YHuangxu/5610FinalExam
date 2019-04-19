import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Wiki } from "../api/wiki.js";


class WikiPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search:"",

    };

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getURL = this.getURL.bind(this);
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.allPhotos != prevProps.allPhotos) {
  //     this.updatePage();
  //   }
  // }

  // updatePage() {
  //   Meteor.call("photos.getData", this.state.search, (err, res) => {
  //     if (err) {
  //       alert("There was error updating check the console");
  //       console.log(err);
  //       return;
  //     } else {
  //       this.setState({
  //         allPhotos:res //data.data
  //       })
  //     }
  //   });
  // }

  onChange(e){
    this.setState(
      {
        [e.target.id]: e.target.value
      }
    );
  }

  onClick(e) {
    e.preventDefault();
    // let info = {
    //   name: "testDB"
    // }
    // if (e.target.id === "test") {
    //   Meteor.call("photos.test", info, (err, res) => {
    //     if (err) {
    //       alert("There was error updating check the console");
    //       console.log(err);
    //       return;
    //     } else {
    //       console.log("succeed",res);
    //     }
    //   });
    // }
  }

  onSubmit(e) {
    e.preventDefault();
    if (e.target.id === "searchFor") {
      Meteor.call("wiki.getData", this.state.search, (err, res) => {
        if (err) {
          alert("There was error updating check the console");
          console.log(err);
          return;
        } else {
          this.setState({
            allData:res //data.data
          })
        }
      });
    }

  }


  getURL(p) {
    //return "https://farm".concat(photo.farm.toString(),".staticflickr.com/",photo.server.toString(),"/",photo.id.toString(),"_",photo.secret.toString(),"_s.jpg");
    return "https://farm".concat(p.farm,".staticflickr.com/",p.server,"/",p.id,"_",p.secret,"_s.jpg");
  }

  //`https://farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${p.secret}_s.jpg`
  //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

  // ComponentDidMount(){
  //   this.renderPhotos();
  // }

  render() {
    console.log("this.state.search", this.state.search);
    console.log("this.state.allData",this.state.allData ? this.state.allData : "");
    return (
      <div className = "container">
        <div className = "row">
          <div className = "col-6"></div>
          <div className = "col-3">
            <input type="text" className="form-control inline" placeholder="searchFor" id="search" onChange = {this.onChange.bind(this)}/>
          </div>
          <div className = "col-3">
            <button type="button" className="btn btn-primary" id = "searchFor" onClick = {this.onSubmit}>search</button>
          </div> 
        </div>
      </div>
    );
  }
}

WikiPage.propTypes = {
  //ready: PropTypes.bool.isRequired
};

export default withTracker(() => {
  //const handle = Meteor.subscribe("allData");
  
  return {
    //allData: Wiki.find({}).fetch(), 
    //ready : handle.ready()
  };
})(WikiPage);