import React from 'react';
import './App.css';
import { Logger } from 'ts-lib-logger'
import { DownloadOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';



Logger.getInstance().subscribe((data) => {
  notification.error({
    message: `${data.errorType} (${data.error.code})`,
    description: `${data.message} \n 
    ${data.source} \n
    ${data.lineno} ${data.colno}`
  });
})

function CustomException(message) {
  const error = new Error(message);
  error.code = "404";
  return error;
}
CustomException.prototype = Object.create(Error.prototype);

function App() {
  const getError = React.useCallback(
    () => {
      throw new CustomException('Custom Error!')
    }, [])

  return (
    <div className="App">
      <Button
        type="primary"
        shape="round"
        icon={<DownloadOutlined />}
        size="large"
        onClick={getError}
      >PUSH ME</Button>
    </div>
  );
}

export default App;
