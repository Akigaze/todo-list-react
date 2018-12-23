import React from "react";
import configureStore from "redux-mock-store";
import {mount, shallow} from "enzyme";
import {Provider} from "react-redux";
import {ADD_TODO} from "../../../src/constant/actionType";
import SmartNewTodoInput, {NewTodoInput} from "../../../src/component/newTodoInput";

describe("New Todo Input Test", () => {
    let newTodoInput;
    let textInput, addButton;

    beforeEach(function() {

    });

    describe("Normal New Todo Input Component", () => {
        it("should contain a text input and a add button", function() {
            newTodoInput = shallow(<NewTodoInput/>);
            textInput = newTodoInput.find("input[type='text']");
            addButton = newTodoInput.find("input[type='button']");

            expect(textInput).toBeDefined();
            expect(addButton).toBeDefined();
            expect(textInput.prop("placeholder")).toBe("Input you new TODO");
            expect(addButton.prop("value")).toBe("Add");
        });
    });

    describe("Smart New Todo Input Component", () => {
        let store, state;

        beforeEach(function() {
            state = {};
            store = configureStore()(state);
        });

        it("should create a ADD_TODO Action with text input value as content when click add button", function() {
            const expectedAction = {type:ADD_TODO, content:"Learn Spring Boot"};

            newTodoInput = mount(<Provider store={store}><SmartNewTodoInput/></Provider>);
            textInput = newTodoInput.find("input[type='text']");
            addButton = newTodoInput.find("input[type='button']");

            textInput.instance().value = "Learn Spring Boot";
            addButton.simulate("click");

            const dispatchedAction = store.getActions();
            expect(dispatchedAction).toContainEqual(expectedAction)
        });

        xit("should text input be empty after add button clicked", function() {

        });
    })
});
