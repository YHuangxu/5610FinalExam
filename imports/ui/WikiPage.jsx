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
      history:[]

    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }



  onChange(e){
    this.setState(
      {
        [e.target.id]: e.target.value
      }
    );
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
          let history = [];
          history.push(this.state.search);
          this.setState({
            allData: res,
            title: res.title,
            text: res.text,
            links: res.links,
            history: history
          })
        }
      });
    }

    if (e.target.id === "linkSearch") {
      let newSearch = e.target.value;
      Meteor.call("wiki.getData", newSearch, (err, res) => {
        if (err) {
          alert("There was error updating check the console");
          console.log(err);
          return;
        } else {
          let history = this.state.history;
          history.push(newSearch);
          console.log(res);
          this.setState({
            allData: res,
            title: res.title,
            text: res.text,
            links: res.links,
            history: history
          })
        }
      });
    }

    if (e.target.id === "historySearch") {
      let newSearch = e.target.value;
      Meteor.call("wiki.getData", newSearch, (err, res) => {
        if (err) {
          alert("There was error updating check the console");
          console.log(err);
          return;
        } else {
          let history = this.state.history;
          let newHistory = [];
          for (var i = 0; i < history.length; i++) {
            if (history[i] == newSearch) {
                newHistory = history.slice(0, i + 1);
            }
          }
          this.setState({
            allData: res,
            title: res.title,
            text: res.text,
            links: res.links,
            history: newHistory
          })
        }
      });
    }


  }
  getLink(data) {
    let array = data["*"].split(" ");
    let cur = "#";
    for (var i = 0; i < array.length - 1; i++) {
      cur= cur.concat(array[i],"_");
    }
    cur = cur.concat(array[array.length - 1]);
    return cur;
  }
  getKey() {
   return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  }

  render() {
    //console.log("this.state.search", this.state.search);
    //console.log("this.state.allData",this.state.allData ? this.state.allData : "");
    //console.log("this.state.text", this.state.allData ? this.state.text["*"]:""); //works!
    //console.log("this.state.links", this.state.allData ? this.state.links[0]:"");
    //<a href="#Automatic_conversion_of_wikitext_with_the_pipe_trick">pipe trick</a>
    // const s = this.state.text ? this.state.text["*"]:null;
    // const temp = document.createElement('div');
    // temp.innerHTML = s;
    // const htmlObject = temp.firstChild;
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

        <div className = "row">
        <div className = "col-12">
        <h4>Search History:</h4>
          {this.state.history.map(data=>(
            <button key ={this.getKey()} id="historySearch" value={data} onClick = {this.onSubmit}> {data}</button>
            ))}
          </div><br/>
        </div>
        <div className = "row">
        {!this.state.allData ? null:
         (<div className = "row">
          
          <div className = "col-4">
           <section className="form-elegant scrollbar-light-blue">

          <h4>Links:</h4>
          {this.state.links.map(data=>(
            <button key ={this.getKey()} id="linkSearch" value={data["*"]} onClick = {this.onSubmit} href={this.getLink(data)}> {data["*"]}</button>
            ))}
          </section>
         </div>
         <div className = "col-8">
         <h1>{this.state.title}</h1><br/>
          <h4>Content:</h4>
          <div dangerouslySetInnerHTML={{__html:this.state.text["*"]}} />
          </div>
          </div>)
        }
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