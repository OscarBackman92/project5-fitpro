import React from 'react';
import { Spinner } from 'react-bootstrap';

const Avatar = ({ src, alt, size = 40, loading = false }) => {
  return (
    <div className="position-relative">
      <img
        src={src || '/api/placeholder/150/150'}
        alt={alt}
        className={`rounded-circle ${loading ? 'opacity-50' : ''}`}
        style={{ 
          width: `${size}px`, 
          height: `${size}px`, 
          objectFit: 'cover' 
        }}
      />
      
      {loading && (
        <div 
          className="position-absolute top-50 start-50 translate-middle"
        >
          <Spinner 
            animation="border" 
            variant="primary" 
            size="sm"
          />
        </div>
      )}
    </div>
  );
};

export default Avatar;