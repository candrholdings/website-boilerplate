//jshint -W067

export default window.ReduxDevTools.createDevTools(
  <window.ReduxDevToolsDockMonitor toggleVisibilityKey='H'
                                   changePositionKey='Q'>
    <window.ReduxDevToolsLogMonitor />
  </window.ReduxDevToolsDockMonitor>
);
