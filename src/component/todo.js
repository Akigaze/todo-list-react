import React, {Component} from "react";

export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completed:false
        };
    }

    clickTodo = () => {
        this.setState(preState => {
            return {completed:!preState.completed};
        });
    }

    render(){
        const {content} = this.props;
        const {completed} = this.state;
        const contentStyle = completed ? "todo-completed" : "todo-undo";

        return(
            <p onClick={this.clickTodo}>
                <input type="checkbox" checked={completed}/>
                <span className={contentStyle}>{content}</span>
            </p>
        )
    }
}
