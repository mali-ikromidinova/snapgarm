import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useToast } from "@/components/ui/use-toast";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const AllUsers = () => {
  const { toast } = useToast();
  const { ref, inView } = useInView();

  const {
    data: users,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError: isErrorCreators,
  } = useGetUsers();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  // console.log(users);

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });

    return;
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
        {isLoading && !users ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {users?.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group?.documents.map((user) => (
                  <li key={user?.$id} className="flex-1 min-w-[200px] w-full  ">
                    <UserCard user={user} />
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ul>
        )}
        {hasNextPage && (
          <div className="mt-10" ref={ref}>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
