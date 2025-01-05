import { UserCardScheme } from "../../schemes/user/userCard.schema";
import { useEffect, useState, useMemo, useContext, useCallback } from "react";
import UserCard from "../molecules/userCard/user-card";
import { UserModal } from "../molecules/userCard/user-modal";
import { UserContext } from "../../contexts/user.context";
import Container from "../atoms/container";
import Logo from "../atoms/logo";
import { services } from "../../services/services";
import { NecessityScheme } from "../../schemes/necessity/necessity.scheme";
import CustomPagination from "../atoms/CustomPagination";
import {
  FilterScheme,
  FindNewFriendForm,
} from "../molecules/find-new-friend-form";

const FindNewFriend = () => {
  const { user: userInfo, isAuthenticated } = useContext(UserContext);
  const [users, setUsers] = useState<UserCardScheme[]>([]);
  const [selectedUser, setSelectedUser] = useState<null | UserCardScheme>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(9);
  const [filterValues, setFilterValues] = useState<FilterScheme>({
    type: "",
    uf: "",
    town: "",
    meetingPreference: "",
    sortByMatches: false,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      let usersFetch = await services.get<UserCardScheme[]>({
        url: "/users",
        withCredentials: false,
      });

      if (usersFetch) {
        if (isAuthenticated)
          usersFetch = usersFetch.filter((user) => user.id !== userInfo?.id);

        usersFetch = usersFetch.sort(() => Math.random() - 0.5);
        setUsers(usersFetch);
      }
    };
    fetchUsers();
  }, [isAuthenticated, userInfo]);

  const calculateNecessityMatches = useCallback(
    (userNecessities: NecessityScheme[]) => {
      if (!userInfo?.necessities || !userNecessities) return 0;

      return userInfo.necessities.filter((userNeed) =>
        userNecessities.some((necessity) => necessity.id === userNeed.id)
      ).length;
    },
    [userInfo?.necessities]
  );

  const { paginatedUsers, totalPages } = useMemo(() => {
    // Create a new array to avoid mutation
    let filtered = [...users].filter((user: UserCardScheme) => {
      const type =
        filterValues.type === "" ||
        filterValues.type === "all" ||
        user.type === filterValues.type;

      const meetingPreference =
        filterValues.meetingPreference === "" ||
        filterValues.meetingPreference === "all" ||
        user.meetingPreference === filterValues.meetingPreference;

      const uf =
        filterValues.uf === "" ||
        filterValues.uf === "all" ||
        user.state === filterValues.uf;

      const town =
        filterValues.town === "" ||
        filterValues.town === "all" ||
        user.town === filterValues.town;

      return type && meetingPreference && uf && town;
    });

    // Sort by matches if enabled
    if (filterValues.sortByMatches) {
      filtered = filtered.sort((a, b) => {
        const matchesA = calculateNecessityMatches(a.necessities);
        const matchesB = calculateNecessityMatches(b.necessities);
        if (matchesA === matchesB)
          // Secondary sort by name if matches are equal
          return a.name.localeCompare(b.name);

        return matchesB - matchesA;
      });
    }

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const paginatedUsers = filtered.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(filtered.length / usersPerPage);

    return {
      paginatedUsers,
      totalPages,
    };
  }, [
    users,
    filterValues.sortByMatches,
    currentPage,
    usersPerPage,
    filterValues.type,
    filterValues.meetingPreference,
    filterValues.uf,
    filterValues.town,
    calculateNecessityMatches,
  ]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    filterValues.sortByMatches,
    filterValues.type,
    filterValues.meetingPreference,
    filterValues.uf,
    filterValues.town,
  ]);

  if (users.length === 0)
    return (
      <Container variant="section" className="flex justify-center items-center">
        <Logo size={128} className="animate-bounce" />
      </Container>
    );

  return (
    <>
      <FindNewFriendForm
        isAuthenticated={isAuthenticated}
        onFormChange={setFilterValues}
      />
      <Container
        variant={"section"}
        className="flex flex-wrap gap-10 justify-center mt-10 "
      >
        {paginatedUsers.map((user: UserCardScheme) => (
          <UserCard
            key={user.id}
            user={user}
            onClick={() => setSelectedUser(user)}
          />
        ))}
        {selectedUser && (
          <UserModal
            user={selectedUser}
            onClose={() => setSelectedUser(null)}
          />
        )}
      </Container>
      <CustomPagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default FindNewFriend;
