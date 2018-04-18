import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, Jumbotron, Button, ListGroup, Grid, Row } from 'react-bootstrap';
import * as firebase from 'firebase';
import Chats from './Chats';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ChatDetail from './ChatDetail';

class App extends Component {

  constructor() {
    super();
    
    this.ref = firebase.firestore().collection('chats');
    this.unsubscribe = null;
    
    this.state = {
      mensajes: 2,
      chats : []
    };
  }

  componentDidMount() {

    this.ref.onSnapshot(function(snapshot) {

      var list = [];

      snapshot.docChanges.forEach(function(change) {

        console.log(change.doc.id);

        list.push(<Chats key={change.doc.id} id={change.doc.id} name={change.doc.data().title} />);

        if (change.type === "added") {
            console.log("New chat: ", change.doc.data());
        }
        if (change.type === "modified") {
            console.log("Modified chat: ", change.doc.data());
        }
        if (change.type === "removed") {
            console.log("Removed chat: ", change.doc.data());
        }

      });

      this.setState({
        chats: list
      });

    }.bind(this));

  }

  render() {

    const { chats } = this.state.chats;

    return (

      <div className="App">
        
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Stak</h1>
        </header>

        <Router>
          <div style={{ display: "flex" }}>
            <Sidebar>
              {this.state.chats}
            </Sidebar>
            <Main>
              <h1>Welcome!</h1>
              <Route path="/chats/:chatId" component={ChatDetail}/>
            </Main>
          </div>
        </Router>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        
      </div>

    );
  }
}

const SidebarItem = (props) => (
  <div style = {{
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    padding: "5px 10px"
  }} {...props}/>
)

const Sidebar = (props) => (
  <div style = {{
    padding: "10px",
    width: "16%",
    background: "#f0f0f0",
    overflow: "auto"
  }} {...props}/>
)

const Main = (props) => (
  <div style={{
    flex: 1,
    padding: "10px"
  }}>
    <div style={{ padding: "20px"}} {...props}/>
  </div>
)

export default App;
