import { useTheme } from "@mui/material/styles";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const CharacterCard = ({ character }) => {
    const theme = useTheme(); // ✅ Get the theme correctly

    if (!character || !character.thumbnail) {
        return <p>Loading character...</p>; // ✅ Prevents crashes
    }

    return (
        <Card sx={{ 
            maxWidth: 345,
            backgroundColor: theme.palette.background.paper, // ✅ Correct theme usage
            color: theme.palette.text.primary,
            border: `2px solid ${theme.palette.primary.main}`
        }}>
            <CardMedia
                component="img"
                height="140"
                image={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
            />
            <CardContent>
                <Typography variant="h5">{character.name || "Unknown Character"}</Typography>
                <Typography variant="body2">{character.description || "No biography available."}</Typography>
            </CardContent>
        </Card>
    );
};

export default CharacterCard;
