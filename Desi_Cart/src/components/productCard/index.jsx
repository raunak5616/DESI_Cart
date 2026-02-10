import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
export default function RecipeReviewCard({ product }) {
   const onFavoriteClick = () => {
}
 const onCartClick = () => {
}
  return (
    <Card sx={{
      maxWidth: 345,
      boxShadow: 3,
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}>
      <CardMedia
        component="img"
        height="194"
        image={product?.images?.[0] || "/no-image.png"}
        alt={product?.title || "product image"}
      />
      <CardContent>
        <Typography fontWeight="bold" sx={{ p: 1, }}>
          <div className="text-gray-500">{product?.title}</div>
        </Typography>
        <Typography variant="body2" sx={{ p: 1, fontSize: '16px' }}>
          Price:   ₹{(product.price * 83).toFixed(0)}
        </Typography>
      </CardContent>
      <CardActions sx={{
        mt: "auto",
        display: "flex",
        justifyContent: "flex-end",
        gap: 1,
      }}>
        <Button
        
          color="error"
          sx={{
            minWidth: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => { onFavoriteClick(product) }}
        > <span class="material-symbols-outlined">
            favorite
          </span>
        </Button>

        <Button
          variant="outlined"
          color="error"
          sx={{
            minWidth: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => { onCartClick(product) }}
        >
          <span class="material-symbols-outlined">
           'shopping_cart'
            </span>

        </Button>
      </CardActions>
    </Card>
  );
}
