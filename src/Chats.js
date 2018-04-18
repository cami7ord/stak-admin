import React from 'react';
import { Link } from "react-router-dom";

class Chats extends React.Component {
    render() {
        return (
            <Link to={`/chats/${this.props.id}`}>
                <p> { this.props.id } </p>
            </Link>
        );
    }
}

export default Chats;