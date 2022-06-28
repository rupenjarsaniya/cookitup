import nextConnect from 'next-connect';
import connectDb from '../../database/database';

const handler = nextConnect();

handler.use(connectDb);

export default handler;