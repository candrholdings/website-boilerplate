var store = window.App.Page.store = Reflux.createStore({
    listenables: [Actions],
    mixins: [
        window.App.Mixins.StoreProperties({
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
