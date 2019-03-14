"use strict";
var DOM = new function(){

   var i,tmp,
      $title = document.getElementById("title"),
      $body = document.getElementById("body"),
      $allNotes = document.getElementById("allNotes");

};

var IXDB = new function(){

   var i,tmp,
      req,db,objStore,
      dbName = "notes01",
      dbVersion = "1", 
      that = this;

   if (!('indexedDB' in window)){
      console.log("indexedDB not supported");
      return;
   }
   
   this.open = function(){
      req = window.indexedDB.open(
	 dbName,dbVersion);
      
      req.addEventListener("error",errorH,false);
      req.addEventListener("success",successH,false);
      req.addEventListener("upgradeneeded",upgradeneededH,false);
   };


   // when a new db is created
   // or the version is upgraded
   function upgradeneededH(e){
      console.log("req onupgradeneeded event");
      db = e.target.result;
      
      createTable("table01");
      addFirstTestEntry();
   }

   // when db exists
   function successH(e){
      console.log("req onsuccess event");
      db = e.target.result;
   }

   function errorH(e){
      console.log("req onerror event: ")
      console.log(e);
   }

   //
   //

   function createTable(table){
      objStore = db.createObjectStore(
	 table,
	 {keyPath: 'id', autoIncrement: true} );
   }

   this.addEntry = addEntry;
   function addEntry(title,body){

      objStore.createIndex(title,'title',{unique:false});
      objStore.createIndex(body,'body',{unique:false});
   }

   function addFirstTestEntry(){
      console.log("addFirstTestEntry()");
      addEntry("title for entry01 in table01 in notes02", 
	 "body for entry01 in table01 in notes02");
   }

};

window.addEventListener("load",app,false);
function app(){

   document.body.addEventListener("click",clickH,false); 

   IXDB.open();


}

function clickH(e){
   if(!e) var e = window.event;

   if(e.target.id === "createNewNote") {
      console.log("createNewNote button click");
   } else if (e.target.className === "deleteEntry"){
      console.log("deleteEntry button click");
   }
}
