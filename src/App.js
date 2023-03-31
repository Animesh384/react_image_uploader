import React, { useState } from 'react';

function ImageUploader() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileSelect = (event) => {
    setSelectedFiles([...selectedFiles, ...event.target.files]);
  }

  const handleFileDelete = (file) => {
    setSelectedFiles(selectedFiles.filter((f) => f !== file));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('images', selectedFiles[i]);
    }
    formData.append('username','2129011');
    formData.append('type','hrms');
    formData.append('obg','r23546rthyj');
    fetch('http://localhost:5000/api/upload/multiple', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        console.log('Form submitted successfully!');
      } else {
        console.error('Form submission failed.');
      }
    })
    .catch(error => {
      console.error('Error submitting form:', error);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <input type="file" multiple onChange={handleFileSelect} />
        <div style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column' }}>
          {selectedFiles.map((file, index) => (
            <div key={file.name}>
              <img src={URL.createObjectURL(file)} alt={file.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              <button type="button" onClick={() => handleFileDelete(file)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      <button type="submit">Upload</button>
    </form>
  );
}

export default ImageUploader;
