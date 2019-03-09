import React from "react";
import {shallow, mount} from "enzyme";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import SmartTodoList, {TodoList} from "../../../src/component/todoList";
import Todo from "../../../src/component/todo";
import {allEqualTo} from "../../util/assert";
import * as actionType from "../../../src/constant/actionType";
import * as filterType from "../../../src/constant/filterType";

expect.extend({allEqualTo});

describe("TodoList", () => {
    let todos, filter, changeFilter;
    let todoList;
    let newTodoInput, todoGroup, filterGroup;

    beforeEach(() => {
        todos=[
            {id:0, completed:false, content:"Learn React"},
            {id:1, completed:false, content:"Learn Redux"},
            {id:2, completed:false, content:"Learn Jasmine"}
        ];
        filter = filterType.ALL;
    });

    describe("Normal TodoList Component", () => {
        beforeEach(() => {
            changeFilter = jest.fn();
            todoList = shallow(<TodoList todos={todos} filter={filter} changeFilter={changeFilter}/>);

            newTodoInput = todoList.find("Connect(NewTodoInput)");
            todoGroup = todoList.find(".todo-group");
            filterGroup = todoList.find(".filter-group");
        });

        it("should contain a NewTodoInput, a TodoGroup and a FilterGroup", () => {
            expect(newTodoInput.is("Connect(NewTodoInput)")).toBeTruthy();
            expect(todoGroup.is("div")).toBeTruthy();
            expect(filterGroup.is("div")).toBeTruthy();
        });

        it("should contain All, Completed and Undo three filter buttons", () => {
            let filterButtons = filterGroup.shallow().find("FilterButton");

            expect(filterButtons).toHaveLength(3);
            expect(filterButtons.at(0).prop("text")).toBe("All");
            expect(filterButtons.at(1).prop("text")).toBe("Completed");
            expect(filterButtons.at(2).prop("text")).toBe("Undo");
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

            expect(todoList.find("Connect(Todo)")).toHaveLength(1);
            expect(todoList.find("Connect(Todo)").at(0).props()).toEqual(todos[1]);
        });

        it("should ALL button be clicked style and other be unclicked style when render", () => {
            let filterButtons = filterGroup.find("FilterButton");

            expect(filterButtons.at(0).shallow()).toHaveClassName("filter-clicked");
            expect(filterButtons.at(1).shallow()).toHaveClassName("filter-unclicked");
            expect(filterButtons.at(2).shallow()).toHaveClassName("filter-unclicked");
        });

        it("should be clicked status when a filter button be clicked and other be unclicked style", () => {
            let filterButtons = todoList.find("FilterButton");
            filterButtons.at(1).shallow().simulate("click");
            filterButtons = todoList.find("FilterButton");

            expect(filterButtons.at(0).prop("clicked")).toBeFalsy();
            expect(filterButtons.at(1).prop("clicked")).toBeTruthy();
            expect(filterButtons.at(2).prop("clicked")).toBeFalsy();
        });

        it("should call changeFilter function of props when click an unclicked filter button", () => {
            let filterButtons = todoList.find("FilterButton");

            filterButtons.at(2).shallow().simulate("click");
            expect(changeFilter).toHaveBeenCalledWith(filterType.UNDO);
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
            todoList = mount(<Provider store={store}><SmartTodoList/></Provider>);
            const filterButtons = todoList.find("FilterButton");

            filterButtons.at(2).simulate("click");
            const actions = store.getActions();

            expect(actions).toHaveLength(1);
            expect(actions[0]).toEqual({type:actionType.CHANGE_FILTER, filter:filterType.UNDO});
        });
    });
});
