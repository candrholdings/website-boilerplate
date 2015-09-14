var Page = local.Page = React.createClass({
    mixins: [
        window.App.Mixins.StateFrom(store, {
            todos: store.getTodos
        })
    ],
    getInitialState: function () {
        return {
            newTodo: 'Buy milk'
        };
    },
    onAddClick: function (evt) {
        Actions.add(this.state.newTodo);
        this.setState({ newTodo: null });
    },
    onRemoveClick: function (index) {
        this.setState({ newTodo: this.state.todos.get(index) });
        Actions.remove(index);
    },
    onNewTodoChange: function (evt) {
        this.setState({ newTodo: evt.target.value });
    },
    render: function () {
        var that = this,
            {state} = that;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>To-do List</h1>
                        <ul>
                        {
                            state.todos.map((todo, index) => {
                                return (
                                    <li key={index}><button className="btn btn-sm" onClick={that.onRemoveClick.bind(null, index)}><span className="glyphicon glyphicon-remove" /></button> {todo}</li>
                                );
                            })
                        }
                        </ul>
                        <div className="input-group">
                            <input type="text" className="form-control" onChange={that.onNewTodoChange} value={state.newTodo} />
                            <div className="input-group-btn">
                                <button className="btn" disabled={!state.newTodo} onClick={that.onAddClick}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
