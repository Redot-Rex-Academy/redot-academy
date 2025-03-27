import { storeToRefs } from 'pinia'

import useClient from './useClient'
import userStore from '../stores/userStore'

export default () => {
  const { client } = useClient()
  const { user, loading, authenticating } = storeToRefs(userStore())

  const authenticate = async () => {
    authenticating.value = loading.value = true
    const { data: { user: _user }, error } = await client.auth.getUser()
    console.log({ _user, error })
    if (!error && _user && !_user.is_anonymous) {
      user.value = _user
    }
    authenticating.value = loading.value = false
  }

  const login = async ({ email, password }) => {
    console.log({ email, password })
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    })

    if (!error && data) {
      user.value = data.user
    }

    return { data, error }
  }

  const logout = async () => {
    return await client.auth.signOut()
  }

  const register = async ({ email, password }) => {
    return await client.auth.signUp({
      email,
      password,
    })
  }

  return {
    authenticate,
    login,
    logout,
    register,
  }
}
