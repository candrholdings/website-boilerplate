'use strict';

var {React} = window,
    {PropTypes} = React;

export default React.createClass({
    propTypes: {
        onRemove: PropTypes.func
    },
    getDefaultProps: function () {
        return {
            onRemove: () => 0
        };
    },
    onClick: function (evt) {
        evt.preventDefault();
        this.props.onRemove();
    },
    render: function () {
        var that = this,
            {props} = that;

        return (
            <div className="ui-tag">
                {props.children}
                <button onClick={that.onClick}>&times;</button>
            </div>
        );
    }
});