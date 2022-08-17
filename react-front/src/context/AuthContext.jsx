import { createContext} from 'react'


export const AuthContext= createContext({})


export const AuthProvider = (props) => {
    
    function login()
        {

        }

        function logout(){
                
        }


    const value ={
        login,
        logout
    }



    return(
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}






