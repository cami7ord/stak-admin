import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, Jumbotron, Button, ListGroup, Grid, Row } from 'react-bootstrap';
import * as firebase from 'firebase';
import Chats from './Chats';

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

        list.push(<Chats key={change.doc.id} name={change.doc.data().title} />);

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

                {this.state.chats}
                <Chats name={"cami7ord@gmail.com"} />
                <Chats name={"oscargq10@gmail.com"} />
                <Chats name={"xiaoxiao2007@hotmail.com"} />
                
              </ListGroup>

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
