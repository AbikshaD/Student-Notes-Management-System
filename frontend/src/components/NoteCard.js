import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notesAPI } from '../services/api';

const NoteCard = ({ note, onDelete }) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleEdit = () => {
    navigate(`/edit/${note._id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setIsDeleting(true);
      try {
        await notesAPI.deleteNote(note._id);
        onDelete(note._id);
      } catch (error) {
        console.error('Error deleting note:', error);
        alert('Failed to delete note');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h3 style={styles.title}>{note.title}</h3>
        <div style={styles.date}>{formatDate(note.createdAt)}</div>
      </div>
      
      <div style={styles.content}>
        <p>{note.content}</p>
      </div>
      
      <div style={styles.cardFooter}>
        <div style={styles.updated}>
          Last updated: {formatDate(note.updatedAt)}
        </div>
        <div style={styles.actions}>
          <button 
            onClick={handleEdit} 
            style={styles.editBtn}
            disabled={isDeleting}
          >
            Edit
          </button>
          <button 
            onClick={handleDelete} 
            style={styles.deleteBtn}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    borderLeft: '4px solid #4f46e5',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '15px',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0,
    flex: 1,
  },
  date: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginLeft: '10px',
  },
  content: {
    color: '#4b5563',
    lineHeight: '1.6',
    marginBottom: '20px',
    maxHeight: '150px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '15px',
    borderTop: '1px solid #e5e7eb',
  },
  updated: {
    fontSize: '0.75rem',
    color: '#9ca3af',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  editBtn: {
    padding: '6px 12px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s ease',
  },
  deleteBtn: {
    padding: '6px 12px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s ease',
  },
};

export default NoteCard;