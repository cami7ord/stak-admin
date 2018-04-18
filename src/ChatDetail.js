import React from 'react';

class ChatDetail extends React.Component {

    render() {
        const {match} = this.props;
        return (
            <p> Hola {match.params.chatId} </p>
        );
    }
}

export default ChatDetail;