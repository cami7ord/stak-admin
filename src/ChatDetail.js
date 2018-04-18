import React from 'react';
import * as firebase from 'firebase';

const API = 'https://hn.algolia.com/api/v1/search?query=';
const DEFAULT_QUERY = 'redux';

class ChatDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: "",
            hits: [],
            name: ""
        };

        console.log("Constructor", props.match.params.chatId);
    }
    
    componentDidMount() {

        console.log("DidMount", this.state.id);

        fetch(API + DEFAULT_QUERY)
        .then(response => response.json())
        .then(data => this.setState({ hits: data.hits }));

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("DerivedStateFromProps");
        console.log("Next Props:", nextProps);
        console.log("PrevState: ", prevState);

        return {
            id: nextProps.match.params.chatId,
            name: nextProps.match.params.chatId,
            hits: []
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate()");

        console.log("PrevState", prevState.hits.length);
        console.log("NewState", this.state.hits.length);

        if(prevState.hits.length !== this.state.hits.length) {
            console.log("Making the call", this.state);
            fetch(API + DEFAULT_QUERY)
            .then(response => response.json())
            .then(data => this.setState({ hits: data.hits }));
        }

      }

    render() {
        const { match } = this.props;
        const hits = this.state.hits;

        console.log("Rendering...", this.state.name);

        return (
            <div>
                <p> Hola {match.params.chatId} </p>
                {hits.map(hit =>
                <div key={hit.objectID}>
                    <a href={hit.url}>{hit.title}</a>
                </div>
                )}
            </div>
        );
    }
}

export default ChatDetail;