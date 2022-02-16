import React, { RefObject, useState } from 'react';
import styles from './file-upload.module.scss';

interface FileMeta {
    name: string;
    size: number;
    type: string | null;
}


const Status = ({name, size, type}: FileMeta) => {
  return (
    <div className={styles.status}>
      <div className={styles.row}>
        name: {name}
      </div>
      <div className={styles.row}>
        size: {size}
      </div>
      <div className={styles.row}>
        type: {type}
      </div>
    </div>
  );
};

const FileUpload = () => {
  const fileInput: RefObject<HTMLInputElement> = React.createRef();

  const fileMeta:FileMeta = {
    name: '',
    size: 0,
    type: '',
  };

  const [state, setState] = useState(fileMeta); 

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    if(fileInput.current && fileInput.current.files) {
      const {name, size, type=' '} = fileInput.current.files[0];
      setState({
        name: name,
        size: size,
        type: type, 
      })
    } else {
      return ;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>FileUpload</h1>
      <div className="sub-title">
        <p>파일업로드 제어</p>
      </div>
      <div>
        <input type="file" ref={fileInput} />
      </div>
      <div>
        <button type="submit" >Submit</button>
      </div>
      <div>
        <Status {...state} />
      </div>
    </form>
  )
};

export default FileUpload;