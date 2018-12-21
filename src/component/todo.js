import React, {Component} from "react";

export default class Todo extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const {content} = this.props;
        return(
            <p>
                <input type="checkbox" checked={false}/>
                <span className="todo-undo">{content}</span>
            </p>
        )
    }
}
