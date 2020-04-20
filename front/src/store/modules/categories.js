const state = {
    selected_category: null
}

const getters = {
    getSelectedCategory: state => state.selected_category
}

const mutations = {
    updateSelectedCategory(state, category) {
        state.selected_category = category
    }
}

const actions = {

}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}