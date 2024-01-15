import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"users",
    initialState :{
        users:[],
    },

    reducers:{
        getUser : (state,actions) => {
            state.users = actions.payload.map(user =>{
                return{id:user._id, name:user.name,email:user.email, age:user.age}
            })

        },

        addUser :(state, actions) =>{
            state.users.push(actions.payload)
        },

        updateUser:(state,action)=>{
            const index = state.users.findIndex(x => x.id === action.payload.id)
            state.users[index] = {
                id:action.payload.id,
                name:action.payload.name,
                email:action.payload.email,
                age:action.payload.age
            }
        },

        deleteUser:(state,action)=>{
            const id = action.payload.id;
            state.users = state.users.filter(u=>u.id !== id)
        }
    }
})


export const {getUser,addUser,updateUser,deleteUser} = userSlice.actions;

export default userSlice.reducer;