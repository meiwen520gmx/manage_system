import { get } from "core-js/fn/dict"

const getters = {
  token: state => state.user.token
}

export default getters;
