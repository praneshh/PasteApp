import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const pasteId = searchParams.get('pasteId');
  const dispatch = useDispatch();

  function createPaste() {
    if (!title.trim() || !value.trim()) {
      toast.error('Both title and content are required!');
      return;
    }

    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
      toast.success('Paste updated!');
    } else {
      dispatch(addToPastes(paste));
      toast.success('Paste created!');
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div style={{
      maxWidth: '500px',
      margin: '30px auto',
      background: '#1f1f1f',
      borderRadius: '12px',
      padding: '25px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
      color: '#f1f1f1',
      fontFamily: 'Segoe UI, sans-serif',
    }}>
      <Toaster position="top-center" />
      <h2 style={{
        marginBottom: '20px',
        textAlign: 'center',
        fontSize: '24px',
        color: '#ffffff',
        fontWeight: '600'
      }}>
        {pasteId ? 'Update Your Paste' : 'Create a New Paste'}
      </h2>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          padding: '12px',
          width: '100%',
          borderRadius: '8px',
          border: '1px solid #444',
          marginBottom: '15px',
          fontSize: '16px',
          backgroundColor: '#2c2c2c',
          color: '#e0e0e0'
        }}
      />
      <textarea
        placeholder="Paste content here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          padding: '12px',
          width: '100%',
          height: '120px',
          borderRadius: '8px',
          border: '1px solid #444',
          fontSize: '16px',
          resize: 'none',
          backgroundColor: '#2c2c2c',
          color: '#e0e0e0',
          marginBottom: '15px'
        }}
      />
      <button
        onClick={createPaste}
        style={{
          padding: '12px 20px',
          background: '#00bcd4',
          color: '#000',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: 'pointer',
          width: '100%',
          fontWeight: '600',
          transition: 'background 0.3s',
        }}
        onMouseOver={(e) => (e.target.style.background = '#1de9b6')}
        onMouseOut={(e) => (e.target.style.background = '#00bcd4')}
      >
        {pasteId ? 'Update Paste' : 'Create Paste'}
      </button>
    </div>
  );
};

export default Home;
