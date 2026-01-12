import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { notesAPI } from '../services/api';

const CreateNote = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    if (isEditMode) {
      fetchNote();
    }
  }, [id, navigate, isEditMode]);

  const fetchNote = async () => {
    try {
      const response = await notesAPI.getNoteById(id);
      setFormData({
        title: response.data.title,
        content: response.data.content,
      });
    } catch (error) {
      console.error('Error fetching note:', error);
      navigate('/dashboard');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      if (isEditMode) {
        await notesAPI.updateNote(id, formData);
      } else {
        await notesAPI.createNote(formData);
      }
      
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save note. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          {isEditMode ? 'Edit Note' : 'Create New Note'}
        </h2>
        
        {error && (
          <div style={styles.alert}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="title" style={styles.label}>Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Enter note title"
              maxLength="100"
            />
            <div style={styles.charCount}>
              {formData.title.length}/100 characters
            </div>
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="content" style={styles.label}>Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              style={styles.textarea}
              placeholder="Enter your note content..."
              rows="8"
            />
            <div style={styles.charCount}>
              {formData.content.length} characters
            </div>
          </div>
          
          <div style={styles.buttonGroup}>
            <button 
              type="button" 
              onClick={handleCancel}
              style={styles.cancelButton}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              style={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'Saving...' : isEditMode ? 'Update Note' : 'Create Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '40px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: '30px',
  },
  formGroup: {
    marginBottom: '25px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border-color 0.3s ease',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    transition: 'border-color 0.3s ease',
    resize: 'vertical',
    minHeight: '200px',
    fontFamily: 'inherit',
  },
  charCount: {
    textAlign: 'right',
    fontSize: '12px',
    color: '#6b7280',
    marginTop: '5px',
  },
  alert: {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'flex-end',
    marginTop: '30px',
  },
  cancelButton: {
    padding: '12px 24px',
    backgroundColor: '#6b7280',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  submitButton: {
    padding: '12px 24px',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default CreateNote;