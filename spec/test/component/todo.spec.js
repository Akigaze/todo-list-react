import React from "react";
import {shallow, mount} from "enzyme";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {COMPLETE_TODO, CANCEL_COMPLETED_TODO, DELETE_TODO} from "../../../src/constant/actionType";
import SmartTodo, {Todo} from "../../../src/component/todo";
import {EDIT_OK, EDIT_PEN, X_DELETE} from "../../../src/constant/Characters";

describe("Todo", () => {
    let todo, todoContent, deleteIcon, editIcon;
    let todoProps, deleteTodoSpy;

    describe("Normal Todo Component", () => {
        beforeEach(() => {
            todoProps = {
                id: 1,
                completed: false,
                content: "Learn React",
                updateTodo: jest.fn()
            };
            deleteTodoSpy = jest.fn();
            todo = shallow(<Todo {...todoProps} deleteTodo={deleteTodoSpy}/>);
            todoContent = todo.find(".todo-content");
            deleteIcon = todo.find("DeleteIcon");
            editIcon = todo.find("EditIcon");
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
        });

        it("should be completed style when a todo has already completed", () => {
            todoProps.completed = true;
            todo = shallow(<Todo {...todoProps}/>);
            const checkbox = todo.find("input[type='checkbox']");
            const content = todo.find("span");

            expect(checkbox.prop("checked")).toBe(true);
            expect(content).toHaveClassName("todo-completed");
        });

        it("should change to checked style when click a undone todo", () => {
            todoContent.simulate("click");

            const checkbox = todo.find("input[type='checkbox']");
            const content = todo.find("span");

            expect(checkbox.prop("checked")).toBe(true);
            expect(content).toHaveClassName("todo-completed");
        });

        it("should change to unde style when click a completed todo", () => {
            todo.setState({completed: true});
            todoContent.simulate("click");

            const checkbox = todo.find("input[type='checkbox']");
            const content = todo.find("span");

            expect(checkbox.prop("checked")).toBe(false);
            expect(content).toHaveClassName("todo-undo");
        });

        it("should checkbox be readOnly", () => {
            const checkbox = todo.find("input[type='checkbox']");

            expect(checkbox.prop("readOnly")).toBe(true);
        });

        it("should call updateTodo function of props when click", () => {
            todoContent.simulate("click");

            expect(todoProps.updateTodo).toHaveBeenCalledWith(1, true);
        });

        it("should show a edit icon and a delete icon when hover", () => {
            expect(editIcon.prop("visible")).toBeFalsy();
            expect(deleteIcon.prop("visible")).toBeFalsy();

            todo.simulate("mouseover");
            editIcon = todo.find("EditIcon");
            deleteIcon = todo.find("DeleteIcon");

            expect(editIcon.prop("visible")).toBeTruthy();
            expect(editIcon.prop("value")).toBe(EDIT_PEN);
            expect(deleteIcon.prop("visible")).toBeTruthy();
            expect(deleteIcon.prop("value")).toBe(X_DELETE);
        });

        it("should hide edit icon and delete icon when mouse out", () => {
            todo.setState({hovered:true});
            editIcon = todo.find("EditIcon");
            deleteIcon = todo.find("DeleteIcon");
            expect(editIcon.prop("visible")).toBeTruthy();
            expect(deleteIcon.prop("visible")).toBeTruthy();

            todo.simulate("mouseout");
            editIcon = todo.find("EditIcon");
            deleteIcon = todo.find("DeleteIcon");

            expect(editIcon.prop("visible")).toBeFalsy();
            expect(deleteIcon.prop("visible")).toBeFalsy();
        });

        it("should call the clickDeleteIcon function of props with todo id when click deleteIcon", () => {
            todo.setState({hovered:true});
            deleteIcon = todo.find("DeleteIcon").shallow();
            deleteIcon.simulate("click");

            expect(deleteTodoSpy).toHaveBeenCalledWith(1);
        });

        xit("should edit icon keep showing and display check char after clicked", () => {
            todo.setState({hovered: true});
            editIcon = todo.find("EditIcon").shallow();

            editIcon.simulate("click");
            todo.setState({hovered: false});
            editIcon = todo.find("EditIcon");

            expect(editIcon.prop("visible")).toBeTruthy();
            expect(editIcon.prop("value")).toBe(EDIT_OK);
        });

        xit("should todo becomes editable when click EditIcon", () => {
            todo.setState({hovered: true});
            let todoText = todoContent.find("span");
            expect(todoText.prop("contentEditable")).toBeFalsy();

            todo.find("EditIcon").shallow().simulate("click");
            todoText = todo.find(".todo-content").find("span");

            expect(todoText.prop("contentEditable")).toBeTruthy();
        });
    });

    describe("Smart Todo Component", () => {
        let store, state;

        beforeEach(() => {
            todoProps = {
                id: 1,
                completed: false,
                content: "Learn React"
            };
            state = {};
            store = configureStore()(state);
        });

        it("should create a COMPLETE_TODO Action when click a undo todo", () => {
            todo = mount(
                <Provider store={store}>
                    <SmartTodo {...todoProps}/>
                </Provider>
            );

            todo.find(".todo-content").simulate("click");
            expect(store.getActions()).toContainEqual({type:COMPLETE_TODO, id:1})
        });

        it("should create a CANCEL_COMPLETED_TODO Action when click a completed todo", () => {
            todoProps.completed = true;
            todo = mount(
                <Provider store={store}>
                    <SmartTodo {...todoProps}/>
                </Provider>
            );

            todo.find(".todo-content").simulate("click");
            expect(store.getActions()).toContainEqual({type:CANCEL_COMPLETED_TODO, id:1})
        });

        it("should create a DELETE_TODO Action when click the delete icon", () => {
            todo = mount(
                <Provider store={store}>
                    <SmartTodo {...todoProps}/>
                </Provider>
            );
            todo.find("Todo").setState({hovered:true});
            todo.find(".delete-icon").simulate("click");

            expect(store.getActions()).toContainEqual({type:DELETE_TODO, id:1})
        });
    });
});
