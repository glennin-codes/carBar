import mongoose, { ConnectOptions }  from 'mongoose';

// interface IconnctionOption{
//     useNewUrlParser:boolean;
//     useCreateIndex: boolean;
//     useUnifiedTopology: boolean;
// }
// const connectionOption:IconnctionOption={
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useUnifiedTopology:true

export const connectToDatabase = async (url: string): Promise<void> => {
    try {
       
                 
                    await mongoose.connect(url);
                    console.log('Connected to MongoDB');
                } catch (error) {
                    console.error('Error connecting to MongoDB:', error);
                    throw error; // Propagate the error up
                }
            };

export default connectToDatabase;
