import { lazy } from "react";

const Authentication = lazy(() => import("./Components/auth/Authentication"))
const ForgetPassword = lazy(() => import("./Components/auth/ForgetPassword"))
const ResetPassword = lazy(() => import("./Components/auth/ResetPassword"))
const Authorization = lazy(() => import("./Components/auth/Authorization"))
const Profile = lazy(() => import("./Components/post/Profile"))
const AddPost = lazy(() => import("./Components/post/AddPost"))
const Post = lazy(() => import("./Components/post/Post"))
const EditPost = lazy(() => import("./Components/post/EditPost"))
const ViewProfile = lazy(() => import("./Components/common/ViewProfile"))
const FriendRequest = lazy(() => import("./Components/common/FriendRequest"))
const FriendList = lazy(() => import("./Components/common/FriendList"))
const Friends = lazy(() => import("./Components/common/Friends"))
const ChatWithFriend = lazy(() => import("./Components/chat/ChatWithFriend"))

const Routes = [
    { path: "/", element: <Authentication /> },
    { path: "/profile", element: <Profile /> },
    { path: "/addPost", element: <AddPost /> },
    { path: "/post/:id", element: <Post /> },
    { path: "/update/:id", element: <EditPost /> },
    { path: "/viewDetail/:id", element: <ViewProfile /> },
    { path: "/forgetPass", element: <ForgetPassword /> },
    { path: "/resetPass/:email", element: <ResetPassword /> },
    { path: "/friendList", element: <FriendList /> },
    { path: "/friendRequest", element: <FriendRequest /> },
    { path: "/friends", element: <Friends /> },
    { path: "/chat/:name", element: <ChatWithFriend /> },
    { path: "*", element: <Authorization /> },
    { path:"/unauthorized", element:<Authorization type={"Authorization"}/>}
]

export default Routes