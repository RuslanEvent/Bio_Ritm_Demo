export default function role(role) {
    return function ({ next, store, from }) {
        if (Array.isArray(role)) {
            if (role.includes(store.getters.currentRole)) {
                return next()
            } else {
                return next(from)
            }
        }
        if (store.getters.currentRole != role) {
            return next(from)
        }
        return next()
    }
}