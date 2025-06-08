import React from 'react';
import {
  Card,
  CardMedia,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import Star from '@mui/icons-material/Star';
import StarBorder from '@mui/icons-material/StarBorder';

interface RecipeCardProps {
  name: string;
  imageUrl: string | File;
  title: string;
  description: string;
  date: string;
  isFavorite?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  name,
  imageUrl,
  title,
  description,
  date,
  isFavorite = false,
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
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          sx={{ width: 180, height: '100%', objectFit: 'cover' }}
          image={`/images/${imageUrl}`}
          alt={title}
        />
          <IconButton
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'gold',
              p: 0.5,
            }}
          >
            {isFavorite ? <Star /> : <StarBorder />}
          </IconButton>
      </Box>

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

        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2">
            <strong>Added by:</strong> {name}
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