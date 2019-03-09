import React, {Component} from "react";
import {isFunction} from "lodash";
import {toBool} from "../util/boolUtil";

export class FilterButton extends Component{
    constructor(props){
        super(props);
    }

    buttonClick = () => {
        const {id, clicked, handleClick} = this.props;
        const nextClicked = !toBool(clicked);
        if (nextClicked && isFunction(handleClick)){
            handleClick(id, nextClicked);
        }
    };

    render(){
        const {text, clicked} = this.props;
        const cssClass = toBool(clicked) ? "filter-clicked" : "filter-unclicked";
        return(
            <input type="button" className={cssClass} value={text} onClick={this.buttonClick}/>
        )
    }
}

FilterButton.defaultProps = {
    clicked: false,
    text: ""
};