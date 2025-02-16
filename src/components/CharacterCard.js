import { ThemeContext } from "@emotion/react";
import {Card, CardContent, CardMedia, Typography } from "@mui/material";

const CharacterCard = ({ character }) => {
    return (
        <Card sx={{ maxWidth: 345,
            backgroundColor: ThemeContext.palette.background.paper,
            color: ThemeContext.palette.text.primary,
            border: `2px solid ${ThemeContext.palette.primary.main}`
        }}>
            <CardMedia
                component="img"
                height="140"
                image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
            />
            <CardContent>
                <Typography variant="h5">{character.name}</Typography>
                <Typography variant="body2">{character.description || "No biography available."}</Typography>
            </CardContent>
        </Card>
    );
};

export default CharacterCard;