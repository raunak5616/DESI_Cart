const shopCard = ({shop}) =>{
    const {
    images: [{ url } = {}] = [],
  } = shop || {};
    return(
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
        alt={shop?.name || "product image"}
      />

      <CardContent>
        <Typography
          component="div"
          fontWeight="bold"
          sx={{ p: 1 }}
          className="text-gray-700"
        >
          {}
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
      </CardActions>
    </Card>
    )
}
export default shopCard;