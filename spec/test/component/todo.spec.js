import React from "react";
import {shallow, mount} from "enzyme";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {COMPLETE_TODO, CANCEL_COMPLETED_TODO} from "../../../src/constant/actionType";
import SmartTodo, {Todo} from "../../../src/component/todo";

describe("Todo", () => {
    let todo;
    let todoProps;

    describe("Normal Todo Component", () => {
        beforeEach(() => {
            todoProps = {
                id: 1,
                completed: false,
                content: "Learn React",
                unpdateTodo: jest.fn()
            }
            todo = shallow(<Todo {...todoProps}/>);
        });

        it("should show a checkbox and a specific text", () => {
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

        it("should be completed style when a todo has already completed", () => {
            todoProps.completed = true;
            todo = shallow(<Todo {...todoProps}/>);
            const checkbox = todo.find("input[type='checkbox']");
            const content = todo.find("span");

            expect(checkbox.prop("checked")).toBe(true);
            expect(content).toHaveClassName("todo-completed");
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

        it("should checkbox be readOnly", () => {
            const checkbox = todo.find("input[type='checkbox']");

            expect(checkbox.prop("readOnly")).toBe(true);
        });

        it("should call unpdateTodo function of props when click", () => {
            todo.simulate("click");

            expect(todoProps.unpdateTodo).toHaveBeenCalledWith(1, true);
        });
    });

    describe("Smart Todo Component", () => {
        let store, state;

        beforeEach(() => {
            todoProps = {
                id: 1,
                completed: false,
                content: "Learn React"
            }
            state = {};
            store = configureStore()(state);
        });

        it("should create a COMPLETE_TODO Action with click a undo todo", () => {
            todo = mount(<Provider store={store}><SmartTodo {...todoProps}/></Provider>);

            todo.simulate("click");
            expect(store.getActions()).toContainEqual({type:COMPLETE_TODO, id:1})
        });

        it("should create a CANCEL_COMPLETED_TODO Action with click a completed todo", () => {
            todoProps.completed = true;
            todo = mount(<Provider store={store}><SmartTodo {...todoProps}/></Provider>);

            todo.simulate("click");
            expect(store.getActions()).toContainEqual({type:CANCEL_COMPLETED_TODO, id:1})
        });
    });

});
