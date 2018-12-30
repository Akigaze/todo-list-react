import React, {Component} from "react";
import {connect} from "react-redux";
import {isEmpty} from "lodash";
import {newTodoAction} from "../action/todoListAction";

export class NewTodoInput extends Component {
    constructor(props) {
        super(props);
        this.textRef = React.createRef();
    }

    addNewTodo = () => {
        const {addTodo} = this.props;
        let textInput = this.textRef.current;
        const content = textInput.value;
        if (!isEmpty(content)) {
            textInput.value = "";
            addTodo(content);
        }
    }

    render(){
        return(
            <div className="new-todo-input">
                <input type="text" className="input-text" ref={this.textRef} placeholder="Input you new TODO"/>
                <input type="button" className="add-btn" value="Add" onClick={this.addNewTodo}/>
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
