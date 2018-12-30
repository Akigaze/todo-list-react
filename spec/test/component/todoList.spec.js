import React from "react";
import {shallow, mount} from "enzyme";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import SmartTodoList, {TodoList} from "../../../src/component/todoList";
import Todo from "../../../src/component/todo";
import {allEqualTo} from "../../util/assert";
import * as actionType from "../../../src/constant/actionType";
import * as filterType from "../../../src/constant/filterType";

expect.extend({allEqualTo})

describe("TodoList", () => {
    let todos, filter, changeFilter;
    let todoList;
    let newTodoInput, todoGroup, filterGroup;

    describe("Normal TodoList Component", () => {
        beforeEach(() => {
            todos=[
                {id:0, completed:false, content:"Learn React"},
                {id:1, completed:false, content:"Learn Redux"},
                {id:2, completed:false, content:"Learn Jasmine"}
            ]
            filter = filterType.ALL;
            changeFilter = jest.fn();
            todoList = shallow(<TodoList todos={todos} filter={filter} changeFilter={changeFilter}/>);

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

        it("should render todoGroup with filtered todos by completed status as props", () => {
            todos=[
                {id:0, completed:false, content:"Learn React"},
                {id:1, completed:true, content:"Learn Redux"},
                {id:2, completed:false, content:"Learn Jasmine"}
            ];
            todoList.setProps({todos, filter:filterType.COMPLETED});
            todoGroup = todoList.find("TodoGroup");

            expect(todoGroup.prop("todos")).toHaveLength(1);
            expect(todoGroup.prop("todos")).toEqual([todos[1]]);
        });

        it("should call changeFilter function with value of props when click filter button", () => {
            let filterButtons = filterGroup.shallow().find("input[type='button']");

            filterButtons.at(0).simulate("click");
            expect(changeFilter).toHaveBeenCalledWith(filterType.ALL);
            filterButtons.at(1).simulate("click");
            expect(changeFilter).toHaveBeenCalledWith(filterType.COMPLETED);
            filterButtons.at(2).simulate("click");
            expect(changeFilter).toHaveBeenCalledWith(filterType.UNDO);
        });

        it("should ALL button be clicked style and other be unclicked style when render", () => {
            let filterButtons = filterGroup.shallow().find("input[type='button']");

            expect(filterButtons.at(0)).toHaveClassName("filter-clicked");
            expect(filterButtons.at(1)).toHaveClassName("filter-unclicked");
            expect(filterButtons.at(2)).toHaveClassName("filter-unclicked");
        });

        it("should be clicked style when a filter button be clicked and other be unclicked style", () => {
            let filterButtons = filterGroup.shallow().find("input[type='button']");
            filterButtons.at(1).simulate("click");
            filterGroup = todoList.find("FilterGroup");
            filterButtons = filterGroup.shallow().find("input[type='button']");

            expect(filterButtons.at(0)).toHaveClassName("filter-unclicked");
            expect(filterButtons.at(1)).toHaveClassName("filter-clicked");
            expect(filterButtons.at(2)).toHaveClassName("filter-unclicked");
        });
    });

    describe("Smart TodoList Component", () => {
        let store, state;
        beforeEach(() => {
            state = {todos, filter};
            store = configureStore()(state);
        });

        it("should contain props todos and filter from store", () => {
            todoList = mount(<Provider store={store}><SmartTodoList/></Provider>).find("TodoList");

            expect(todoList.prop("todos")).toEqual(state.todos);
            expect(todoList.prop("filter")).toEqual(state.filter);
        });

        it("should dispatch a change filter action when click filter button", () => {
            todoList = mount(<Provider store={store}><SmartTodoList/></Provider>)
            const filterButtons = todoList.find("FilterGroup").find("input[type='button']");

            filterButtons.at(0).simulate("click");
            filterButtons.at(1).simulate("click");
            filterButtons.at(2).simulate("click");
            const actions = store.getActions();

            expect(actions).toHaveLength(3);
            expect(actions[0]).toEqual({type:actionType.CHANGE_FILTER, filter:filterType.ALL});
            expect(actions[1]).toEqual({type:actionType.CHANGE_FILTER, filter:filterType.COMPLETED});
            expect(actions[2]).toEqual({type:actionType.CHANGE_FILTER, filter:filterType.UNDO});
        });
    });
});
