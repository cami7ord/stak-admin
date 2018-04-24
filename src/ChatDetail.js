import React from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import * as firebase from 'firebase';

class ChatDetail extends React.Component {

    constructor(props) {
        super(props);

        this.ref = firebase.firestore().collection('chats').doc(props.match.params.chatId).collection('messages');
        this.unsubscribe = null;

        this.state = {
            id: '',
            hits: [],
            name: '',
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        console.log("Constructor", props.match.params.chatId);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        this.ref.add({
            message: this.state.value,
            name: "Camilo Baquero Jimenez",
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            uid: "fAgoNhcDp7e7ZisU9xboxm6Jc9t2"
        });
          
        this.setState({
            value: '',
        });

        event.preventDefault();
    }

    componentDidMount() {

        console.log("DidMount", this.state.ref);

        this.unsubscribe = this.state.ref.orderBy("timestamp").onSnapshot(function(snapshot) {

            var list = [];
      
            snapshot.forEach(function(doc) {
                list.push(<Message key={doc.id} id={doc.id} name={doc.data().name} message={doc.data().message} />);
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

        console.log("PrevState", prevState.ref.path);
        console.log("NewState", this.state.ref.path);

        if(prevState.ref.path !== this.state.ref.path) {

            this.unsubscribe();

            console.log("Subscribing to...", this.state.ref);

            this.ref = this.state.ref;
            this.unsubscribe = this.state.ref.orderBy("timestamp").onSnapshot(function(snapshot) {

                var list = [];

                snapshot.forEach(function(doc) {
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
                
                <div style={{
                    position: "absolute",
                    width: "80%",
                    bottom: 20}}>
                    
                    <form onSubmit={this.handleSubmit}>
                        <FormGroup controlId="formControlsTextarea">
                            <FormControl componentClass="textarea" placeholder="textarea" value={this.state.value} onChange={this.handleChange} />
                            <Button style={{ float: "right" }} type="submit">Enviar</Button>
                        </FormGroup>
                    </form>
                
                </div>

            </div>
        );
    }
}

const Message = (props) => (
    <div style={{textAlign: 'left', flexDirection:'row', flexWrap:'wrap'}}>
        <p> <span style={{color: '#707070'}}> {props.name}:</span> {props.message} </p>
    </div>
)

export default ChatDetail;