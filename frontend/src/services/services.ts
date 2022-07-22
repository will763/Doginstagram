import { api } from "../lib/api"

interface Register {
    username: string
    fullname: string
    password: string
    numberOrEmail: string
}

interface Login {
    username: string
    password: string
}

interface SetUrlProfile {
    formData: FormData
    user: string | null
}

interface addPublicationProps {
    formData: FormData
    user: string | null
}

interface UpdateAccount {
    username: string
    name: string
    biography: string
    emailPhone: string
    user: string | null
}

export const register = ({ username, fullname, password, numberOrEmail }: Register) => {
    return api.post('/users/new', {
        name: fullname,
        username,
        password,
        emailPhone: numberOrEmail
    })
        .then(res => res.status)
        .catch(e => e);
}

export const login = ({ username, password }: Login) => {
    return api.post('/users/login', {
        username,
        password,
    })
        .then(res => {
            return { data: res.data, status: res.status };
        })
        .catch(e => {
            return { status: e.response.status, data: e.response.data }
        });
}

export const setImageProfile = ({ formData, user }: SetUrlProfile) => {
    return api.post('/users/profile/image/upload', formData, { headers: { 'Authorization': `${user}`, "Content-type": "multipart/form-data", } })
        .then(res => res)
        .catch(e => console.log(e));
}

export const updateAccount = ({ username, emailPhone, name, biography, user }: UpdateAccount) => {
    return api.post('/users/profile/edit', {
        name,
        emailPhone,
        username,
        biography
    }, { headers: { 'Authorization': `${user}` } })
        .then(res => {
            return { data: res.data, status: res.status };
        })
        .catch(e => {
            return { status: e.response.status, data: e.response.data }
        });
}

export const getInformationsProfile = (user: string | null) => {
    return api.get('/users/profile', {
        headers: { 'Authorization': `${user}` }
    })
        .then(res => res.data);
}

export const deleteImageProfile = (user: string | null) => {
    return api.delete('/users/profile/delete/image',
        { headers: { 'Authorization': `${user}` } }
    )
        .then(res => {
            return { status: res.status };
        })
        .catch(e => {
            return { status: e.response.status }
        });
}

export const getImageProfile = (user: string) => {
    return api.get('/users/profile/image',
        { headers: { 'Authorization': `${user}` } }
    )
        .then(res => {
            return { status: res.status, data: res.data };
        })
        .catch(e => {
            return { status: e.response.status, data: '' }
        });
}

export const addPublication = ({ formData, user }: addPublicationProps) => {
    return api.post('/publication/new', formData, { headers: { 'Authorization': `${user}`, "Content-type": "multipart/form-data", } })
        .then(res => res)
        .catch(e => console.log(e));
}

export const getAllPublications = (user: string) => {
    return api.get('/publication',
        { headers: { 'Authorization': `${user}` } }
    )
        .then(res => {
            return { status: res.status, data: res.data };
        })
        .catch(e => {
            return { status: e.response.status, data: '' }
        });
}

export const incrementLikesPublication = (user: string, id: number) => {
    return api.get(`/publication/update/likes/${id}`,
        { headers: { 'Authorization': `${user}` } }
    )
        .then(res => {
            return { status: res.status, data: res.data };
        })
        .catch(e => {
            return { status: e.response.status, data: '' }
        });
}

export const deletePublication = (user: string, id: number) => {
    return api.delete(`/publication/delete/${id}`,
        { headers: { 'Authorization': `${user}` } }
    )
        .then(res => {
            return { status: res.status, data: res.data };
        })
        .catch(e => {
            return { status: e.response.status, data: '' }
        });
}