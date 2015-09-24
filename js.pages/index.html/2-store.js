import {default as StoreProperties} from "storeproperties";

export var store = window.Reflux.createStore({
    listenables: [Actions],
    mixins: [
        StoreProperties({
            todos: Immutable.List()
        })
    ],
    onAdd: function (newTodo) {
        this._setTodos(this._todos.push(newTodo));
    },
    onRemove: function (indexToRemove) {
        this._setTodos(this._todos.remove(indexToRemove));
    }
});
