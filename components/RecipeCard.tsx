import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

interface RecipeCardProps {
  imageUrl: string;
  title: string;
  description: string;
  author: string;
  date: string;
  isFavorite?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  imageUrl,
  title,
  description,
  author,
  date,
  isFavorite = true,
}) => {
  return (
    <Card
      sx={{
        display: 'flex',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 2,
      }}
    >
      {/* Image Section */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          sx={{ width: 180, height: '100%', objectFit: 'cover' }}
          image={imageUrl}
          alt={title}
        />
        {isFavorite && (
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'white',
              color: 'gold',
              borderRadius: '50%',
              p: 0.5,
              boxShadow: 1,
            }}
          >
            <StarIcon />
          </IconButton>
        )}
      </Box>

      {/* Content Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 2 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {description}
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          sx={{ cursor: 'pointer', mb: 2 }}
        >
          See more
        </Typography>

        {/* Footer */}
        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2">
            <strong>Added by:</strong> {author}
          </Typography>
          <Typography variant="body2">
            <strong>Date:</strong> {date}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default RecipeCard;