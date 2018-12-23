import React from "react";
import {shallow} from "enzyme";
import Todo from "../../../src/component/todo";

describe("Todo", function() {
    let todo;
    let todoProps;

    beforeEach(() => {
        todoProps = {id:1, completed:false, content:"Learn React"}
        todo = shallow(<Todo {...todoProps}/>);
    });

    it("should show a checkbox and a specific text", function() {
        const checkbox = todo.find("input[type='checkbox']");
        const content = todo.find("span");

        expect(checkbox).toBeDefined();
        expect(content.text()).toBe("Learn React");
    });

    it("should be unde style when a todo has not been completed", () => {
        const checkbox = todo.find("input[type='checkbox']");
        const content = todo.find("span");

        expect(checkbox.prop("checked")).toBe(false);
        expect(content).toHaveClassName("todo-undo");
    })

    it("should change to checked style when click a undone todo", () => {
        todo.simulate("click");

        const checkbox = todo.find("input[type='checkbox']");
        const content = todo.find("span");

        expect(checkbox.prop("checked")).toBe(true);
        expect(content).toHaveClassName("todo-completed");
    })
});
