import React from 'react';

export default function ProfileDocSummary (props) {
  return (
    <div>
      <div className="list-title" onClick={() => (props.onClick(props.doc.docName))}>{props.doc.docName}</div>
      <br/>
      <div>{props.doc.docDescription}</div>
      <hr/>
    </div>
  );
};