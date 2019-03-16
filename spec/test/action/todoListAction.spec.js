import axios from "axios";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import {
    newTodoAction,
    updateTodoAction,
    changeFilterAction,
    deleteTodoAction,
    modifyTodoAction,
    editStartAction,
    loadTodoAction
} from "../../../src/action/todoListAction";
import * as actionType from "../../../src/constant/actionType";
import * as filterType from "../../../src/constant/filterType";
import {ACCEPT} from "../../../src/constant/httpStatus";

describe("Todo List Action Test", () => {
    describe("Plain Action", () => {
        it("should get a to complete todo action with todo id", () => {
            const action = updateTodoAction(1, true);

            expect(action).toEqual({type:actionType.COMPLETE_TODO, id:1});
        });

        it("should get a to cancel todo action with todo id", () => {
            const action = updateTodoAction(1, false);

            expect(action).toEqual({type:actionType.CANCEL_COMPLETED_TODO, id:1});
        });

        it("should get a change filter action with filter type", () => {
            const action = changeFilterAction(filterType.COMPLETED);

            expect(action).toEqual({type:actionType.CHANGE_FILTER, filter:filterType.COMPLETED});
        });

        it("should get a change filter action with ALL as default filter type", () => {
            const action = changeFilterAction();

            expect(action).toEqual({type:actionType.CHANGE_FILTER, filter:filterType.ALL});
        });

        it("should get a modify todo action with todo id and new content", () => {
            const action = modifyTodoAction(1, "Learn React");

            expect(action).toEqual({type:actionType.UPDATE_TODO_CONTENT, id:1, content: "Learn React"});
        });

        it("should get a edit start action with todo id", () => {
            const action = editStartAction(1);

            expect(action).toEqual({type:actionType.EDIT_START, id:1});
        });
    });

    describe("Async Action", () => {
        let mockStore;
        const studyTodo = {id:0, content:"Learn Spring Cloud", completed:false};
        const sportTodo = {id:0, content:"Run ten kilometer", completed:false};
        const todos = [studyTodo, sportTodo];

        beforeEach(() => {
            jest.spyOn(axios, "get").mockReturnValueOnce(Promise.resolve({ data: todos}));
            jest.spyOn(axios, "post").mockReturnValueOnce(Promise.resolve({ data: studyTodo}));
            jest.spyOn(axios, "delete").mockReturnValueOnce(Promise.resolve({ status: ACCEPT}));

            mockStore = configureMockStore([thunk])({});
        });

        it("should to dispatch a refresh todos action with new todos from server", async () => {
            const expectAction = {type:actionType.REFRESH_TODOS, todos};
            const action = loadTodoAction();
            await mockStore.dispatch(action);

            expect(axios.get).toHaveBeenCalledWith("/todos");
            expect(mockStore.getActions()).toEqual([expectAction]);
        });

        it("should send a new todo content to server and dispatch a new todo action", async () => {
            const expectAction = {type:actionType.ADD_TODO, todo:studyTodo};
            const action = newTodoAction("Learn Spring Cloud");
            await mockStore.dispatch(action);

            expect(axios.post).toHaveBeenCalledWith("/todos", {content:"Learn Spring Cloud"});
            expect(mockStore.getActions()).toEqual([expectAction]);
        });

        it("should dispatch a delete todo action with todo id and send to server", async () => {
            const expectAction = {type:actionType.DELETE_TODO, id:1};
            const action = deleteTodoAction(1);
            await mockStore.dispatch(action);

            expect(axios.delete).toHaveBeenCalledWith("/todos/1");
            expect(mockStore.getActions()).toEqual([expectAction]);
        });
    });
});
