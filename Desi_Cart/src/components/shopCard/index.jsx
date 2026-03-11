import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
const ShopCard = ({ shop }) => {
  const url = shop?.images?.url; 

  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        height="194"
        image={url || "/no-image.png"}
        alt={shop?.shop || "shop image"}
      />

      <CardContent>
        <Typography
          component="div"
          fontWeight="bold"
          sx={{ p: 1 }}
          className="text-gray-700"
        >
          {shop?.shop}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {shop?.name}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          mt: "auto",
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
        }}
      >
        {/* Add buttons here later */}
      </CardActions>
    </Card>
  );
};

export default ShopCard;