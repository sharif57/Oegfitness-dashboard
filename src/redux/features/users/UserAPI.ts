import baseAPI from "@/redux/api/baseAPI";


interface ProfileData {
  data:{
   name: string;
   email: string;
   phone: string;
   role: string;
   image: string;
   payment: boolean;
   subscription: boolean;
   isDeleted: boolean;
   verified: boolean;
  }
 }

const UserAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<any, void>({
      query: () => ({
        url: "/user/all-user",
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        // },
      }),
      providesTags: ["Users"],
    }),

    getUser: builder.query<any, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        // },
      }),
      providesTags: ["Users"],
    }),

    userProfile: builder.query<ProfileData, void>({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),

    updateProfile: builder.mutation({
      query: (updateInfo) => ({
        url: "/user/update-profile",
        method: "POST",
        body: updateInfo,
      }),
      invalidatesTags: ["Users"], // Invalidates 'User' tag after mutation
    }),


  }),
});

export const { useGetAllUsersQuery, useGetUserQuery , useUserProfileQuery , useUpdateProfileMutation} = UserAPI;
