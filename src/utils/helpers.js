export const formatDate = (timestamp) => {
  if (!timestamp) return 'N/A';
  
  if (timestamp.toDate) {
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const validateImage = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!validTypes.includes(file.type)) {
    return 'Invalid file type. Please upload JPG or PNG.';
  }
  
  if (file.size > maxSize) {
    return 'File size too large. Maximum 5MB.';
  }
  
  return null;
};

export const calculateConfidenceScore = (imageMatch = 0, descriptionMatch = 0, knowledgeMatch = 0) => {
  const { IMAGE_SIMILARITY, DESCRIPTION_MATCH, KNOWLEDGE_ACCURACY } = CONFIDENCE_WEIGHTS;
  
  const score = (
    imageMatch * IMAGE_SIMILARITY +
    descriptionMatch * DESCRIPTION_MATCH +
    knowledgeMatch * KNOWLEDGE_ACCURACY
  ) * 100;
  
  return Math.min(Math.round(score), 100);
};
