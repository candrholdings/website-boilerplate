import * as messageofthedayactions from 'flux/actions/messageofthedayactions';
import * as todosactions from 'flux/actions/todosactions';

var {
        ReactRedux
    } = window;

export default ReactRedux.connect(state => {
    var {messageOfTheDay, todos} = state;

    return {messageOfTheDay, todos};
})(window.React.createClass({
    componentDidMount: function () {
        this.props.dispatch(messageofthedayactions.fetchMessageOfTheDay());
    },
    getInitialState: function () {
        return {
            newTodo: 'Buy milk'
        };
    },
    onAddClick: function (evt) {
        this.props.dispatch(todosactions.addTodo(this.state.newTodo));
        this.setState({ newTodo: null });
    },
    onRemoveClick: function (id) {
        var todo = this.props.todos.find(todo => todo.get('id') === id);

        todo && this.setState({ newTodo: todo.get('text') });
        this.props.dispatch(todosactions.removeTodo(id));
    },
    onNewTodoChange: function (evt) {
        this.setState({ newTodo: evt.target.value });
    },
    render: function () {
        var that = this,
            {props, state} = that,
            {todos} = props;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>To-do List</h1>
                        <pre>{props.messageOfTheDay}</pre>
                        <ul>
                        {
                            todos && todos.map(todo => {
                                var id = todo.get('id');

                                return (
                                    <li key={id}>
                                        <button className="btn btn-sm" onClick={that.onRemoveClick.bind(null, id)}>
                                            <span className="glyphicon glyphicon-remove" />
                                        </button> {todo.get('text')}
                                    </li>
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
}));
