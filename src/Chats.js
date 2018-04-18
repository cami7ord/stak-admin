import React from 'react';
import * as firebase from 'firebase';
import '@firebase/firestore'
import { ListGroupItem } from 'react-bootstrap';
import { Link } from "react-router-dom";

class Chats extends React.Component {
    render() {
        return (
            <Link to={`/chats/${this.props.id}`}>
                <h4>Titulo: {this.props.name }</h4>
                <p> { this.props.id } </p>
            </Link>
        );
    }
}

export default Chats;