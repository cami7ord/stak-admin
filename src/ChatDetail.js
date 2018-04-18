import React from 'react';
import * as firebase from 'firebase';

const API = 'https://hn.algolia.com/api/v1/search?query=';
const DEFAULT_QUERY = 'redux';

class ChatDetail extends React.Component {

    constructor(props) {
        super(props);

        this.ref = firebase.firestore().collection('chats').doc(props.match.params.chatId).collection('messages');
        this.unsubscribe = null;

        this.state = {
            id: "",
            hits: [],
            name: ""
        };

        console.log("Constructor", props.match.params.chatId);
    }

    componentDidMount() {

        console.log("DidMount", this.state.ref);

        this.unsubscribe = this.state.ref.onSnapshot(function(snapshot) {

            var list = [];
      
            snapshot.docChanges.forEach(function(change) {

                list.push(<Message key={change.doc.id} id={change.doc.id} message={change.doc.data().message} />);

                if (change.type === "added") {
                    console.log("New message: ", change.doc.data());
                }
                if (change.type === "modified") {
                    console.log("Modified message: ", change.doc.data());
                }
                if (change.type === "removed") {
                    console.log("Removed message: ", change.doc.data());
                }
            });

            this.setState({
                hits: list
            });

        }.bind(this));

    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log("DerivedStateFromProps");
        console.log("Next Props:", nextProps);
        console.log("PrevState: ", prevState);

        return {
            id: nextProps.match.params.chatId,
            name: nextProps.match.params.chatId,
            hits: [],
            ref: firebase.firestore().collection('chats').doc(nextProps.match.params.chatId).collection('messages')
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate()");

        console.log("PrevState", prevState.ref);
        console.log("NewState", this.state.ref);

        if(prevState.id !== this.state.id) {

            this.unsubscribe();

            this.unsubscribe = this.state.ref.onSnapshot(function(snapshot) {

                var list = [];
          
                snapshot.docChanges.forEach(function(change) {
    
                    list.push(<Message key={change.doc.id} id={change.doc.id} message={change.doc.data().message} />);
    
                    if (change.type === "added") {
                        console.log("New message: ", change.doc.data());
                    }
                    if (change.type === "modified") {
                        console.log("Modified message: ", change.doc.data());
                    }
                    if (change.type === "removed") {
                        console.log("Removed message: ", change.doc.data());
                    }
                });
    
                this.setState({
                    hits: list
                });
        
            }.bind(this));
        }

    }

    render() {
        const { match } = this.props;
        const hits = this.state.hits;

        console.log("Rendering...", this.state.id);

        return (
            <div>
                {hits}
            </div>
        );
    }
}

const Message = (props) => (
    <div>
        <h4> Message: {props.message} </h4>
    </div>
)

export default ChatDetail;