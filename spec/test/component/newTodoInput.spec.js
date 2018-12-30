import React from "react";
import configureStore from "redux-mock-store";
import {mount} from "enzyme";
import {Provider} from "react-redux";
import {toBeEmpty} from "../../util/assert";
import {ADD_TODO} from "../../../src/constant/actionType";
import SmartNewTodoInput, {NewTodoInput} from "../../../src/component/newTodoInput";

expect.extend({toBeEmpty});

describe("New Todo Input Test", () => {
    let newTodoInput;
    let textInput, addButton;
    let addTodoSpy;

    describe("Normal New Todo Input Component", () => {
        beforeEach(() => {
            addTodoSpy = jest.fn();
            newTodoInput = mount(<NewTodoInput addTodo={addTodoSpy}/>);
        });

        it("should contain a text input and a add button", () => {
            textInput = newTodoInput.find("input[type='text']");
            addButton = newTodoInput.find("input[type='button']");

            expect(textInput).toBeDefined();
            expect(addButton).toBeDefined();
            expect(textInput.prop("placeholder")).toBe("Input you new TODO");
            expect(addButton.prop("value")).toBe("Add");
        });

        it("should not call addTodo function of props when click Add button while text input is empty", () => {
            addButton = newTodoInput.find("input[type='button']");

            addButton.simulate("click");
            expect(addTodoSpy).not.toHaveBeenCalled();
        });

        it("should call addTodo function of props when click Add button while text input has content", () => {
            textInput = newTodoInput.find("input[type='text']");
            addButton = newTodoInput.find("input[type='button']");
            textInput.instance().value = "Learn Spring Boot";
            addButton.simulate("click");

            expect(addTodoSpy).toHaveBeenCalledWith("Learn Spring Boot");
        });

        it("should text input be empty after add button clicked", () => {
            textInput = newTodoInput.find("input[type='text']");
            addButton = newTodoInput.find("input[type='button']");
            textInput.instance().value = "Learn Spring Boot";
            addButton.simulate("click");

            expect(textInput.instance().value).toBeEmpty();
        });
    });

    describe("Smart New Todo Input Component", () => {
        let store, state;

        beforeEach(() => {
            state = {};
            store = configureStore()(state);
        });

        it("should create a ADD_TODO Action with text input value as content when click add button", () => {
            const expectedAction = {type:ADD_TODO, content:"Learn Spring Boot"};

            newTodoInput = mount(
                <Provider store={store}>
                    <SmartNewTodoInput/>
                </Provider>
            );
            textInput = newTodoInput.find("input[type='text']");
            addButton = newTodoInput.find("input[type='button']");

            textInput.instance().value = "Learn Spring Boot";
            addButton.simulate("click");

            expect(store.getActions()).toContainEqual(expectedAction)
        });
    })
});
