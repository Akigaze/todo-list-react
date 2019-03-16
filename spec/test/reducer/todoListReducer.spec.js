import reducer from "../../../src/reducer/todoListReducer";
import * as actionType from "../../../src/constant/actionType";
import {ALL} from "../../../src/constant/filterType";

describe("Todo List Reducer Test", () => {
    let initialState;
    let studyTodo, sportTodo, cookTodo, todos;

    beforeEach(() => {
        studyTodo = {id:0, content:"Learn Spring Boot", completed:false};
        sportTodo = {id:1, content:"Run ten kilometer", completed:false};
        cookTodo = {id:2, content:"Hot pot", completed:false};
        todos = [studyTodo, sportTodo, cookTodo];

        initialState = {
            todos: [],
            filter: ALL
        }
    });

    it("should return initail state with todos and filter", () => {
        const state = reducer();

        expect(state).toHaveProperty("todos", []);
        expect(state).toHaveProperty("filter", ALL);
    });

    it("should add a todo to the todos of state when get ADD_TODO action", () => {
        const action = {type:actionType.ADD_TODO, todo:studyTodo};
        const expectTodo = {
            ...studyTodo,
            editing:false
        };
        const state = reducer(undefined, action);

        expect(state.todos).toHaveLength(1);
        expect(state.todos).toContainEqual(expectTodo);
    });

    it("should make todo be completed when get COMPLETE_TODO action", () => {
        const action = {type:actionType.COMPLETE_TODO, id:0};
        const state = reducer({todos, filter:ALL}, action);

        expect(state.todos).toContainEqual(expect.objectContaining({id:0, completed:true}));
        expect(state.todos).toContainEqual(expect.objectContaining({id:1, completed:false}));
        expect(state.todos).toContainEqual(expect.objectContaining({id:2, completed:false}));
    });

    it("should cancel a completed todo when get CANCEL_COMPLETED_TODO action", () => {
        const action = {type:actionType.CANCEL_COMPLETED_TODO, id:3};
        todos.push({id:3, content:"Learn React", completed:true});
        const state = reducer({todos, filter:ALL}, action);

        expect(state.todos).toContainEqual(expect.objectContaining({id:3, completed:false}));
        expect(state.todos).toContainEqual(expect.objectContaining({id:0, completed:false}));
        expect(state.todos).toContainEqual(expect.objectContaining({id:1, completed:false}));
        expect(state.todos).toContainEqual(expect.objectContaining({id:2, completed:false}));
    });

    it("should change the filter type when get CHANGE_FILTER action", () => {
        const action = {type:actionType.CHANGE_FILTER, filter:"COMPLETED"};
        const state = reducer(initialState, action);

        expect(state.filter).toEqual("COMPLETED");
        expect(state.todos).toEqual(initialState.todos);
    });

    it("should delete the specific todo by id when get DELETE_TODO action", () => {
        const action = {type:actionType.DELETE_TODO, id:1};
        const state = reducer({todos, filter:ALL}, action);

        expect(state.todos).toHaveLength(2);
        expect(state.todos[0]).toEqual(todos[0]);
        expect(state.todos[1]).toEqual(todos[2]);
    });

    it("should modify a specific todo content and end editing by id when get UPDATE_TODO_CONTENT action", () => {
        const action = {type:actionType.UPDATE_TODO_CONTENT, id:1, content: "Learn Go Language"};
        const state = reducer({todos, filter:ALL}, action);

        expect(state.todos).toHaveLength(3);
        expect(state.todos).toContainEqual(expect.objectContaining({id: 1, content: "Learn Go Language", editing: false }));
    });

    it("should change edit status to true when get a EDIT_START action", () => {
        const action = {type:actionType.EDIT_START, id:1};
        const state = reducer({todos, filter:ALL}, action);

        expect(state.todos).toContainEqual(expect.objectContaining({id: 1, editing: true}));
    });

    it("should replace all todos when get a REFRESH_TODOS action", () => {
        const newTodos = [
            {id:0, content:"Learn Spring Cloud", completed:false},
            {id:1, content:"Swim ten min", completed:false},
        ];
        const action = {type:actionType.REFRESH_TODOS, todos:newTodos};

        const state = reducer({todos, filter:ALL}, action);
        expect(state.todos).toEqual(newTodos);
    });
});
