import { createStore } from 'vuex';

export default createStore({
    state: {
        projects: [],
    },
    mutations: {
        addProject(state, project) {
            state.projects.push(project);
        },
        updateProject(state, updatedProject) {
            const index = state.projects.findIndex(p => p.id === updatedProject.id);
            if (index !== -1) {
                state.projects.splice(index, 1, updatedProject);
            }
        },
        deleteProject(state, projectId) {
            state.projects = state.projects.filter(p => p.id !== projectId);
        },
        addTask(state, { projectId, task }) {
            const project = state.projects.find(p => p.id === projectId);
            if (project) {
                project.tasks.push(task);
            }
        },
        updateTask(state, { projectId, task }) {
            const project = state.projects.find(p => p.id === projectId);
            if (project) {
                const index = project.tasks.findIndex(t => t.id === task.id);
                if (index !== -1) {
                    project.tasks.splice(index, 1, task);
                }
            }
        },
        deleteTask(state, { projectId, taskId }) {
            const project = state.projects.find(p => p.id === projectId);
            if (project) {
                project.tasks = project.tasks.filter(t => t.id !== taskId);
            }
        },
    },
    actions: {},
    getters: {
        activeProjects: state => state.projects.filter(p => p.status === 'active'),
        inactiveProjects: state => state.projects.filter(p => p.status === 'inactive'),
        getProjectById: state => id => state.projects.find(p => p.id === id),
    },
});