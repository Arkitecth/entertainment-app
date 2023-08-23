import mongoose from "mongoose";


const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true, 
            unique: true, 
            max: 50,
        },

        password: {
            type: String, 
            required: true, 
            min: 5,
        },
    }, 
    {timestamps:true} 
); 

const MovieSchema = new mongoose.Schema( 
    {
        movies: {
            type: Array, 
            default: []
        },

        series: {
            type: Array, 
            default: []
        }
    }
)


const User = mongoose.model('User', UserSchema); 
export default User