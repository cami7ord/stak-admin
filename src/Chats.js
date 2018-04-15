import React from 'react';
import * as firebase from 'firebase';
import '@firebase/firestore'
import { ListGroupItem } from 'react-bootstrap';

class Chats extends React.Component {
    render() {
        return (
            <ListGroupItem href="#link1">{ this.props.name }</ListGroupItem>
        );
    }
}

export default Chats;