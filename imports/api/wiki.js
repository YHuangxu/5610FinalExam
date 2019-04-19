import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";


export default Wiki = new Mongo.Collection("wiki");


if (Meteor.isServer) {
	var wikipedia = require("node-wikipedia");
	Meteor.methods({
      "wiki.getData"(term) {
      	let res = new Promise((resolve, reject) => {
          wikipedia.page.data(term, { content: true }, resolve);
        });
        console.log("res",res);
      	return new Promise((resolve, reject) => {
          wikipedia.page.data(term, { content: true }, resolve);
        });
      }
    });
  }

   

