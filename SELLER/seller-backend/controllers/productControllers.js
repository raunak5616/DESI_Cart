export const createProduct = async (req,res)=>{
    try{
        const{
            name,
            category,
            price,
            discount,
            stock,
            description,
        }= req.body;

        const image = req.file.map((file)=>
         ({
            url: file.path,
            public_id: file.filename
         })
        )

        const newProduct = new Product({
            name,
            category,
            price,
            discount,
            stock,
            description,
            image
        })
       const savedPorduct = await Product.create(newProduct);
        res.status(201).json({message:"Product created successfully", product: newProduct})
    }catch(error){
        res.status(500).json({message:"Failed to create product", error: error.message})
    }
}