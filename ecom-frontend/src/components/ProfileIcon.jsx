import React from "react";
import { currentUser } from "../services/api/services";
import { useState } from "react";
import { useEffect } from "react";
import { User } from "lucide-react";

const ProfileIcon = () => {
  const [logged, Setlogged] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await currentUser();
        setUsername(user.name);

        if (user) {
          Setlogged(true);
        } else {
          Setlogged(false);
        }
      } catch (error) {
        Setlogged(false);
      }
    };
    fetchUser();
  }, []);
  console.log(username);

  return (
    <div>
      {logged ? (
        <div className="flex flex-row gap-2">
          <span>{username}</span>{" "}
          <span className="border rounded-2xl">
            <User />
          </span>
        </div>
      ) : (
        <div className="flex flex-row gap-2">
          <span>Guest</span>{" "}
          <span className="border rounded-2xl">
            <User />
          </span>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
