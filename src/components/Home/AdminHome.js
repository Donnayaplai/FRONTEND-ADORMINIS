import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
const AdminHome = (props) => {
  const history = useHistory()
  useEffect(() => {
    if (props.roleId !== 1) {
      history.push('/login')
    }
  }, [])
  return (
    <div>
      <h1> Admin Homepage</h1>
    </div>
  )
}

export default AdminHome
