require("dotenv").config();

const cloudinary=require("./config/cloudinary");


cloudinary.uploader.upload(
"./test.pdf",
{
folder:"SkillSphere/Test",
resource_type:"auto"
}
)
.then(result=>{
console.log(result.secure_url);
})
.catch(err=>{
console.log(err);
});