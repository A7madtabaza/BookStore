const express=require("express")
const cors=require("cors")
const pool=require("./database")


const app=(express());
const PORT=9000;

app.use(cors())
app.use(express.json())

app.get("/user",async (req,res)=>{
try{
    const result=await pool.query(
        "select * from book where is_delete=false"
    );
    res.json(result.rows)
}
catch(error){
    res.status(400).json(error)
}
})

app.post('/user',async (req,res) => {
    try{
        const {title,author,date,description}=req.body;
    const result = await pool.query(
      "INSERT INTO book (title,author,date,description) VALUES ($1,$2,$3,$4)  RETURNING *",
      [title,author, date,description]
    );
    res.json(result.rows[0]);
}catch(error){
    res.status(400).json(error)
}
})
app.listen(PORT,()=>{
    console.log(`tis servar run in http://localhost:${PORT}`)
})