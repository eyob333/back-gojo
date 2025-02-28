import 'dotenv/config'
import { connect, Schema, model} from "mongoose";
import { v2 as cloudnary} from "cloudinary"


const url_mongodb = "mongodb+srv://" + process.env.USERNAME_MONGODB + ":" +  process.env.PASSWORD_MONGODB + "@cluster0.qf4ue.mongodb.net/gojo_homes?retryWrites=true&w=majority&appName=Cluster0&"
// const url_cloudnary = ""
// const url = cloudnary.url('photo_2025-02-27_15-57-49_bxayef')
// console.log(url)

class DataBase{
    constructor(){
        this.intializations()

        //mongodb connectoin
        this.connect = connect(url_mongodb ||"mongodb://localhost:27017/gojo");

        //schemas 
        this.schemaPR = Schema({
            realEstate: {type: String},
            project: {type: String},
            price: {type: Number},
            image_urls: {
                main: {type: String},
                all: []
            },
            features: {
                area: {type: Number,  default: 0},
                pool: {type: Boolean, default: false},
                height: {type: Number, default: 0},
                type: {type: String,  default: ""},
                special: {type: String, default: ""},
                date: {type: Date}
            },

            location: {type: String},
            description: {type: String},
        })

        this.schemaRS = Schema({
            name: {type: String},
            rating: {type: Number},
            project: {
                name: {type: String},
                site: {type: String}
            },
            properties: {type: Number},
            image_urls: []
        })

        this.schemaCL = Schema({
            first_name: {type: String},
            last_name: {type: String},
            email: { type: String},
            phoneNum: {type: Number},
            location: {},
            
        })

        this.modelCL = model("users", this.schemaCL)
        this.modelRS = model("properties", this.schemaPR)
        this.modelPR = model("realEstate", this.schemaRS)

    }

    intializations(){
        cloudnary.config({
            cloud_name: "dufjxw9zz",
            api_key: process.env.CLOUDNARY_API_KEY,
            api_secret: process.env.CLOUDNARY_API_SECREAT,
            secure: true,
        })
        
    }


    addData(data){
        const response = this.modelCL(data)
        response.save()

        console.log(response)
    }

    async upload_imgae(){
        const results = await cloudnary.uploader.upload('./public/images/stock.jpg').catch( d => {
            console.log(d)
        })
        const url = cloudnary.url(results.public_id)
        console.log(url)
    }
 
    async findDb({filter, model}){
        const data = await this.modelRS.find()
        return data
    }
    
    async updateDb(){
        const response = await this.modelRS.updateManysave()     
        console.log(response)
    }
    
    
    async deleteDb(){
    
    }
    
}


export default DataBase