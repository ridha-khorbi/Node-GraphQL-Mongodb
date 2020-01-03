import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

export default {
    Query: {
        user: async (parent, { id }, { models: { userModel }, me }, info) => {
            console.log("meee",me)
          /*  if (!me) {
                throw new AuthenticationError('You are not authenticated');
            }*/
            const user = await userModel.findById({ _id: id }).exec();
            return user;
        },
        login: async (parent, { email, password }, { models: { userModel } }, info) => {
            const user = await userModel.findOne({ email }).exec();
console.log("user",user)
            if (!user) {
                throw new AuthenticationError('Invalid credentials');
            }

            const matchPasswords = bcrypt.compareSync(password, user.password);

            if (!matchPasswords) {
                throw new AuthenticationError('Invalid credentials');
            }

            const token = jwt.sign({ id: user.id }, 'riddlemethis', { expiresIn: 24 * 10 * 50 });

            return {
                token,
                user
            };
        },
        checkEmailAvailability:async (parent, { email }, { models: { userModel }, me }, info) => {

            const user = await userModel.find({ email: email }).exec();
           console.log("uuuuuuuuu",user)
            if(user.length >0){
                return user[0]
            }else{
                return null
            }

        },
    },
    Mutation: {
        createUser: async (parent, { fname, lname,email, password,phoneNo,state, pincode }, { models: { userModel } }, info) => {
            const user = await userModel.create({ fname, lname,email, password,phoneNo,state, pincode });
            return user;
        },
    },
    User: {
        posts: async ({ id }, args, { models: { postModel } }, info) => {
            const posts = await postModel.find({ author: id }).exec();
            return posts;
        },
    },
};