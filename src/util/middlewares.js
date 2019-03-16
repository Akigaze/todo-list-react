export const actionLog = ({dispatch, getState}) => next => action => {
    console.log("----------↓↓↓↓↓↓----------");
    console.log("action type:", action.type);
    console.log("state before dispatch:", JSON.stringify(getState()));
    next(action);
    console.log("state after dispatch:", JSON.stringify(getState()));
    console.log("----------↑↑↑↑↑↑----------");
};