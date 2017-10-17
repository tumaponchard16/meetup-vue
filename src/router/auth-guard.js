/* eslint-disable */
import { store } from '../store'

export default (to, from, next) => {
	if (store.getters.user) {
		next()
	} else {
		console.log(to.fullPath)
		next({
        path: '/signin',
        redirect: to.fullPath
      })
	}
}


