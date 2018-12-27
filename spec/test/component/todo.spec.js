import React from "react";
import {shallow} from "enzyme";
import Todo from "../../../src/component/todo";

describe("Todo", function() {
    let todo;
    let todoProps;
    describe("Normal Todo Component", function() {
        beforeEach(() => {
            todoProps = {
                id: 1,
                completed: false,
                content: "Learn React",
                unpdateTodo: jest.fn()
            }
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
        });

        it("should change to unde style when click a completed todo", () => {
            todo.setState({completed: true});
            todo.simulate("click");

            const checkbox = todo.find("input[type='checkbox']");
            const content = todo.find("span");

            expect(checkbox.prop("checked")).toBe(false);
            expect(content).toHaveClassName("todo-undo");
        })

        it("should checkbox be readOnly", function() {
            const checkbox = todo.find("input[type='checkbox']");

            expect(checkbox.prop("readOnly")).toBe(true);
        });

        it("should call unpdateTodo function of props when click", function() {
            todo.simulate("click");

            expect(todoProps.unpdateTodo).toHaveBeenCalledWith(1, true);
        });
    });

    describe("Smart Todo Component", function() {
    });

});
