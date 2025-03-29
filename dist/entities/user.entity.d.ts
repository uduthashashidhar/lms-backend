export declare enum UserRole {
    STUDENT = "student",
    INSTRUCTOR = "instructor",
    ADMIN = "admin"
}
export declare class User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    auth0Id: string;
    avatarUrl: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
