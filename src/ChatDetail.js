import React from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import * as firebase from 'firebase';

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

                list.push(<Message key={change.doc.id} id={change.doc.id} name={change.doc.data().name} message={change.doc.data().message} />);

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

                snapshot.forEach((doc) => {
                    list.push(<Message key={doc.id} id={doc.id} name={doc.data().name} message={doc.data().message} />);
                });
    
                this.setState({
                    hits: list
                });
        
            }.bind(this));
        }

    }

    render() {
        const hits = this.state.hits;
        console.log("Rendering...", this.state.id);
        return (
            <div>
                <h3>{this.state.name}</h3>
                <br/>
                {hits}
                <MessageForm />
            </div>
        );
    }
}

const Message = (props) => (
    <div style={{textAlign: 'left', flexDirection:'row', flexWrap:'wrap'}}>
        <p> <span style={{color: '#707070'}}> {props.name}:</span> {props.message} </p>
    </div>
)

const MessageForm = (props) => (
    <div style={{
        position: "absolute",
        width: "80%",
        bottom: 20
      }}>
        
        <form>
            <FormGroup controlId="formControlsTextarea">
                <FormControl componentClass="textarea" placeholder="textarea" />
            </FormGroup>
        </form>

        <Button style={{ float: "right" }} type="submit" >Enviar</Button>
    
    </div>
)

export default ChatDetail;