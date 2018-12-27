import React from "react";
import {shallow, mount} from "enzyme";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import SmartTodoList, {TodoList} from "../../../src/component/todoList";
import Todo from "../../../src/component/todo";
import {allEqualTo} from "../../util/assert";
import {ADD_TODO} from "../../../src/constant/actionType";
import {ALL} from "../../../src/constant/filterType";

expect.extend({allEqualTo})

describe("TodoList", () => {
    let todos;
    let todoList;
    let newTodoInput, todoGroup, filterGroup;

    describe("Normal TodoList Component", () => {
        beforeEach(() => {
            todos=[
                {id:0, completed:false, content:"Learn React"},
                {id:1, completed:false, content:"Learn Redux"},
                {id:2, completed:false, content:"Learn Jasmine"}
            ]
            todoList = shallow(<TodoList todos={todos}/>);

            newTodoInput = todoList.find("NewTodoInput");
            todoGroup = todoList.find("TodoGroup");
            filterGroup = todoList.find("FilterGroup");
        });

        it("should contain a NewTodoInput, a TodoGroup and a FilterGroup", () => {
            expect(newTodoInput).toBeDefined();
            expect(todoGroup).toBeDefined();
            expect(filterGroup).toBeDefined();
        });

        it("should contain All, Completed and Undo three filter buttons", () => {
            let filterButtons = filterGroup.shallow().find("input[type='button']");

            expect(filterButtons).toHaveLength(3);
            expect(filterButtons.at(0).prop("value")).toBe("All");
            expect(filterButtons.at(1).prop("value")).toBe("Completed");
            expect(filterButtons.at(2).prop("value")).toBe("Undo");
        });

        it("should contain specific Todo items accoding to todos", () => {
            const todoItems = todoGroup.shallow().find(Todo);

            expect(todoItems).toHaveLength(3);
            expect(todoItems.map(todo => todo.prop("completed"))).allEqualTo(false);
            expect(todoItems.at(0).prop("content")).toBe("Learn React");
            expect(todoItems.at(1).prop("content")).toBe("Learn Redux");
            expect(todoItems.at(2).prop("content")).toBe("Learn Jasmine");
        });
    });

    describe("Smart TodoList Component", () => {
        let store, state;
        beforeEach(() => {
            state = {todos};
            store = configureStore()(state);
        });

        it("should contain TodoGroup with todos props from store", () => {
            todoList = mount(<Provider store={store}><SmartTodoList/></Provider>)
            todoGroup = todoList.find("TodoGroup");

            expect(todoGroup.prop("todos")).toEqual(state.todos);
        });
    });
});
