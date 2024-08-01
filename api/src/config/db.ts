import mongoose from 'mongoose';
import config from './config';

const db = async () => {
    await mongoose.connect(config.mongoUrl as string).then(() => {
        console.log('Database Established.');
    }).catch((err) => {
        console.log(err);
    })
}

export default db;