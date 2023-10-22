import React, { createContext } from 'react'

export const AuthContext = ({children}) => {

  const UserContext = createContext(null)

  const [user, setUser] = useState({});


  return (
    <AuthContext.provider value={{user, }}>
      {children}
    </AuthContext.provider>
  )
}
