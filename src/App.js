import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, Jumbotron, Button, ListGroup, ListGroupItem, Grid, Row } from 'react-bootstrap';
import * as firebase from 'firebase';

class App extends Component {

  constructor() {
    super();
    
    this.ref = firebase.firestore().collection('todos');
    this.unsubscribe = null;
    
    this.state = {
      mensajes: 2,
      chats: [],
    };
  }

  componentDidMount() {
    const rootRef = firebase.firestore().collection('todos');
    rootRef.onSnapshot(function(snapshot) {
        snapshot.docChanges.forEach(function(change) {
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
    });
  }

  render() {
    return (

      <div className="App">
        
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Stak</h1>
        </header>

        <Grid>
          
          <Row>
            <Jumbotron className="mx-auto" style={{ width: 500, margin: 20 }}>
              <h1>Chats</h1>
              <p>
                Listado de los usuarios con conversaciones activas.
              </p>

              <ListGroup>
                <ListGroupItem href="#link1">Link 1</ListGroupItem>
              </ListGroup>

              <p>
                <Button bsStyle="primary">Learn more {this.state.mensajes}</Button>
              </p>
            </Jumbotron>
          </Row>

        </Grid>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        
      </div>

    );
  }
}

export default App;
