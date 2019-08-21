import React from 'react';
import ReactDOM from 'react-dom';
import IframeWrapperExtension from './IframeWrapperExtension';

const app = document.createElement('div');
app.id = "iframe-extension-root";
document.body.appendChild(app);

ReactDOM.render(<IframeWrapperExtension 
    src={"https://lihkg-wysiwyg-editor.surge.sh/"}
    />, app);