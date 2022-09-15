import api from './setup';
export const fetchProfile = () => api.get('user');

// User
export const fetchUser = (id) => api.get(`Users/${id}`);

// Tasklist
export const fetchTasklist = (params) => api.post('tasklists/page-list', params);
export const updateTasklist = (params) => api.post('tasklists/update', params);
export const getTasklistFilter = (id) => api.get(`tasklists/filter-by-worklist/${id}`);
export const fetchTask = (id) => api.get(`tasklists/${id}`);
export const fetchActivityLogs = (params) => api.post(`tasklists/activity-logs`, params);

// Worklist
export const fetchWorklist = (params) => api.post('worklists/page-list', params);
export const updateWorklist = (params) => api.post('worklists/update', params);
export const saveBookmark = (id) => api.put(`worklists/${id}/bookmark`);

// Workshop
// export const fetchWorkshop = (params) => api.post('workshops', params);
export const fetchWorkshop = async (params) => {
    try {
        const response = await fetch(`http://jsonplaceholder.typicode.com/posts?_start=${params.pageIndex}&_limit=10`);
        const json = await response.json();
        // console.log("#fetchWorkshop RESPONSE:", json)
        return json;
    }
    catch (error) {
        console.error(error);
    }
};

// Common
export const getFilters = () => api.get('worklists/get-filter-list');
export const fetchPosts = (params) => api.post('posts', params);
export const fetchOpusList = (params) => api.get('Opus', params);
export const fetchEventList = (opucode) => api.get(`Events/opu/${opucode}`);
export const getWorklistFilter = () => api.get('worklists/get-filter-list');
export const fetchWorklistPhases = (eventId) => api.get(`events/${eventId}/phases`);
