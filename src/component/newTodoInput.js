import React, {Component} from "react";
import {connect} from "react-redux";
import {newTodoAction} from "../action/todoListAction";

export class NewTodoInput extends Component {
    constructor(props) {
        super(props);
        this.textRef = React.createRef();
    }

    addNewTodo = () => {
        const {addTodo} = this.props;
        let textInput = his.textRef.current;
        const content = textInput.value;
        textInput.value = "";
        addTodo(content);
    }

    render(){
        return(
            <div>
                <input type="text" ref={this.textRef} placeholder="Input you new TODO"/>
                <input type="button" value="Add" onClick={this.addNewTodo}/>
            </div>
        )
    }
}

function mapPropsToDispatch(dispatch){
    return {
        addTodo: (content) => dispatch(newTodoAction(content))
    }
}

export default connect(undefined, mapPropsToDispatch)(NewTodoInput);
