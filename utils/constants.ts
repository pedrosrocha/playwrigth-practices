export const URL: string = "http://localhost:8080";
export const CREDENTIALS = {
    username: "admin user",
    password: "admin_password"
};

export enum users_types {
    admin,
    editor,
    viewer
}

export function get_user_credentials(user: users_types) {
    switch (user) {
        case users_types.admin:
            return { username: "admin user", password: "admin_password" };
        case users_types.editor:
            return { username: "editor user", password: "editor_password" };
        case users_types.viewer:
            return { username: "viewer user", password: "viewer_password" };
        default:
            throw new Error("Invalid user type");
    }
}