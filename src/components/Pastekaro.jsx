import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import {
  removeFromPastes,
  updateToPastes,
} from '../redux/pasteSlice';

const Pastekaro = () => {
  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const [editId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState('');

  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard!');
  };

  const handleShare = (paste) => {
    const url = `${window.location.origin}/paste/${paste._id}`;
    navigator.clipboard.writeText(url);
    toast.success('Link copied!');
  };

  const handleEdit = (paste) => {
    setEditId(paste._id);
    setEditContent(paste.content);
  };

  const handleSave = (paste) => {
    const updated = { ...paste, content: editContent };
    dispatch(updateToPastes(updated));
    setEditId(null);
    toast.success('Paste updated!');
  };

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
    toast.success('Paste deleted!');
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '30px auto',
      background: '#1f1f1f',
      borderRadius: '12px',
      padding: '25px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
      color: '#f1f1f1',
      fontFamily: 'Segoe UI, sans-serif',
    },
    searchInput: {
      width: '100%',
      padding: '12px',
      marginBottom: '20px',
      fontSize: '16px',
      borderRadius: '8px',
      border: '1px solid #444',
      backgroundColor: '#2c2c2c',
      color: '#e0e0e0',
    },
    paste: {
      border: '1px solid #333',
      borderRadius: '10px',
      padding: '15px',
      marginBottom: '20px',
      backgroundColor: '#2a2a2a',
    },
    title: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#ffffff',
      marginBottom: '10px',
    },
    content: {
      color: '#cccccc',
      fontSize: '15px',
      marginBottom: '10px',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      fontSize: '14px',
      borderRadius: '8px',
      border: '1px solid #555',
      backgroundColor: '#1c1c1c',
      color: '#e0e0e0',
      resize: 'none',
      marginBottom: '10px',
    },
    button: {
      marginRight: '8px',
      padding: '8px 12px',
      borderRadius: '8px',
      cursor: 'pointer',
      border: 'none',
      background: '#00bcd4',
      color: '#000',
      fontWeight: '600',
      fontSize: '14px',
      transition: 'background 0.3s',
    },
    buttonHover: {
      background: '#1de9b6',
    },
  };

  return (
    <div style={styles.container}>
      <Toaster position="top-center" />
      <input
        style={styles.searchInput}
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredPastes.map((paste) => (
        <div key={paste._id} style={styles.paste}>
          <h3 style={styles.title}>{paste.title}</h3>
          {editId === paste._id ? (
            <>
              <textarea
                style={styles.textarea}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <button
                onClick={() => handleSave(paste)}
                style={styles.button}
                onMouseOver={(e) =>
                  (e.target.style.background = styles.buttonHover.background)
                }
                onMouseOut={(e) =>
                  (e.target.style.background = styles.button.background)
                }
              >
                💾 Save
              </button>
              <button
                onClick={() => setEditId(null)}
                style={styles.button}
                onMouseOver={(e) =>
                  (e.target.style.background = styles.buttonHover.background)
                }
                onMouseOut={(e) =>
                  (e.target.style.background = styles.button.background)
                }
              >
                ❌ Cancel
              </button>
            </>
          ) : (
            <>
              <p style={styles.content}>{paste.content}</p>
              <button
                onClick={() => handleCopy(paste.content)}
                style={styles.button}
                onMouseOver={(e) =>
                  (e.target.style.background = styles.buttonHover.background)
                }
                onMouseOut={(e) =>
                  (e.target.style.background = styles.button.background)
                }
              >
                📋 Copy
              </button>
              <button
                onClick={() => alert(paste.content)}
                style={styles.button}
                onMouseOver={(e) =>
                  (e.target.style.background = styles.buttonHover.background)
                }
                onMouseOut={(e) =>
                  (e.target.style.background = styles.button.background)
                }
              >
                📄 View
              </button>
              <button
                onClick={() => handleShare(paste)}
                style={styles.button}
                onMouseOver={(e) =>
                  (e.target.style.background = styles.buttonHover.background)
                }
                onMouseOut={(e) =>
                  (e.target.style.background = styles.button.background)
                }
              >
                🔗 Share
              </button>
              <button
                onClick={() => handleEdit(paste)}
                style={styles.button}
                onMouseOver={(e) =>
                  (e.target.style.background = styles.buttonHover.background)
                }
                onMouseOut={(e) =>
                  (e.target.style.background = styles.button.background)
                }
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(paste._id)}
                style={styles.button}
                onMouseOver={(e) =>
                  (e.target.style.background = styles.buttonHover.background)
                }
                onMouseOut={(e) =>
                  (e.target.style.background = styles.button.background)
                }
              >
                🗑️ Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Pastekaro;
