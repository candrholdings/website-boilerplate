//jshint -W067

export default window.ReduxDevtools.createDevTools(
  <window.ReduxDevtoolsDockMonitor toggleVisibilityKey='H'
                                   changePositionKey='Q'>
    <window.ReduxDevtoolsLogMonitor />
  </window.ReduxDevtoolsDockMonitor>
);
